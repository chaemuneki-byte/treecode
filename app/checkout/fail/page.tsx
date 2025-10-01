'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { XCircle } from 'lucide-react'

function FailContent() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('code')
  const errorMessage = searchParams.get('message')

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <XCircle className="text-red-600 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">결제 실패</h1>
          <p className="text-gray-600 mb-8">
            {errorMessage || '결제 처리 중 오류가 발생했습니다.'}
          </p>

          {errorCode && (
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600">
                에러 코드: <span className="font-mono text-gray-900">{errorCode}</span>
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <Link
              href="/products"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              상품 목록으로
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-medium px-6 py-3 rounded-lg border-2 border-gray-200 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutFailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-20">로딩 중...</div>}>
      <FailContent />
    </Suspense>
  )
}
