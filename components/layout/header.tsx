'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import AuthButtons from '@/components/auth/auth-buttons'
import { useAuth } from '@/lib/auth/auth-context'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const getNavigationItems = () => {
    const baseItems = [
      { name: '홈', href: '/' },
      { name: '회사소개', href: '/about' },
      { name: '상품', href: '/products' },
    ]

    if (user) {
      return [...baseItems, { name: '마이페이지', href: '/mypage' }]
    }

    return baseItems
  }

  const navigationItems = getNavigationItems()

  const productCategories = [
    { name: '전자제품', href: '/products/electronics' },
    { name: '생활용품', href: '/products/lifestyle' },
    { name: '패션', href: '/products/fashion' },
    { name: '식품', href: '/products/food' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header shadow-lg shadow-black/5">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 왼쪽: 로고 */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-removebg-preview.png"
              alt="플랫폼트리 로고"
              width={200}
              height={60}
              className="h-auto w-auto max-h-16"
              priority
            />
          </Link>

          {/* 중앙: 데스크톱 네비게이션 */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/20 ${
                    isActive
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* 우측: 인증 버튼 (데스크톱) */}
          <div className="hidden md:flex items-center">
            <AuthButtons />
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden text-gray-900/90 p-2 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 모바일 네비게이션 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 glass-mobile-menu rounded-lg mt-2 mb-4 shadow-2xl animate-fade-in">
            <div className="flex flex-col space-y-2">
              {/* 모바일 인증 버튼 */}
              <div className="px-4 pb-2 border-b border-gray-300/20">
                <AuthButtons />
              </div>

              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`hover:bg-white/20 transition-colors duration-200 px-4 py-3 rounded-lg ${
                      isActive ? 'text-blue-600 font-medium' : 'text-gray-900/90 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}

              {/* 모바일 상품 카테고리 */}
              <div className="border-t border-gray-300/20 pt-2 mt-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-600">상품 카테고리</div>
                {productCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block text-gray-900/90 hover:text-blue-600 hover:bg-white/20 transition-colors duration-200 px-4 py-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}