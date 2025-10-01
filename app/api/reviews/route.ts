import { NextRequest, NextResponse } from 'next/server'
import { createReview, getAllReviews } from '@/lib/db/reviews'

// 리뷰 생성
export async function POST(request: NextRequest) {
  try {
    const reviewData = await request.json()

    const review = await createReview({
      userId: reviewData.userId,
      userName: reviewData.userName,
      userEmail: reviewData.userEmail,
      userPhoto: reviewData.userPhoto,
      rating: reviewData.rating,
      title: reviewData.title,
      content: reviewData.content,
      images: reviewData.images || [],
    })

    return NextResponse.json({
      success: true,
      review,
    })
  } catch (error: any) {
    console.error('Review creation error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || '리뷰 생성 실패',
      },
      { status: 500 }
    )
  }
}

// 리뷰 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam) : undefined

    const reviews = await getAllReviews(limit)

    return NextResponse.json({
      success: true,
      reviews,
    })
  } catch (error: any) {
    console.error('Review fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || '리뷰 조회 실패',
      },
      { status: 500 }
    )
  }
}
