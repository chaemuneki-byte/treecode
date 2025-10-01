import { NextRequest, NextResponse } from 'next/server';
import { cancelPayment } from '@/lib/toss/payment';
import { updateOrder } from '@/lib/db/orders';
import { updateProductStock } from '@/lib/db/products';

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, cancelReason, orderId, products } = await request.json();

    // 결제 취소 요청
    const cancelResult = await cancelPayment(paymentKey, {
      cancelReason,
    });

    // 주문 상태 업데이트
    if (cancelResult.status === 'CANCELED') {
      await updateOrder(orderId, {
        status: 'cancelled',
      });

      // 재고 복구
      if (products && products.length > 0) {
        for (const item of products) {
          await updateProductStock(item.productId, item.quantity);
        }
      }

      return NextResponse.json({
        success: true,
        payment: cancelResult,
      });
    }

    return NextResponse.json({
      success: false,
      message: '결제 취소 처리 중 오류가 발생했습니다.',
    }, { status: 400 });

  } catch (error: any) {
    console.error('Payment cancellation error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '결제 취소 실패',
    }, { status: 500 });
  }
}
