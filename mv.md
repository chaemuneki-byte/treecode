Simple MVP Website PRD
프로젝트 개요
간단한 헤더-바디-푸터 구조의 MVP 홈페이지 개발
기술 스택

Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS
Deployment: Vercel
Package Manager: npm

프로젝트 구조
simple-mvp-website/
├── app/
│   ├── page.tsx          # 메인 홈페이지
│   ├── about/
│   │   └── page.tsx      # 회사 소개
│   ├── services/
│   │   └── page.tsx      # 서비스 소개
│   ├── contact/
│   │   └── page.tsx      # 연락처
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── header.tsx    # 상단 네비게이션
│   │   ├── footer.tsx    # 하단 푸터
│   │   └── main-layout.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── navigation.tsx
│   └── sections/
│       ├── hero.tsx      # 메인 히어로 섹션
│       ├── features.tsx  # 특징/서비스 섹션
│       └── cta.tsx       # 행동유도 섹션
├── lib/
│   └── utils.ts
├── package.json
├── tailwind.config.js
└── next.config.js
개발 단계
1단계: 프로젝트 생성
bashnpx create-next-app@latest simple-mvp --typescript --tailwind --eslint --app
cd simple-mvp
npm install lucide-react class-variance-authority clsx tailwind-merge
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card
2단계: 기본 레이아웃 구성
Header 요구사항:

로고/회사명 (왼쪽)
네비게이션 메뉴: Home, About, Services, Contact (오른쪽)
모바일 반응형 햄버거 메뉴
배경색: 흰색, 그림자 효과

Footer 요구사항:

회사 정보 (왼쪽): 회사명, 주소, 전화번호
소셜 링크 (오른쪽): GitHub, LinkedIn, Twitter
저작권 정보 (중앙 하단)
배경색: 회색 (#f8f9fa)

Main Body 구조:

Hero Section: 제목, 부제목, CTA 버튼
Features Section: 3개 특징 카드
CTA Section: 연락 유도 섹션

3단계: 페이지 내용
메인 페이지 (/):

Hero: "우리는 혁신적인 솔루션을 제공합니다"
Features: "빠른 개발", "안정적인 서비스", "24/7 지원"
CTA: "지금 시작하기" 버튼

About 페이지 (/about):

회사 소개
팀 소개
미션/비전

Services 페이지 (/services):

제공 서비스 목록
각 서비스별 설명 카드

Contact 페이지 (/contact):

연락처 정보
간단한 문의 폼 (이름, 이메일, 메시지)

4단계: 스타일링 가이드
색상 팔레트:

Primary: #3b82f6 (파란색)
Secondary: #64748b (회색)
Background: #ffffff (흰색)
Text: #1e293b (어두운 회색)

타이포그래피:

제목: font-bold text-4xl
부제목: font-semibold text-2xl
본문: text-base
버튼: font-medium

간격:

섹션 패딩: py-16 px-4
컨테이너 최대폭: max-w-7xl mx-auto
카드 간격: gap-8

5단계: 반응형 디자인
브레이크포인트:

Mobile: 기본 (< 768px)
Tablet: md: (768px+)
Desktop: lg: (1024px+)

모바일 우선 접근:

네비게이션: 햄버거 메뉴
그리드: 1열 → 2열 → 3열
텍스트 크기: 작게 → 크게
패딩/마진: 작게 → 크게

컴포넌트 명세
Header 컴포넌트
typescriptinterface HeaderProps {
  // 네비게이션 메뉴 항목들
  // 모바일 메뉴 토글 상태
  // 현재 페이지 하이라이트
}
Footer 컴포넌트
typescriptinterface FooterProps {
  // 회사 정보
  // 소셜 링크 목록
  // 저작권 년도
}
Hero 섹션
typescriptinterface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
}
Features 섹션
typescriptinterface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesProps {
  features: Feature[]
}
배포 준비
next.config.js
javascript/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
배포 명령어
bashnpm run build
npx vercel
⚠️ 중요: 전문적인 디자인 가이드라인
금지 사항 - AI 스러운 요소들

이모지 사용 금지 (🚀, 💡, ⭐, 📱 등 모든 이모지)
그라데이션 효과 금지 (background: linear-gradient 등)
네온/글로우 효과 금지 (box-shadow: 0 0 20px 등)
과도한 애니메이션 금지 (bounce, pulse, spin 등)
화려한 컬러 조합 금지 (보라색+핑크, 청록색+노란색 등)
AI 관련 키워드 금지 ("혁신적인", "차세대", "스마트한" 등)

권장 사항 - 전문적인 디자인

단색 배경만 사용 (흰색, 회색, 단일 컬러)
심플한 테두리 (border: 1px solid #e5e7eb)
미묘한 그림자 (box-shadow: 0 1px 3px rgba(0,0,0,0.1))
전문적인 카피라이팅 ("신뢰할 수 있는", "검증된", "실용적인")
최소한의 색상 사용 (흰색, 회색, 단일 포인트 컬러)
깔끔한 타이포그래피 (Inter, System 폰트 사용)

컨텐츠 가이드라인

구체적인 수치 사용 ("99.9% 가동률", "24시간 대응")
실제 비즈니스 용어 ("고객 지원", "솔루션 제공", "서비스 운영")
업계 표준 표현 ("엔터프라이즈급", "비즈니스 솔루션")
신뢰성 강조 ("15년 경험", "1000+ 고객사")

레이아웃 원칙

충분한 여백 활용
정렬된 그리드 시스템
일관된 간격 사용
명확한 시각적 계층구조
읽기 쉬운 폰트 크기 (최소 16px)

이 가이드라인을 엄격히 준수하여 진짜 회사 홈페이지처럼 보이는 전문적인 MVP를 만들어야 합니다.