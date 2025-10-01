'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'

interface Review {
  id: string
  userId: string
  userName: string
  userEmail: string
  userPhoto?: string
  rating: number
  title: string
  content: string
  images?: string[]
  createdAt: Date
  updatedAt: Date
}

interface ReviewListProps {
  refreshTrigger?: number
}

export default function ReviewList({ refreshTrigger = 0 }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [refreshTrigger])

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/reviews?limit=10')
      const data = await response.json()

      if (data.success) {
        setReviews(data.reviews)
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">리뷰를 불러오는 중...</p>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">아직 작성된 리뷰가 없습니다.</p>
        <p className="text-gray-500 text-sm mt-2">첫 리뷰를 작성해보세요!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          {/* 사용자 정보 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {review.userPhoto ? (
                <Image
                  src={review.userPhoto}
                  alt={review.userName}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {review.userName.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h4 className="font-medium text-gray-900">{review.userName}</h4>
                <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
              </div>
            </div>

            {/* 별점 */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={
                    star <= review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
              <span className="ml-2 text-gray-600 font-medium">{review.rating}</span>
            </div>
          </div>

          {/* 리뷰 제목 */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {review.title}
          </h3>

          {/* 리뷰 내용 */}
          <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>

          {/* 첨부 이미지 */}
          {review.images && review.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {review.images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`리뷰 이미지 ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
