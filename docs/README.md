# TreeCode 프로젝트 문서

## 프로젝트 개요

Next.js 기반의 전자상거래 웹 애플리케이션으로, Firebase와 Toss Payments를 통합한 풀스택 프로젝트입니다.

### 기술 스택

- **프레임워크**: Next.js 15.5.4 (App Router)
- **언어**: TypeScript
- **데이터베이스**: Firebase Firestore
- **인증**: Firebase Authentication (Google OAuth)
- **스토리지**: Firebase Storage
- **결제**: Toss Payments SDK (v1/payment)
- **스타일링**: Tailwind CSS
- **아이콘**: Lucide React

## 주요 기능

### 1. 사용자 인증
- Google OAuth 로그인/로그아웃
- 사용자 프로필 관리
- 보호된 라우트

### 2. 상품 관리
- 상품 목록 조회
- 상품 상세 페이지
- 카테고리별 분류

### 3. 결제 시스템
- Toss Payments 통합
- 다양한 결제 수단 (카드, 가상계좌, 계좌이체, 휴대폰)
- 결제 성공/실패 처리
- 자동결제(빌링) 지원
- 현금영수증 발급

### 4. 리뷰 시스템
- 별점 평가 (1-5점)
- 텍스트 리뷰 (제목, 내용)
- 이미지 첨부 (최대 5개)
- Firebase Storage 연동

## 프로젝트 구조

```
test3/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── reviews/         # 리뷰 API
│   │   └── payments/        # 결제 API
│   ├── checkout/            # 결제 페이지
│   ├── products/            # 상품 페이지
│   └── page.tsx             # 메인 페이지
├── components/              # React 컴포넌트
│   ├── reviews/             # 리뷰 컴포넌트
│   ├── sections/            # 섹션 컴포넌트
│   └── ui/                  # UI 컴포넌트
├── lib/                     # 유틸리티 및 설정
│   ├── auth/               # 인증 관련
│   ├── db/                 # 데이터베이스 스키마
│   ├── storage/            # Firebase Storage
│   └── firebase.ts         # Firebase 설정
├── docs/                    # 프로젝트 문서
└── public/                  # 정적 파일
```

## 환경 변수

`.env.local` 파일에 다음 환경 변수를 설정하세요:

```env
# Toss Payments
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_Poxy1XQL8RWgn6adQZlX37nO5Wml
TOSS_SECRET_KEY=test_sk_LlDJaYngrozm59GLRD9GVezGdRpX

# Firebase (firebase.ts에 하드코딩됨)
# Firebase 설정은 lib/firebase.ts 파일 참조
```

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 문서 목차

1. [Firebase 통합 가이드](./firebase-integration.md)
2. [Toss Payments 결제 연동](./toss-payments.md)
3. [인증 시스템](./authentication.md)
4. [리뷰 시스템](./review-system.md)
5. [API 참조](./api-reference.md)

## Firebase 프로젝트 정보

- **프로젝트 ID**: treecode-5fbb1
- **Storage Bucket**: gs://treecode-5fbb1.firebasestorage.app
- **Auth Domain**: treecode-5fbb1.firebaseapp.com

## 주의사항

### 테스트 환경
현재 Toss Payments는 **테스트 키**를 사용하고 있습니다. 프로덕션 배포 시 실제 키로 교체해야 합니다.

### Firebase Rules
Firebase Firestore와 Storage의 보안 규칙을 반드시 설정해야 합니다.

### 이미지 최적화
Next.js Image 컴포넌트를 사용하여 자동 최적화가 적용됩니다. `next.config.js`에서 허용된 도메인을 관리하세요.

## 라이선스

이 프로젝트는 개인 프로젝트입니다.
