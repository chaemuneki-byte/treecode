'use client'

import { useState } from 'react'
import { Bell, Lock, UserX } from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    orderEmail: true,
    orderSms: false,
    marketingEmail: true,
    marketingSms: false,
    pushNotifications: true,
  })

  const [privacy, setPrivacy] = useState({
    privacyPolicy: true,
    marketingConsent: true,
    thirdPartyConsent: false,
  })

  return (
    <div className="space-y-6">
      {/* 알림 설정 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="text-gray-900" size={24} />
          <h2 className="text-xl font-bold text-gray-900">알림 설정</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">주문 이메일 알림</p>
              <p className="text-sm text-gray-600">주문 및 배송 정보를 이메일로 받습니다</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.orderEmail}
                onChange={(e) =>
                  setNotifications({ ...notifications, orderEmail: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">주문 SMS 알림</p>
              <p className="text-sm text-gray-600">주문 및 배송 정보를 문자로 받습니다</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.orderSms}
                onChange={(e) =>
                  setNotifications({ ...notifications, orderSms: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">마케팅 이메일 알림</p>
              <p className="text-sm text-gray-600">프로모션 및 이벤트 정보를 이메일로 받습니다</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.marketingEmail}
                onChange={(e) =>
                  setNotifications({ ...notifications, marketingEmail: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">푸시 알림</p>
              <p className="text-sm text-gray-600">웹 푸시 알림을 받습니다</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={(e) =>
                  setNotifications({ ...notifications, pushNotifications: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* 개인정보 설정 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">개인정보 설정</h2>
        <div className="space-y-4">
          <div className="flex items-start justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">개인정보 처리방침 동의 (필수)</p>
              <p className="text-sm text-gray-600">서비스 이용을 위한 필수 동의 항목입니다</p>
            </div>
            <span className="text-sm text-gray-500">필수</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">마케팅 정보 수신 동의</p>
              <p className="text-sm text-gray-600">프로모션 및 이벤트 정보 제공</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.marketingConsent}
                onChange={(e) =>
                  setPrivacy({ ...privacy, marketingConsent: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">제3자 정보제공 동의</p>
              <p className="text-sm text-gray-600">배송 및 결제를 위한 정보 제공</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.thirdPartyConsent}
                onChange={(e) =>
                  setPrivacy({ ...privacy, thirdPartyConsent: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* 계정 관리 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <Lock className="text-gray-900" size={24} />
          <h2 className="text-xl font-bold text-gray-900">계정 관리</h2>
        </div>
        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors text-left">
            <p className="font-medium">비밀번호 변경</p>
            <p className="text-sm text-gray-600">계정 보안을 위해 정기적으로 변경하세요</p>
          </button>
          <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors text-left">
            <p className="font-medium">이메일 변경</p>
            <p className="text-sm text-gray-600">로그인 이메일 주소를 변경합니다</p>
          </button>
        </div>
      </div>

      {/* 회원탈퇴 */}
      <div className="bg-white border border-red-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <UserX className="text-red-600" size={24} />
          <h2 className="text-xl font-bold text-red-600">회원탈퇴</h2>
        </div>
        <p className="text-gray-600 mb-4">
          회원탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
          <br />
          주문 내역 및 포인트도 함께 삭제됩니다.
        </p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
          회원탈퇴 신청
        </button>
      </div>
    </div>
  )
}