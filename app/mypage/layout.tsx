import ProtectedRoute from '@/components/auth/protected-route'
import SidebarNav from '@/components/mypage/sidebar-nav'

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* 사이드바 (데스크톱만 표시) */}
            <div className="hidden lg:block lg:col-span-1">
              <SidebarNav />
            </div>

            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-3">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}