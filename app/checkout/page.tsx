'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { v4 as uuidv4 } from 'uuid'

declare global {
  interface Window {
    TossPayments: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('카드')
  const [orderInfo, setOrderInfo] = useState({
    productId: '',
    productName: '',
    price: 0,
    quantity: 1,
  })

  useEffect(() => {
    // URL 파라미터에서 상품 정보 가져오기
    const productId = searchParams.get('productId') || ''
    const productName = searchParams.get('productName') || ''
    const price = parseInt(searchParams.get('price') || '0')
    const quantity = parseInt(searchParams.get('quantity') || '1')

    setOrderInfo({ productId, productName, price, quantity })
    setIsLoading(false)
  }, [searchParams])

  const handlePayment = async () => {
    if (!orderInfo.productName || !orderInfo.price) {
      alert('주문 정보가 올바르지 않습니다.')
      return
    }

    try {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!
      const tossPayments = await window.TossPayments(clientKey)

      const orderId = `ORDER_${Date.now()}_${uuidv4().substring(0, 8)}`
      const amount = orderInfo.price * orderInfo.quantity

      await tossPayments.requestPayment(selectedPaymentMethod, {
        amount,
        orderId,
        orderName: orderInfo.productName,
        customerName: '고객명',
        successUrl: `${window.location.origin}/checkout/success?orderId=${orderId}&amount=${amount}&productId=${orderInfo.productId}&quantity=${orderInfo.quantity}&productName=${encodeURIComponent(orderInfo.productName)}`,
        failUrl: `${window.location.origin}/checkout/fail`,
      })
    } catch (error: any) {
      console.error('Payment request error:', error)
      if (error.code === 'USER_CANCEL') {
        alert('결제를 취소하셨습니다.')
      } else {
        alert(error.message || '결제 요청 중 오류가 발생했습니다.')
      }
    }
  }

  const paymentMethods = [
    { id: '카드', name: '신용/체크카드', icon: '💳' },
    { id: '가상계좌', name: '가상계좌', icon: '🏦' },
    { id: '계좌이체', name: '계좌이체', icon: '💰' },
    { id: '휴대폰', name: '휴대폰 결제', icon: '📱' },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">결제 준비 중...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script
        src="https://js.tosspayments.com/v1/payment"
        onLoad={() => {
          console.log('Toss Payments SDK loaded')
        }}
      />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">결제하기</h1>

          {/* 주문 정보 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">주문 정보</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">상품명</span>
                <span className="font-medium text-gray-900">{orderInfo.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">수량</span>
                <span className="font-medium text-gray-900">{orderInfo.quantity}개</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">상품 가격</span>
                <span className="font-medium text-gray-900">{orderInfo.price.toLocaleString()}원</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-lg font-bold text-gray-900">총 결제 금액</span>
                <span className="text-lg font-bold text-blue-600">
                  {(orderInfo.price * orderInfo.quantity).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* 결제 수단 선택 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">결제 수단</h2>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{method.icon}</div>
                  <div className="font-medium text-gray-900">{method.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 결제 버튼 */}
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors"
          >
            결제하기
          </button>
        </div>
      </div>
    </>
  )
}
