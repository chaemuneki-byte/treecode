import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getAllOrders, getOrdersByUserId } from '@/lib/db/orders';

// 주문 생성
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    const order = await createOrder({
      userId: orderData.userId,
      products: orderData.products,
      totalAmount: orderData.totalAmount,
      status: orderData.status || 'pending',
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '주문 생성 실패',
    }, { status: 500 });
  }
}

// 주문 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let orders;
    if (userId) {
      orders = await getOrdersByUserId(userId);
    } else {
      orders = await getAllOrders();
    }

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.error('Order fetch error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '주문 조회 실패',
    }, { status: 500 });
  }
}
