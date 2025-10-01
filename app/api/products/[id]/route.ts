import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/db/products';

// 특정 제품 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({
        success: false,
        message: '제품을 찾을 수 없습니다.',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    console.error('Product fetch error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '제품 조회 실패',
    }, { status: 500 });
  }
}

// 제품 정보 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    await updateProduct(id, updateData);

    const updatedProduct = await getProductById(id);

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error('Product update error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '제품 업데이트 실패',
    }, { status: 500 });
  }
}

// 제품 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteProduct(id);

    return NextResponse.json({
      success: true,
      message: '제품이 삭제되었습니다.',
    });
  } catch (error: any) {
    console.error('Product deletion error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '제품 삭제 실패',
    }, { status: 500 });
  }
}
