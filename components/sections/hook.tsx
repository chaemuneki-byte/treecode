export default function Hook() {
  return (
    <section className="bg-blue-600 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
          10만 명의 고객이 선택한 이유
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          합리적인 가격, 탁월한 품질, 완벽한 서비스.
          <br />
          나의 아이템은 고객의 만족을 최우선으로 생각합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">10만+</div>
            <div className="text-lg text-blue-100">누적 고객 수</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">98%</div>
            <div className="text-lg text-blue-100">고객 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">24시간</div>
            <div className="text-lg text-blue-100">평균 배송 시간</div>
          </div>
        </div>
      </div>
    </section>
  )
}
