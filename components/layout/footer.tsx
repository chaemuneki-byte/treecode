export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 회사 정보 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">나의 아이템</h3>
          <div className="text-gray-600 space-y-1">
            <p>서울특별시 강남구 테헤란로 123</p>
            <p>Tel: 02-1234-5678</p>
            <p>Email: contact@myitem.com</p>
            <p>사업자등록번호: 123-45-67890</p>
          </div>
        </div>

        {/* 저작권 */}
        <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} 나의 아이템. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}