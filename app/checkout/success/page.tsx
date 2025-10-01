'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(true)
  const [paymentInfo, setPaymentInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const paymentKey = searchParams.get('paymentKey')
        const orderId = searchParams.get('orderId')
        const amount = searchParams.get('amount')
        const productId = searchParams.get('productId')
        const quantity = searchParams.get('quantity')

        if (!paymentKey || !orderId || !amount) {
          setError('결제 정보가 올바르지 않습니다.')
          setIsProcessing(false)
          return
        }

        // 결제 승인 API 호출
        const response = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: parseInt(amount),
            userId: 'temp-user-id', // 실제로는 로그인한 사용자 ID
            products: [
              {
                productId,
                productName: searchParams.get('productName') || '상품',
                quantity: parseInt(quantity || '1'),
                price: parseInt(amount) / parseInt(quantity || '1'),
              },
            ],
          }),
        })

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.message || '결제 승인 실패')
        }

        setPaymentInfo(data.payment)
        setIsProcessing(false)
      } catch (err: any) {
        console.error('Payment confirmation error:', err)
        setError(err.message || '결제 승인 중 오류가 발생했습니다.')
        setIsProcessing(false)
      }
    }

    confirmPayment()
  }, [searchParams])

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">결제 승인 처리 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">결제 실패</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              상품 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">결제가 완료되었습니다!</h1>
          <p className="text-gray-600 mb-8">주문해 주셔서 감사합니다.</p>

          {paymentInfo && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-bold text-gray-900 mb-4">결제 정보</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">주문번호</span>
                  <span className="font-medium text-gray-900">{paymentInfo.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제 방법</span>
                  <span className="font-medium text-gray-900">{paymentInfo.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제 금액</span>
                  <span className="font-medium text-gray-900">
                    {paymentInfo.totalAmount?.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제 일시</span>
                  <span className="font-medium text-gray-900">
                    {new Date(paymentInfo.approvedAt).toLocaleString('ko-KR')}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Link
              href="/mypage/orders"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              <Package className="mr-2" size={20} />
              주문 내역 보기
            </Link>
            <Link
              href="/products"
              className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-medium px-6 py-3 rounded-lg border-2 border-gray-200 transition-colors"
            >
              계속 쇼핑하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
