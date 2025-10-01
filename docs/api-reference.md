# API 참조 문서

## 개요

이 문서는 프로젝트의 모든 API 엔드포인트에 대한 상세 참조를 제공합니다.

## 베이스 URL

```
개발 환경: http://localhost:3000
프로덕션: https://yourdomain.com
```

## 인증

대부분의 API는 인증이 필요합니다. Firebase ID Token을 Authorization 헤더에 포함하세요.

```http
Authorization: Bearer {firebase_id_token}
```

---

## 리뷰 API

### 리뷰 생성

새로운 리뷰를 작성합니다.

**Endpoint**: `POST /api/reviews`

**Authentication**: 필수

**Request Body**:

```typescript
{
  userId: string          // Firebase UID
  userName: string        // 사용자 이름
  userEmail: string       // 사용자 이메일
  userPhoto?: string      // 프로필 사진 URL (선택)
  rating: number          // 1-5 사이의 정수
  title: string           // 제목 (최대 100자)
  content: string         // 내용 (최대 1000자)
  images?: string[]       // 이미지 URL 배열 (선택, 최대 5개)
}
```

**Response (200 OK)**:

```typescript
{
  success: true,
  review: {
    id: string
    userId: string
    userName: string
    userEmail: string
    userPhoto?: string
    rating: number
    title: string
    content: string
    images?: string[]
    createdAt: string     // ISO 8601 형식
    updatedAt: string     // ISO 8601 형식
  }
}
```

**Response (400 Bad Request)**:

```typescript
{
  success: false,
  message: string         // 에러 메시지
}
```

**Response (500 Internal Server Error)**:

```typescript
{
  success: false,
  message: string
}
```

**예시**:

```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "userName": "홍길동",
    "userEmail": "hong@example.com",
    "rating": 5,
    "title": "정말 좋아요!",
    "content": "품질이 훌륭합니다.",
    "images": ["https://..."]
  }'
```

---

### 리뷰 조회

리뷰 목록을 조회합니다.

**Endpoint**: `GET /api/reviews`

**Authentication**: 불필요

**Query Parameters**:

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|---------|------|------|--------|------|
| limit | number | 아니오 | 10 | 조회할 리뷰 개수 |

**Response (200 OK)**:

```typescript
{
  success: true,
  reviews: Array<{
    id: string
    userId: string
    userName: string
    userEmail: string
    userPhoto?: string
    rating: number
    title: string
    content: string
    images?: string[]
    createdAt: string
    updatedAt: string
  }>
}
```

**예시**:

```bash
curl http://localhost:3000/api/reviews?limit=5
```

---

## 결제 API

### 결제 승인

Toss Payments 결제를 승인합니다.

**Endpoint**: `POST /api/payments/confirm`

**Authentication**: 권장 (현재 미구현)

**Request Body**:

```typescript
{
  paymentKey: string      // Toss에서 받은 결제 키
  orderId: string         // 주문 ID
  amount: number          // 결제 금액
}
```

**Response (200 OK)**:

```typescript
{
  success: true,
  payment: {
    paymentKey: string
    orderId: string
    status: string
    totalAmount: number
    approvedAt: string
    // ... Toss Payments 응답 데이터
  }
}
```

**Response (400 Bad Request)**:

```typescript
{
  success: false,
  message: string
}
```

**예시**:

```bash
curl -X POST http://localhost:3000/api/payments/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "paymentKey": "payment_key_123",
    "orderId": "ORDER_1234567890",
    "amount": 15000
  }'
```

---

### 결제 취소

결제를 취소합니다.

**Endpoint**: `POST /api/payments/cancel`

**Authentication**: 필수

**Request Body**:

```typescript
{
  paymentKey: string      // Toss 결제 키
  cancelReason: string    // 취소 사유
  cancelAmount?: number   // 부분 취소 금액 (선택)
  refundableAmount?: number  // 환불 가능 금액 (선택)
}
```

**Response (200 OK)**:

```typescript
{
  success: true,
  cancellation: {
    transactionKey: string
    cancelReason: string
    canceledAt: string
    cancelAmount: number
    // ... Toss 취소 응답 데이터
  }
}
```

**예시**:

```bash
curl -X POST http://localhost:3000/api/payments/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "paymentKey": "payment_key_123",
    "cancelReason": "고객 변심"
  }'
```

---

### 자동결제(빌링) 등록

자동결제를 위한 빌링 키를 발급받습니다.

**Endpoint**: `POST /api/payments/billing`

**Authentication**: 필수

**Request Body**:

```typescript
{
  customerKey: string     // 고객 고유 키
  authKey: string         // Toss에서 받은 인증 키
}
```

**Response (200 OK)**:

```typescript
{
  success: true,
  billingKey: string
  customerKey: string
  // ... Toss 빌링 응답 데이터
}
```

**예시**:

