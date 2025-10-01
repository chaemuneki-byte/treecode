'use client'

import { useState } from 'react'
import { Camera, MapPin, Plus } from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '홍길동',
    phone: '010-1234-5678',
    birthDate: '1990-01-01',
    email: 'hong@example.com',
  })

  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: '집',
      address: '서울특별시 강남구 테헤란로 123',
      detailAddress: '아파트 101동 202호',
      zipCode: '06234',
      isDefault: true,
    },
    {
      id: '2',
      name: '회사',
      address: '서울특별시 종로구 세종대로 209',
      detailAddress: '오피스빌딩 5층',
      zipCode: '03172',
      isDefault: false,
    },
  ])

  return (
    <div className="space-y-6">
      {/* 프로필 이미지 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">프로필 이미지</h2>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-3xl font-bold">홍</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
              <Camera className="text-white" size={16} />
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors mr-2">
              이미지 업로드
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              삭제
            </button>
          </div>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">기본 정보</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전화번호
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              생년월일
            </label>
            <input
              type="date"
              value={profile.birthDate}
              onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            저장
          </button>
        </form>
      </div>

      {/* 계정 정보 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">계정 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500"
            />
            <p className="text-sm text-gray-500 mt-1">이메일은 변경할 수 없습니다</p>
          </div>
          <div>
            <button className="w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>

      {/* 배송지 관리 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">배송지 관리</h2>
          <button className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            <span>새 주소 추가</span>
          </button>
        </div>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="text-gray-600" size={16} />
                    <span className="font-medium text-gray-900">{address.name}</span>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                        기본
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{address.address}</p>
                  <p className="text-gray-600 text-sm">{address.detailAddress}</p>
                  <p className="text-gray-600 text-sm">우편번호: {address.zipCode}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-900 rounded hover:bg-gray-200 transition-colors">
                    수정
                  </button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}