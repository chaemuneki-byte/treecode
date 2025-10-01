'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, ShoppingCart, Star, ChevronLeft, Package, Shield, Truck, HeadphonesIcon } from 'lucide-react'

interface ProductDetail {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  category: string
  popular?: boolean
  detailDescription: string
  specs: { label: string; value: string }[]
  benefits: string[]
  reviews: { name: string; rating: number; comment: string; date: string }[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')

  // 상품 데이터 (실제로는 API에서 가져옴)
  const productsData: { [key: string]: ProductDetail } = {
    '1': {
      id: '1',
      name: '기본형 패키지',
      description: '소규모 비즈니스에 적합한 기본 솔루션',
      price: 99000,
      category: 'basic',
      detailDescription: '소규모 비즈니스와 스타트업을 위해 설계된 기본형 패키지는 필수 기능을 합리적인 가격으로 제공합니다. 간편한 설정과 직관적인 인터페이스로 누구나 쉽게 시작할 수 있습니다.',
      features: ['월 1,000건 처리', '기본 기능 제공', '이메일 지원', '월간 리포트'],
      specs: [
        { label: '처리 용량', value: '월 1,000건' },
        { label: '지원 방식', value: '이메일 지원 (평일 9-6시)' },
        { label: '리포트', value: '월간 분석 리포트' },
        { label: '저장 용량', value: '10GB' },
        { label: '사용자 계정', value: '최대 3명' },
      ],
      benefits: [
        '14일 무료 체험',
        '언제든지 업그레이드 가능',
        '데이터 암호화',
        '99.9% 가동 시간 보장',
      ],
      reviews: [
        { name: '김철수', rating: 5, comment: '가격 대비 훌륭한 기능입니다. 소규모 팀에 딱 맞아요.', date: '2024-01-15' },
        { name: '이영희', rating: 4, comment: '시작하기 좋은 플랜입니다. UI가 직관적이에요.', date: '2024-01-10' },
      ],
    },
    '2': {
      id: '2',
      name: '프리미엄 패키지',
      description: '성장하는 기업을 위한 강력한 솔루션',
      price: 249000,
      category: 'premium',
      popular: true,
      detailDescription: '성장하는 기업을 위한 프리미엄 패키지는 고급 기능과 우선 지원을 제공합니다. API 접근과 주간 리포트로 비즈니스 인사이트를 실시간으로 확인하세요.',
      features: ['월 5,000건 처리', '고급 기능 제공', '우선 지원', '주간 리포트', 'API 접근'],
      specs: [
        { label: '처리 용량', value: '월 5,000건' },
        { label: '지원 방식', value: '우선 지원 (채팅, 이메일 24시간)' },
        { label: '리포트', value: '주간 분석 리포트 + 대시보드' },
        { label: '저장 용량', value: '50GB' },
        { label: '사용자 계정', value: '최대 10명' },
        { label: 'API', value: 'REST API 접근' },
      ],
      benefits: [
        '14일 무료 체험',
        '전용 계정 매니저',
        '고급 분석 도구',
        '우선 기술 지원',
        '커스텀 통합 지원',
      ],
      reviews: [
        { name: '박지훈', rating: 5, comment: '팀이 성장하면서 프리미엄으로 업그레이드했는데 매우 만족합니다.', date: '2024-01-20' },
        { name: '최민정', rating: 5, comment: 'API 기능이 정말 유용해요. 업무 효율이 2배 올랐습니다.', date: '2024-01-18' },
        { name: '정수현', rating: 4, comment: '가격은 있지만 그만한 가치가 있습니다.', date: '2024-01-12' },
      ],
    },
    '3': {
      id: '3',
      name: '엔터프라이즈 패키지',
      description: '대규모 조직을 위한 맞춤형 솔루션',
      price: 599000,
      category: 'enterprise',
      detailDescription: '대규모 조직과 엔터프라이즈를 위한 최고급 솔루션입니다. 무제한 처리 용량, 전담 매니저, 맞춤형 커스터마이징으로 비즈니스 요구사항을 완벽하게 충족합니다.',
      features: ['무제한 처리', '모든 기능 제공', '전담 매니저', '실시간 리포트', 'API 접근', '커스터마이징'],
      specs: [
        { label: '처리 용량', value: '무제한' },
        { label: '지원 방식', value: '전담 매니저 (24/7 지원)' },
        { label: '리포트', value: '실시간 대시보드 + 맞춤 리포트' },
        { label: '저장 용량', value: '무제한' },
        { label: '사용자 계정', value: '무제한' },
        { label: 'API', value: 'REST + GraphQL API' },
        { label: '커스터마이징', value: '맞춤형 기능 개발' },
      ],
      benefits: [
        '30일 무료 체험',
        '전담 성공 매니저',
        '맞춤형 온보딩 교육',
        '우선 순위 지원',
        'SLA 99.99% 보장',
        '보안 감사 지원',
      ],
      reviews: [
        { name: '강대리', rating: 5, comment: '대기업 수준의 서비스입니다. 전담 매니저가 정말 도움이 됩니다.', date: '2024-01-25' },
        { name: '윤부장', rating: 5, comment: '커스터마이징 기능 덕분에 우리 회사에 딱 맞게 사용하고 있습니다.', date: '2024-01-22' },
      ],
    },
    '전자제품': {
      id: '전자제품',
      name: '프리미엄 무선 이어폰',
      description: '최고의 음질과 편안함을 선사하는 무선 이어폰',
      price: 129000,
      category: '전자제품',
      popular: true,
      detailDescription: '프리미엄 무선 이어폰은 최신 ANC(능동 소음 제거) 기술과 고품질 오디오 드라이버를 탑재하여 최상의 청취 경험을 제공합니다. 인체공학적 디자인으로 장시간 착용해도 편안하며, IPX7 방수 등급으로 운동이나 야외 활동 시에도 안심하고 사용할 수 있습니다.',
      features: ['노이즈 캔슬링', '30시간 재생', '방수 기능', '블루투스 5.3', '멀티포인트 연결', '무선 충전'],
      specs: [
        { label: '배터리 수명', value: '이어폰 8시간 + 케이스 22시간' },
        { label: '충전 방식', value: 'USB-C 및 무선 충전' },
        { label: '블루투스', value: '블루투스 5.3' },
        { label: '방수 등급', value: 'IPX7' },
        { label: '드라이버', value: '10mm 다이나믹 드라이버' },
        { label: '무게', value: '이어폰 5g / 케이스 45g' },
        { label: '색상', value: '블랙, 화이트, 네이비' },
      ],
      benefits: [
        '1년 무상 보증',
        '30일 무료 반품',
        '전국 무료 배송',
        '프리미엄 케이스 제공',
        '여분 이어팁 3종 제공',
      ],
      reviews: [
        { name: '이준호', rating: 5, comment: '음질이 정말 뛰어나요. 노이즈 캔슬링도 완벽합니다!', date: '2024-02-10' },
        { name: '박서연', rating: 5, comment: '배터리 수명이 길어서 출장 갈 때 편해요.', date: '2024-02-08' },
        { name: '김민수', rating: 4, comment: '착용감이 좋고 방수 기능이 유용합니다.', date: '2024-02-05' },
        { name: '정하늘', rating: 5, comment: '이 가격에 이런 퀄리티면 가성비 최고!', date: '2024-02-01' },
      ],
    },
    '생활용품': {
      id: '생활용품',
      name: '스마트 공기청정기',
      description: 'AI 기반 자동 제어로 언제나 깨끗한 공기',
      price: 249000,
      category: '생활용품',
      popular: true,
      detailDescription: '스마트 공기청정기는 AI 센서로 실내 공기질을 실시간 분석하여 자동으로 최적의 정화 모드를 선택합니다. IoT 연동으로 스마트폰 앱을 통해 원격 제어가 가능하며, 초미세먼지(PM2.5)는 물론 유해가스, 알레르기 유발 물질까지 효과적으로 제거합니다.',
      features: ['자동 모드', 'IoT 연결', '저소음 설계', 'HEPA 13 필터', '360도 청정', 'AI 센서'],
      specs: [
        { label: '적용 면적', value: '최대 33㎡ (약 10평)' },
        { label: '필터 종류', value: 'HEPA 13 + 활성탄 필터' },
        { label: '소음 수준', value: '최저 22dB / 최고 48dB' },
        { label: '전력 소비', value: '최대 45W' },
        { label: '센서', value: 'PM2.5, PM10, 온도, 습도, VOC' },
        { label: '제어 방식', value: '터치 패널, 앱(iOS/Android)' },
        { label: '크기', value: '320 x 320 x 650mm' },
      ],
      benefits: [
        '2년 무상 보증',
        '첫 교체 필터 무료 제공',
        '전국 무료 배송 및 설치',
        'IoT 스마트홈 연동',
        '에너지 효율 1등급',
      ],
      reviews: [
        { name: '최영미', rating: 5, comment: '앱으로 제어할 수 있어서 너무 편리해요. 공기질도 확실히 좋아졌어요.', date: '2024-02-12' },
        { name: '강태우', rating: 5, comment: '소음이 거의 없어서 밤에 켜두고 자도 괜찮습니다.', date: '2024-02-09' },
        { name: '윤지원', rating: 4, comment: '디자인도 예쁘고 기능도 훌륭합니다. 만족스러워요.', date: '2024-02-06' },
        { name: '박현우', rating: 5, comment: '알레르기가 있는데 사용 후 증상이 많이 줄었어요!', date: '2024-02-03' },
      ],
    },
    '패션': {
      id: '패션',
      name: '클래식 가죽 가방',
      description: '고급스러운 천연 가죽으로 제작된 프리미엄 가방',
      price: 189000,
      category: '패션',
      detailDescription: '이탈리아산 천연 소가죽으로 제작된 클래식 가죽 가방은 시간이 지날수록 깊어지는 멋을 자랑합니다. 넉넉한 수납 공간과 실용적인 포켓 구성으로 일상부터 비즈니스까지 다양한 상황에서 활용할 수 있습니다. 장인의 손길로 하나하나 정성스럽게 제작되어 내구성이 뛰어나며, 세련된 디자인으로 오래도록 사용할 수 있는 명품급 가방입니다.',
      features: ['천연 가죽', '수납공간 넉넉', '세련된 디자인', '핸드메이드', '조절 가능 스트랩', '내부 포켓 다수'],
      specs: [
        { label: '소재', value: '이탈리아산 천연 소가죽' },
        { label: '크기', value: '40 x 30 x 12cm' },
        { label: '무게', value: '약 900g' },
        { label: '스트랩', value: '조절 가능 (최대 140cm)' },
        { label: '수납', value: '노트북 수납 가능 (최대 15인치)' },
        { label: '포켓', value: '외부 2개 / 내부 4개' },
        { label: '색상', value: '브라운, 블랙, 네이비' },
      ],
      benefits: [
        '평생 무상 수선 (봉제, 지퍼)',
        '가죽 관리 키트 제공',
        '고급 더스트백 포함',
        '각인 서비스 무료',
        '30일 교환 보장',
      ],
      reviews: [
        { name: '조성현', rating: 5, comment: '가죽 질감이 정말 좋아요. 명품 못지않은 퀄리티입니다.', date: '2024-02-11' },
        { name: '김수진', rating: 5, comment: '수납공간이 넉넉해서 출퇴근용으로 완벽해요.', date: '2024-02-07' },
        { name: '이동민', rating: 4, comment: '디자인이 클래식하면서도 세련돼서 마음에 듭니다.', date: '2024-02-04' },
        { name: '박은지', rating: 5, comment: '무료 각인 서비스까지! 선물용으로 최고예요.', date: '2024-02-02' },
      ],
    },
  }

  const product = productsData[params.id as string]

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">상품을 찾을 수 없습니다</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const periodOptions = [
    { id: 'monthly', label: '월간', discount: 0 },
    { id: 'yearly', label: '연간', discount: 20 },
  ]

