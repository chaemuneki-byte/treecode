'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  category: string
  popular?: boolean
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const products: Product[] = [
    {
      id: '1',
      name: '기본형 패키지',
      description: '소규모 비즈니스에 적합한 기본 솔루션',
      price: 99000,
      category: 'basic',
      features: ['월 1,000건 처리', '기본 기능 제공', '이메일 지원', '월간 리포트'],
    },
    {
      id: '2',
      name: '프리미엄 패키지',
      description: '성장하는 기업을 위한 강력한 솔루션',
      price: 249000,
      category: 'premium',
      popular: true,
      features: ['월 5,000건 처리', '고급 기능 제공', '우선 지원', '주간 리포트', 'API 접근'],
    },
    {
      id: '3',
      name: '엔터프라이즈 패키지',
      description: '대규모 조직을 위한 맞춤형 솔루션',
      price: 599000,
      category: 'enterprise',
      features: ['무제한 처리', '모든 기능 제공', '전담 매니저', '실시간 리포트', 'API 접근', '커스터마이징'],
    },
  ]

  const comparisonFeatures = [
    { name: '월간 처리량', basic: '1,000건', premium: '5,000건', enterprise: '무제한' },
    { name: '기본 기능', basic: true, premium: true, enterprise: true },
    { name: '고급 기능', basic: false, premium: true, enterprise: true },
    { name: '우선 지원', basic: false, premium: true, enterprise: true },
    { name: 'API 접근', basic: false, premium: true, enterprise: true },
    { name: '전담 매니저', basic: false, premium: false, enterprise: true },
    { name: '커스터마이징', basic: false, premium: false, enterprise: true },
  ]

  const faqs = [
    {
      question: '패키지 변경은 어떻게 하나요?',
      answer: '언제든지 고객센터를 통해 패키지 변경이 가능합니다. 변경 시 잔여 기간에 대해서는 일할 계산하여 환불 또는 차액 정산이 이루어집니다.',
    },
    {
      question: '무료 체험 기간이 있나요?',
      answer: '모든 패키지에 대해 14일 무료 체험 기간을 제공합니다. 체험 기간 동안 전체 기능을 사용해보실 수 있습니다.',
    },
    {
      question: '결제는 어떻게 진행되나요?',
      answer: '신용카드, 계좌이체, 가상계좌 등 다양한 결제 수단을 지원합니다. 월간 또는 연간 결제를 선택하실 수 있습니다.',
    },
    {
      question: '환불 정책은 어떻게 되나요?',
      answer: '서비스 시작 후 7일 이내에는 전액 환불이 가능합니다. 이후에는 잔여 기간에 대해 일할 계산하여 환불해드립니다.',
    },
  ]

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'basic', name: '기본형' },
    { id: 'premium', name: '프리미엄' },
    { id: 'enterprise', name: '엔터프라이즈' },
  ]

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="bg-white">
      {/* 페이지 헤더 */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            상품 소개
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            귀사의 비즈니스에 맞는 최적의 솔루션을 선택하세요.
            <br />
            모든 패키지는 14일 무료 체험이 가능합니다.
          </p>
        </div>
      </section>

      {/* 카테고리 탭 */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 상품 그리드 */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow relative ${
                  product.popular ? 'border-blue-600' : 'border-gray-200'
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      인기
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {product.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {product.price.toLocaleString()}원
                    </span>
                    <span className="text-gray-600"> / 월</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                        <span className="ml-2 text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/products/${product.id}`}
                    className={`block w-full text-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      product.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    자세히 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상품 비교표 */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            패키지 비교
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">기능</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">기본형</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">프리미엄</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">엔터프라이즈</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-sm text-gray-900">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.basic === 'boolean' ? (
                        feature.basic ? (
                          <Check className="inline text-blue-600" size={20} />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )
                      ) : (
                        <span className="text-sm text-gray-600">{feature.basic}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.premium === 'boolean' ? (
                        feature.premium ? (
                          <Check className="inline text-blue-600" size={20} />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )
                      ) : (
                        <span className="text-sm text-gray-600">{feature.premium}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? (
                          <Check className="inline text-blue-600" size={20} />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )
                      ) : (
                        <span className="text-sm text-gray-600">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="text-gray-600" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-600" size={20} />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}