```bash
curl -X POST http://localhost:3000/api/payments/billing \
  -H "Content-Type: application/json" \
  -d '{
    "customerKey": "customer_user123",
    "authKey": "auth_key_from_toss"
  }'
```

---

### 현금영수증 발급

결제에 대한 현금영수증을 발급합니다.

**Endpoint**: `POST /api/payments/cash-receipt`

**Authentication**: 필수

**Request Body**:

```typescript
{
  paymentKey: string            // Toss 결제 키
  type: "소득공제" | "지출증빙"  // 영수증 타입
  registrationNumber: string    // 휴대폰 번호 또는 사업자번호
}
```

**Response (200 OK)**:

```typescript
{
  success: true,
  receipt: {
    receiptKey: string
    type: string
    amount: number
    taxFreeAmount: number
    issueNumber: string
    receiptUrl: string
    // ... Toss 영수증 응답 데이터
  }
}
```

**예시**:

```bash
curl -X POST http://localhost:3000/api/payments/cash-receipt \
  -H "Content-Type: application/json" \
  -d '{
    "paymentKey": "payment_key_123",
    "type": "소득공제",
    "registrationNumber": "01012345678"
  }'
```

---

## 에러 코드

### 공통 에러

| HTTP 상태 | 메시지 | 설명 |
|-----------|--------|------|
| 400 | Bad Request | 잘못된 요청 파라미터 |
| 401 | Unauthorized | 인증 필요 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스를 찾을 수 없음 |
| 500 | Internal Server Error | 서버 오류 |

### 리뷰 API 에러

| 메시지 | 설명 |
|--------|------|
| "필수 필드가 누락되었습니다" | userId, rating, title, content 중 하나가 없음 |
| "리뷰 등록에 실패했습니다" | Firestore 저장 실패 |
| "리뷰 조회에 실패했습니다" | Firestore 조회 실패 |

### 결제 API 에러

| 메시지 | 설명 |
|--------|------|
| "필수 필드가 누락되었습니다" | paymentKey, orderId, amount 중 하나가 없음 |
| "결제 승인에 실패했습니다" | Toss API 호출 실패 |
| "결제 취소에 실패했습니다" | 취소 처리 실패 |
| "이미 취소된 결제입니다" | 중복 취소 시도 |

---

## Rate Limiting

현재 Rate Limiting은 구현되지 않았습니다.

프로덕션 환경에서는 다음 제한을 고려하세요:
- 리뷰 작성: 사용자당 1일 5개
- 결제 API: IP당 분당 10회

---

## 웹훅

### Toss Payments 웹훅

**Endpoint**: `POST /api/payments/webhook`

Toss Payments에서 다음 이벤트 발생 시 호출됩니다:
- 가상계좌 입금 완료
- 결제 상태 변경
- 결제 취소

**Request Body (Toss에서 전송)**:

```typescript
{
  eventType: string       // 이벤트 타입
  data: {
    paymentKey: string
    orderId: string
    status: string
    // ... 이벤트별 추가 데이터
  }
}
```

**Response**:

```typescript
{
  received: true
}
```

---

## Postman Collection

다음 Postman Collection을 사용하여 API를 테스트할 수 있습니다:

```json
{
  "info": {
    "name": "TreeCode API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Reviews",
      "item": [
        {
          "name": "Create Review",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/reviews",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"userId\": \"user123\",\n  \"userName\": \"홍길동\",\n  \"userEmail\": \"hong@example.com\",\n  \"rating\": 5,\n  \"title\": \"좋아요\",\n  \"content\": \"정말 좋은 상품입니다\"\n}"
            }
          }
        },
        {
          "name": "Get Reviews",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/reviews?limit=10"
          }
        }
      ]
    },
    {
      "name": "Payments",
      "item": [
        {
          "name": "Confirm Payment",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/payments/confirm",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"paymentKey\": \"payment_key_123\",\n  \"orderId\": \"ORDER_123\",\n  \"amount\": 15000\n}"
            }
          }
        },
        {
          "name": "Cancel Payment",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/payments/cancel",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"paymentKey\": \"payment_key_123\",\n  \"cancelReason\": \"고객 변심\"\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ]
}
```

---

## SDK 예시

### JavaScript/TypeScript

```typescript
// 리뷰 생성
async function createReview(reviewData) {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewData)
  })

  return await response.json()
}

// 리뷰 조회
async function getReviews(limit = 10) {
  const response = await fetch(`/api/reviews?limit=${limit}`)
  return await response.json()
}

// 결제 승인
async function confirmPayment(paymentData) {
  const response = await fetch('/api/payments/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData)
  })

  return await response.json()
}
```

---

## 변경 이력

### v1.0.0 (2025-10-01)
- 초기 API 릴리스
- 리뷰 생성/조회 API 추가
- 결제 승인/취소 API 추가
- 자동결제(빌링) API 추가
- 현금영수증 발급 API 추가

---

## 지원

API 관련 문의사항은 이슈를 등록해주세요.
