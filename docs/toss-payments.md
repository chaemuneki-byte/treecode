# Toss Payments 결제 연동 가이드

## 개요

이 프로젝트는 Toss Payments의 **v1/payment SDK**(레거시)를 사용합니다.
Payment Widget이 아닌 개별 SDK 통합 방식입니다.

## API 키

### 테스트 환경 키

```env
# .env.local
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_Poxy1XQL8RWgn6adQZlX37nO5Wml
TOSS_SECRET_KEY=test_sk_LlDJaYngrozm59GLRD9GVezGdRpX
```

⚠️ **주의**: 현재 테스트 키를 사용 중입니다. 프로덕션 배포 시 실제 키로 교체하세요.

### 키 타입 구분

- `test_ck_*`: 테스트 클라이언트 키 (브라우저에서 사용)
- `test_sk_*`: 테스트 시크릿 키 (서버에서만 사용)
- `live_ck_*`: 실제 클라이언트 키
- `live_sk_*`: 실제 시크릿 키

## 결제 플로우

### 1. 결제 페이지 진입

사용자가 `/checkout` 페이지로 이동합니다.

### 2. 결제 수단 선택

```typescript
// app/checkout/page.tsx
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('카드')

// 지원하는 결제 수단
const paymentMethods = [
  { value: '카드', label: '신용/체크카드', icon: CreditCard },
  { value: '가상계좌', label: '가상계좌', icon: Building2 },
  { value: '계좌이체', label: '계좌이체', icon: Landmark },
  { value: '휴대폰', label: '휴대폰 결제', icon: Smartphone }
]
```

### 3. Toss Payments SDK 로드

```typescript
<Script
  src="https://js.tosspayments.com/v1/payment"
  onLoad={() => setIsSdkLoaded(true)}
/>
```

### 4. 결제 요청

```typescript
const handlePayment = async () => {
  if (!isSdkLoaded || !window.TossPayments) {
    alert('결제 시스템을 불러오는 중입니다.')
    return
  }

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
  const tossPayments = await window.TossPayments(clientKey)

  await tossPayments.requestPayment(selectedPaymentMethod, {
    amount: 15000,
    orderId: `ORDER_${Date.now()}`,
    orderName: '테스트 상품',
    customerName: '홍길동',
    successUrl: `${window.location.origin}/checkout/success`,
    failUrl: `${window.location.origin}/checkout/fail`
  })
}
```

### 5. 결제 승인 (서버)

사용자가 결제를 완료하면 `successUrl`로 리다이렉트됩니다.

```typescript
// app/checkout/success/page.tsx
const searchParams = useSearchParams()
const paymentKey = searchParams.get('paymentKey')
const orderId = searchParams.get('orderId')
const amount = searchParams.get('amount')

// 서버에 결제 승인 요청
const response = await fetch('/api/payments/confirm', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ paymentKey, orderId, amount })
})
```

### 6. 결제 승인 API

```typescript
// app/api/payments/confirm/route.ts
export async function POST(request: NextRequest) {
  const { paymentKey, orderId, amount } = await request.json()

  const secretKey = process.env.TOSS_SECRET_KEY
  const encodedKey = Buffer.from(`${secretKey}:`).toString('base64')

  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ paymentKey, orderId, amount })
  })

  const paymentData = await response.json()

  if (response.ok) {
    // 주문 정보를 Firestore에 저장
    // ...
    return NextResponse.json({ success: true, payment: paymentData })
  }
}
```

## API 엔드포인트

### 1. 결제 승인

**POST** `/api/payments/confirm`

```json
// Request
{
  "paymentKey": "string",
  "orderId": "string",
  "amount": 15000
}

// Response (성공)
{
  "success": true,
  "payment": {
    "paymentKey": "string",
    "orderId": "string",
    "status": "DONE",
    // ... Toss 응답 데이터
  }
}
```

### 2. 결제 취소

**POST** `/api/payments/cancel`

```json
// Request
{
  "paymentKey": "string",
  "cancelReason": "고객 변심"
}

// Response
{
  "success": true,
  "cancellation": {
    // ... 취소 정보
  }
}
```

### 3. 자동결제(빌링) 등록

**POST** `/api/payments/billing`

```json
// Request
{
  "customerKey": "user_123",
  "authKey": "auth_key_from_toss"
}

// Response
{
  "success": true,
  "billingKey": "billing_key_123"
}
```

### 4. 현금영수증 발급

**POST** `/api/payments/cash-receipt`

```json
// Request
{
  "paymentKey": "string",
  "type": "소득공제" | "지출증빙",
  "registrationNumber": "01012345678" | "123-45-67890"
}

// Response
{
  "success": true,
  "receipt": {
    // ... 영수증 정보
  }
}
```

## 결제 상태

Toss Payments의 결제 상태 값:

