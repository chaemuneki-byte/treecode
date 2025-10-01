import Link from 'next/link'

export default function Offer() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-blue-600 p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            지금 가입하시면 특별 혜택을 드립니다
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            첫 구매 시 20% 할인 쿠폰과 무료 배송 혜택을 받아가세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/register"
              className="inline-block px-10 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              회원가입하기
            </Link>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-blue-700 text-white font-medium rounded-lg border-2 border-white hover:bg-blue-800 transition-colors duration-200"
            >
              문의하기
            </Link>
          </div>
          <div className="text-sm text-blue-100">
            <p>고객센터: 02-1234-5678</p>
            <p>평일 09:00 - 18:00 (주말 및 공휴일 휴무)</p>
          </div>
        </div>
      </div>
    </section>
  )
}