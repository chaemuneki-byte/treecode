'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { User, ShoppingBag, Settings, LogOut, ChevronDown } from 'lucide-react'
import Image from 'next/image'

interface UserDropdownProps {
  userName: string
  userEmail: string
  userPhoto?: string
  onLogout: () => void
}

export default function UserDropdown({ userName, userEmail, userPhoto, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-gray-900 font-medium px-3 py-2 rounded-lg transition-all shadow-sm"
      >
        {userPhoto ? (
          <Image
            src={userPhoto}
            alt={userName}
            width={28}
            height={28}
            className="rounded-full"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="max-w-[120px] truncate">{userName}</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 backdrop-blur-xl bg-white/95 border border-white/20 rounded-lg shadow-xl py-2">
          <Link
            href="/mypage/profile"
            className="flex items-center space-x-2 px-4 py-2 text-gray-900 hover:bg-white/50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User size={16} />
            <span>내 정보</span>
          </Link>
          <Link
            href="/mypage/orders"
            className="flex items-center space-x-2 px-4 py-2 text-gray-900 hover:bg-white/50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag size={16} />
            <span>주문내역</span>
          </Link>
          <Link
            href="/mypage/settings"
            className="flex items-center space-x-2 px-4 py-2 text-gray-900 hover:bg-white/50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={16} />
            <span>설정</span>
          </Link>
          <hr className="my-2 border-gray-300/20" />
          <button
            onClick={() => {
              onLogout()
              setIsOpen(false)
            }}
            className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-white/50 transition-colors"
          >
            <LogOut size={16} />
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </div>
  )
}
