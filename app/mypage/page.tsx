import Link from 'next/link'
import { User, ShoppingBag, CreditCard, Bell } from 'lucide-react'

export const metadata = {
  title: '마이페이지 | 나의 아이템',
  description: '나의 아이템 마이페이지',
}

export default function MypagePage() {
  const user = {
    name: '홍길동',
    email: 'hong@example.com',
    joinDate: '2023-01-15',
    grade: '일반회원',
    points: 15000,
  }

  const recentOrders = [
    { id: '1', name: '프리미엄 무선 이어폰', date: '2024-09-20', status: '배송완료', price: 129000 },
    { id: '2', name: '스마트 공기청정기', date: '2024-09-18', status: '배송중', price: 249000 },
    { id: '3', name: '클래식 가죽 가방', date: '2024-09-15', status: '주문완료', price: 189000 },
  ]

  const quickMenus = [
    { title: '내 정보', href: '/mypage/profile', icon: User, count: null },
    { title: '주문내역', href: '/mypage/orders', icon: ShoppingBag, count: 12 },
    { title: '포인트', href: '/mypage/points', icon: CreditCard, count: '15,000P' },
    { title: '알림', href: '/mypage/notifications', icon: Bell, count: 3 },
  ]

  return (
    <div className="space-y-6">
      {/* 사용자 정보 요약 카드 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" size={32} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}님</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">가입일</div>
            <div className="font-medium text-gray-900">{user.joinDate}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">회원등급</div>
            <div className="font-medium text-gray-900">{user.grade}</div>
          </div>
        </div>
      </div>

      {/* 빠른 메뉴 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickMenus.map((menu) => {
          const Icon = menu.icon
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <span className="font-medium text-gray-900">{menu.title}</span>
                {menu.count && (
                  <span className="text-sm text-blue-600 font-medium">{menu.count}</span>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* 포인트 현황 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">포인트 현황</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-2">보유 포인트</p>
            <p className="text-3xl font-bold text-blue-600">{user.points.toLocaleString()}P</p>
          </div>
          <Link
            href="/mypage/points"
            className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors"
          >
            내역 보기
          </Link>
        </div>
      </div>

      {/* 최근 주문 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">최근 주문</h3>
          <Link href="/mypage/orders" className="text-sm text-blue-600 hover:underline">
            전체보기
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{order.name}</p>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <div className="text-right mr-4">
                <p className="font-medium text-gray-900">{order.price.toLocaleString()}원</p>
                <p className="text-sm text-blue-600">{order.status}</p>
              </div>
              <Link
                href={`/mypage/orders/${order.id}`}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-900 rounded hover:bg-gray-200 transition-colors"
              >
                상세
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 알림 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">알림</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 py-2">
            <Bell className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-gray-900">주문하신 상품이 배송 중입니다</p>
              <p className="text-sm text-gray-600">2024-09-18</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 py-2">
            <Bell className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-gray-900">포인트 1,500P가 적립되었습니다</p>
              <p className="text-sm text-gray-600">2024-09-17</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}