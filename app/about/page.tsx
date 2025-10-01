import { Building2, Users, Target, Award } from 'lucide-react'

export const metadata = {
  title: '회사소개 | 나의 아이템',
  description: '신뢰할 수 있는 파트너, 나의 아이템을 소개합니다. 2015년 설립 이후 고객 만족을 최우선으로 성장해왔습니다.',
}

export default function AboutPage() {
  const coreValues = [
    {
      icon: Building2,
      title: '신뢰성',
      description: '고객과의 약속을 최우선으로 하며, 투명한 경영을 실천합니다.',
    },
    {
      icon: Users,
      title: '고객 중심',
      description: '고객의 니즈를 정확히 파악하고 최상의 서비스를 제공합니다.',
    },
    {
      icon: Target,
      title: '전문성',
      description: '업계 최고의 전문가들이 검증된 솔루션을 제공합니다.',
    },
    {
      icon: Award,
      title: '품질 보증',
      description: '엄격한 품질 관리 시스템으로 최고 품질을 보장합니다.',
    },
  ]

  const timeline = [
    { year: '2015', event: '회사 설립' },
    { year: '2017', event: '누적 고객 1만 명 돌파' },
    { year: '2019', event: '직원 50명 규모로 확대' },
    { year: '2021', event: '연매출 100억 달성' },
    { year: '2023', event: '해외 시장 진출' },
    { year: '2024', event: '업계 선두 기업 입지 확보' },
  ]

  return (
    <div className="bg-white">
      {/* 페이지 헤더 */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            회사소개
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            고객의 성공이 우리의 성공입니다.
            <br />
            나의 아이템은 신뢰할 수 있는 파트너로서 고객과 함께 성장합니다.
          </p>
        </div>
      </section>

      {/* 회사 개요 */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                믿을 수 있는 파트너
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                나의 아이템은 2015년 설립 이후 고객 만족을 최우선 가치로 하여 꾸준히 성장해왔습니다.
                현재 50명 이상의 전문 인력이 1,000개 이상의 상품을 취급하며,
                연간 10만 명 이상의 고객에게 서비스를 제공하고 있습니다.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                우리는 단순히 상품을 판매하는 것을 넘어, 고객의 비즈니스 성공을 돕는 솔루션 파트너로 자리매김하고 있습니다.
                검증된 제품과 전문적인 서비스로 고객의 신뢰를 얻고 있으며,
                업계 최고 수준의 고객 만족도를 자랑합니다.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">9년</div>
                  <div className="text-gray-600">업계 경력</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">전문 인력</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">1,000+</div>
                  <div className="text-gray-600">취급 상품</div>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-lg">회사 이미지 영역</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 미션 & 비전 */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">미션</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                고객의 성공을 최우선으로 하며, 합리적인 가격과 우수한 품질로
                고객의 비즈니스 성장에 기여합니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">비전</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                업계 최고의 서비스 품질을 바탕으로 고객이 가장 먼저 찾는
                신뢰할 수 있는 파트너가 되겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            핵심 가치
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            연혁
          </h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex items-start mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-24 text-right pr-6">
                  <span className="text-2xl font-bold text-blue-600">{item.year}</span>
                </div>
                <div className="flex-shrink-0 w-px h-full bg-gray-300 mx-4"></div>
                <div className="flex-grow pt-1">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-lg text-gray-900">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}