  const calculatePrice = () => {
    const basePrice = product.price * quantity
    const discount = selectedPeriod === 'yearly' ? 0.2 : 0
    return Math.floor(basePrice * (1 - discount))
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* 뒤로가기 버튼 */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="ml-1">상품 목록으로</span>
        </button>
      </div>

      {/* 메인 상품 정보 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* 왼쪽: 상품 정보 */}
            <div>
              {product.popular && (
                <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                  인기 상품
                </span>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-6">{product.description}</p>
              <p className="text-gray-700 leading-relaxed mb-8">{product.detailDescription}</p>

              {/* 주요 기능 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">주요 기능</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 혜택 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">포함된 혜택</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <Shield className="text-green-600 flex-shrink-0" size={18} />
                      <span className="ml-2 text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 오른쪽: 구매 옵션 */}
            <div>
              <div className="bg-gray-50 rounded-xl p-8 sticky top-24">
                <div className="mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {calculatePrice().toLocaleString()}원
                  </div>
                  <div className="text-gray-600">
                    {selectedPeriod === 'yearly' && (
                      <span className="text-green-600 font-medium mr-2">20% 할인</span>
                    )}
                    / {selectedPeriod === 'monthly' ? '월' : '년'}
                  </div>
                </div>

                {/* 기간 선택 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">결제 주기</label>
                  <div className="grid grid-cols-2 gap-3">
                    {periodOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedPeriod(option.id)}
                        className={`relative p-4 rounded-lg border-2 transition-all ${
                          selectedPeriod === option.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900">{option.label}</div>
                        {option.discount > 0 && (
                          <div className="text-xs text-green-600 font-medium">
                            {option.discount}% 할인
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 수량 선택 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">수량</label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-medium text-gray-900 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 구매 버튼 */}
                <button
                  onClick={() => {
                    const checkoutUrl = `/checkout?productId=${product.id}&productName=${encodeURIComponent(product.name)}&price=${product.price}&quantity=${quantity}`
                    router.push(checkoutUrl)
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg transition-colors flex items-center justify-center mb-3"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  구매하기
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 rounded-lg border-2 border-gray-200 transition-colors">
                  14일 무료 체험
                </button>

                {/* 서비스 안내 */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck size={18} className="mr-3 text-gray-400" />
                    즉시 사용 가능
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield size={18} className="mr-3 text-gray-400" />
                    30일 환불 보장
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <HeadphonesIcon size={18} className="mr-3 text-gray-400" />
                    24/7 고객 지원
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 스펙 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">상세 사양</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.specs.map((spec, idx) => (
              <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="font-medium text-gray-700">{spec.label}</span>
                <span className="text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 고객 리뷰 */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">고객 리뷰</h2>
          <div className="space-y-6">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{review.name}</div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}