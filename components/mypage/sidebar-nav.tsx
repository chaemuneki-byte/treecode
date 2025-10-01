'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, ShoppingBag, Settings } from 'lucide-react'

export default function SidebarNav() {
  const pathname = usePathname()

  const sidebarItems = [
    {
      title: '마이페이지',
      href: '/mypage',
      icon: Home,
    },
    {
      title: '내 정보',
      href: '/mypage/profile',
      icon: User,
    },
    {
      title: '주문내역',
      href: '/mypage/orders',
      icon: ShoppingBag,
    },
    {
      title: '설정',
      href: '/mypage/settings',
      icon: Settings,
    },
  ]

  return (
    <nav className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}