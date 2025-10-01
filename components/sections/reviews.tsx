'use client'

import { useState } from 'react'
import ReviewForm from '@/components/reviews/review-form'
import ReviewList from '@/components/reviews/review-list'

export default function Reviews() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleReviewSuccess = () => {
    // 새 리뷰가 등록되면 리스트 새로고침
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">고객 리뷰</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            실제 사용자들의 생생한 후기를 확인하고, 여러분의 경험도 공유해주세요
          </p>
        </div>

        {/* 리뷰 작성 폼 */}
        <div className="mb-12">
          <ReviewForm onSuccess={handleReviewSuccess} />
        </div>

        {/* 리뷰 목록 */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">전체 리뷰</h3>
          <ReviewList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </section>
  )
}
