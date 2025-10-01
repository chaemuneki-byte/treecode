import { NextRequest, NextResponse } from 'next/server';
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getAvailableProducts,
} from '@/lib/db/products';

// 제품 생성
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    const product = await createProduct({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      imageUrl: productData.imageUrl || '',
      category: productData.category,
      stock: productData.stock || 0,
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    console.error('Product creation error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '제품 생성 실패',
    }, { status: 500 });
  }
}

// 제품 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const available = searchParams.get('available');

    let products;
    if (available === 'true') {
      products = await getAvailableProducts();
    } else if (category) {
      products = await getProductsByCategory(category);
    } else {
      products = await getAllProducts();
    }

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error: any) {
    console.error('Product fetch error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '제품 조회 실패',
    }, { status: 500 });
  }
}