| 상태 | 설명 |
|------|------|
| `READY` | 결제 준비 |
| `IN_PROGRESS` | 결제 진행 중 |
| `WAITING_FOR_DEPOSIT` | 가상계좌 입금 대기 |
| `DONE` | 결제 완료 |
| `CANCELED` | 결제 취소 |
| `PARTIAL_CANCELED` | 부분 취소 |
| `ABORTED` | 결제 승인 실패 |
| `EXPIRED` | 결제 유효시간 만료 |

## 결제 수단별 특이사항

### 카드 결제

- 즉시 결제 완료
- 할부 개월 수 선택 가능
- 일부 카드사는 테스트 불가

### 가상계좌

- 입금 대기 상태로 전환
- 웹훅으로 입금 완료 알림 수신 필요
- 유효기간 설정 가능

```typescript
await tossPayments.requestPayment('가상계좌', {
  // ...
  validHours: 24, // 24시간 유효
  cashReceipt: {
    type: '소득공제'
  }
})
```

### 계좌이체

- 실시간 이체
- 즉시 결제 완료
- 은행 점검시간 확인 필요

### 휴대폰 결제

- 월 결제 한도 존재
- 청소년 보호 정책 적용
- 통신사별 제한 확인

## 웹훅 설정

가상계좌 입금 완료 등의 이벤트를 받으려면 웹훅을 설정해야 합니다.

### 1. Toss 개발자 센터 설정

1. [Toss Payments 개발자 센터](https://developers.tosspayments.com/) 로그인
2. 내 개발정보 → 웹훅 설정
3. 웹훅 URL 등록: `https://yourdomain.com/api/payments/webhook`

### 2. 웹훅 엔드포인트 구현

```typescript
// app/api/payments/webhook/route.ts
export async function POST(request: NextRequest) {
  const event = await request.json()

  switch (event.eventType) {
    case 'PAYMENT_STATUS_CHANGED':
      // 결제 상태 변경 처리
      if (event.data.status === 'DONE') {
        // 가상계좌 입금 완료
      }
      break

    case 'PAYMENT_CANCELED':
      // 결제 취소 처리
      break
  }

  return NextResponse.json({ received: true })
}
```

## 테스트 카드 정보

Toss Payments 테스트 환경에서 사용 가능한 카드:

| 카드사 | 카드번호 | 유효기간 | CVC |
|--------|----------|----------|-----|
| 신한카드 | 5543-9000-0000-0001 | 12/25 | 123 |
| KB국민카드 | 9430-0000-0000-0001 | 12/25 | 123 |
| 현대카드 | 5452-0000-0000-0001 | 12/25 | 123 |

## 오류 처리

### 일반적인 오류

```typescript
try {
  await tossPayments.requestPayment(/* ... */)
} catch (error: any) {
  if (error.code === 'USER_CANCEL') {
    // 사용자가 결제 취소
  } else if (error.code === 'INVALID_CARD_NUMBER') {
    // 잘못된 카드번호
  } else {
    console.error('결제 오류:', error)
  }
}
```

### 주요 에러 코드

| 코드 | 설명 |
|------|------|
| `USER_CANCEL` | 사용자가 결제 취소 |
| `INVALID_CARD_NUMBER` | 잘못된 카드번호 |
| `INVALID_CARD_EXPIRATION` | 잘못된 유효기간 |
| `INVALID_CARD_CVC` | 잘못된 CVC |
| `NOT_SUPPORTED_CARD` | 지원하지 않는 카드 |
| `EXCEED_MAX_AMOUNT` | 최대 금액 초과 |
| `FAILED_PAYMENT_APPROVAL` | 결제 승인 실패 |

## 보안 고려사항

### 1. Secret Key 보호

- Secret Key는 **절대** 클라이언트에 노출하지 마세요
- 환경 변수로 관리
- GitHub에 커밋하지 않도록 `.gitignore` 설정

### 2. 금액 검증

```typescript
// 서버에서 금액을 다시 계산하여 검증
const calculatedAmount = order.items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
)

if (calculatedAmount !== Number(amount)) {
  return NextResponse.json(
    { error: '금액이 일치하지 않습니다' },
    { status: 400 }
  )
}
```

### 3. orderId 중복 방지

```typescript
const orderId = `ORDER_${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
```

## 프로덕션 체크리스트

- [ ] 실제 API 키로 교체
- [ ] 웹훅 URL 설정
- [ ] HTTPS 적용 확인
- [ ] 결제 금액 검증 로직 구현
- [ ] 에러 로깅 설정
- [ ] 주문 정보 DB 저장 로직 구현
- [ ] 환불 정책 구현
- [ ] 개인정보 처리방침 작성
- [ ] 이용약관 작성

## 참고 자료

- [Toss Payments 개발자 문서](https://docs.tosspayments.com/)
- [API 레퍼런스](https://docs.tosspayments.com/reference)
- [결제 연동 가이드](https://docs.tosspayments.com/guides/payment-widget/integration)
- [테스트 카드 정보](https://docs.tosspayments.com/reference/testing/card)
