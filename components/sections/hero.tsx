import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
          당신의 일상을 바꾸는
          <br />
          최고의 선택
        </h1>
        <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
          나의 아이템은 고객의 라이프스타일에 맞는 최적의 솔루션을 제공합니다.
          <br />
          지금 바로 경험해보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            상품 둘러보기
          </Link>
          <Link
            href="/about"
            className="inline-block px-8 py-4 bg-white text-gray-900 font-medium rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200"
          >
            자세히 알아보기
          </Link>
        </div>
      </div>
    </section>
  )
}