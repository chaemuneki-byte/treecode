'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react'

export default function OrdersPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('3months')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const orders = [
    {
      id: '202409180001',
      orderDate: '2024-09-18',
      status: 'delivered',
      items: [
        { name: '프리미엄 무선 이어폰', quantity: 1, price: 129000, image: '/product1.jpg' },
      ],
      totalAmount: 129000,
    },
    {
      id: '202409150002',
      orderDate: '2024-09-15',
      status: 'shipping',
      items: [
        { name: '스마트 공기청정기', quantity: 1, price: 249000, image: '/product2.jpg' },
      ],
      totalAmount: 249000,
    },
    {
      id: '202409100003',
      orderDate: '2024-09-10',
      status: 'paid',
      items: [
        { name: '클래식 가죽 가방', quantity: 2, price: 189000, image: '/product3.jpg' },
      ],
      totalAmount: 378000,
    },
  ]

  const statusMap = {
    paid: { label: '결제완료', icon: Package, color: 'text-blue-600' },
    shipping: { label: '배송중', icon: Truck, color: 'text-orange-600' },
    delivered: { label: '배송완료', icon: CheckCircle, color: 'text-green-600' },
    cancelled: { label: '취소', icon: XCircle, color: 'text-red-600' },
  }

  return (
    <div className="space-y-6">
      {/* 필터 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              조회 기간
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: '1month', label: '1개월' },
                { value: '3months', label: '3개월' },
                { value: '6months', label: '6개월' },
                { value: '1year', label: '1년' },
              ].map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedPeriod === period.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주문 상태
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: '전체' },
                { value: 'paid', label: '결제완료' },
                { value: 'shipping', label: '배송중' },
                { value: 'delivered', label: '배송완료' },
                { value: 'cancelled', label: '취소' },
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedStatus === status.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="space-y-4">
        {orders.map((order) => {
          const StatusIcon = statusMap[order.status as keyof typeof statusMap].icon
          const statusColor = statusMap[order.status as keyof typeof statusMap].color
          const statusLabel = statusMap[order.status as keyof typeof statusMap].label

          return (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">주문번호: {order.id}</p>
                  <p className="text-sm text-gray-600">주문일: {order.orderDate}</p>
                </div>
                <div className={`flex items-center space-x-2 ${statusColor}`}>
                  <StatusIcon size={20} />
                  <span className="font-medium">{statusLabel}</span>
                </div>
              </div>

              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <Package className="text-gray-400" size={32} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      수량: {item.quantity}개 | {item.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <span className="text-gray-600">총 결제금액: </span>
                  <span className="text-xl font-bold text-gray-900">
                    {order.totalAmount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/mypage/orders/${order.id}`}
                    className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    상세보기
                  </Link>
                  {order.status === 'delivered' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      리뷰 작성
                    </button>
                  )}
                  {order.status === 'paid' && (
                    <button className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors">
                      주문 취소
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center space-x-2">
        <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
          이전
        </button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
        <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
        <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
        <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
          다음
        </button>
      </div>
    </div>
  )
}