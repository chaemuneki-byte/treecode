import { Truck, Shield, HeadphonesIcon } from 'lucide-react'

export default function Benefits() {
  const benefits = [
    {
      icon: Truck,
      title: '무료 배송',
      description: '전 상품 무료 배송 서비스를 제공합니다. 빠르고 안전하게 받아보세요.',
    },
    {
      icon: Shield,
      title: '품질 보증',
      description: '모든 제품은 엄격한 품질 검사를 거쳤습니다. 1년 무상 보증을 제공합니다.',
    },
    {
      icon: HeadphonesIcon,
      title: '고객 지원',
      description: '평일 오전 9시부터 오후 6시까지 전문 상담사가 언제나 대기하고 있습니다.',
    },
  ]

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
          나의 아이템만의 특별한 혜택
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <benefit.icon className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
