import { NextRequest, NextResponse } from 'next/server';
import { confirmPayment } from '@/lib/toss/payment';
import { createOrder } from '@/lib/db/orders';
import { updateProductStock } from '@/lib/db/products';

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount, userId, products } = await request.json();

    // 결제 승인 요청
    const paymentResult = await confirmPayment({
      paymentKey,
      orderId,
      amount,
    });

    // 결제 성공 시 주문 생성
    if (paymentResult.status === 'DONE') {
      const order = await createOrder({
        userId,
        products,
        totalAmount: amount,
        status: 'completed',
      });

      // 재고 업데이트
      for (const item of products) {
        await updateProductStock(item.productId, -item.quantity);
      }

      return NextResponse.json({
        success: true,
        payment: paymentResult,
        order,
      });
    }

    return NextResponse.json({
      success: false,
      message: '결제 처리 중 오류가 발생했습니다.',
    }, { status: 400 });

  } catch (error: any) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '결제 승인 실패',
    }, { status: 500 });
  }
}
