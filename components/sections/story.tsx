export default function Story() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              신뢰를 바탕으로 성장하는 기업
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              나의 아이템은 2015년 설립 이후 고객과의 약속을 최우선으로 하며 꾸준히 성장해왔습니다.
              합리적인 가격과 우수한 품질로 고객의 신뢰를 얻어왔으며, 이제는 업계 선두주자로 자리매김했습니다.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              우리의 목표는 단순히 상품을 판매하는 것이 아닙니다.
              고객의 일상에 실질적인 가치를 더하고, 만족스러운 경험을 제공하는 것입니다.
              전문적인 팀과 체계적인 시스템으로 최상의 서비스를 보장합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="text-3xl font-bold text-blue-600 mb-2">9년</div>
                <div className="text-gray-600">업계 경력</div>
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">전문 인력</div>
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-blue-600 mb-2">1,000+</div>
                <div className="text-gray-600">취급 상품</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-lg">Company Image</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
