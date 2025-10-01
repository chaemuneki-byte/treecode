import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrder, deleteOrder } from '@/lib/db/orders';

// 특정 주문 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await getOrderById(params.id);

    if (!order) {
      return NextResponse.json({
        success: false,
        message: '주문을 찾을 수 없습니다.',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error('Order fetch error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '주문 조회 실패',
    }, { status: 500 });
  }
}

// 주문 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updateData = await request.json();
    await updateOrder(params.id, updateData);

    const updatedOrder = await getOrderById(params.id);

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error('Order update error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '주문 업데이트 실패',
    }, { status: 500 });
  }
}

// 주문 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteOrder(params.id);

    return NextResponse.json({
      success: true,
      message: '주문이 삭제되었습니다.',
    });
  } catch (error: any) {
    console.error('Order deletion error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '주문 삭제 실패',
    }, { status: 500 });
  }
}
