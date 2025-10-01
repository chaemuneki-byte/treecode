import Link from 'next/link'
import Image from 'next/image'

export default function Products() {
  const products = [
    {
      id: '전자제품',
      category: '전자제품',
      name: '프리미엄 무선 이어폰',
      price: '129,000원',
      features: ['노이즈 캔슬링', '30시간 재생', '방수 기능'],
      badge: '인기',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
    },
    {
      id: '생활용품',
      category: '생활용품',
      name: '스마트 공기청정기',
      price: '249,000원',
      features: ['자동 모드', 'IoT 연결', '저소음 설계'],
      badge: '추천',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop',
    },
    {
      id: '패션',
      category: '패션',
      name: '클래식 가죽 가방',
      price: '189,000원',
      features: ['천연 가죽', '수납공간 넉넉', '세련된 디자인'],
      badge: '신상',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    },
  ]

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
          추천 상품
        </h2>
        <p className="text-center text-gray-600 mb-12">
          엄선된 베스트 상품을 만나보세요
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              {/* 상품 이미지 영역 */}
              <div className="aspect-square relative bg-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>

              {/* 상품 정보 */}
              <div className="p-6">
                {product.badge && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-3">
                    {product.badge}
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {product.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/products/${product.id}`}
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}