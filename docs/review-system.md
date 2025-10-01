# 리뷰 시스템 가이드

## 개요

사용자가 상품에 대한 리뷰를 작성하고 조회할 수 있는 시스템입니다.

### 주요 기능

- ⭐ 별점 평가 (1-5점)
- 📝 제목 및 내용 작성
- 📷 이미지 첨부 (최대 5개)
- 🔐 로그인한 사용자만 작성 가능
- 📱 실시간 리뷰 목록 업데이트

## 데이터 구조

### Review 인터페이스

```typescript
// lib/db/reviews.ts
export interface Review {
  id: string              // Firestore 문서 ID
  userId: string          // 작성자 Firebase UID
  userName: string        // 작성자 이름
  userEmail: string       // 작성자 이메일
  userPhoto?: string      // 작성자 프로필 사진 URL
  rating: number          // 별점 (1-5)
  title: string           // 리뷰 제목 (최대 100자)
  content: string         // 리뷰 내용 (최대 1000자)
  images?: string[]       // Firebase Storage 이미지 URLs
  createdAt: Date         // 작성 시간
  updatedAt: Date         // 수정 시간
}
```

### Firestore 저장 위치

- **컬렉션**: `reviews`
- **문서 ID**: 자동 생성
- **경로**: `reviews/{reviewId}`

## 리뷰 작성 플로우

```
1. 사용자가 리뷰 폼 작성
   - 별점 선택 (1-5)
   - 제목 입력 (최대 100자)
   - 내용 입력 (최대 1000자)
   - 이미지 첨부 (선택, 최대 5개)
   ↓
2. 폼 제출 시 검증
   - 로그인 여부 확인
   - 제목/내용 필수 입력 확인
   ↓
3. 이미지 업로드 (있는 경우)
   - Firebase Storage에 업로드
   - 다운로드 URL 받기
   ↓
4. API 요청
   - POST /api/reviews
   - 리뷰 데이터 전송
   ↓
5. Firestore에 저장
   - reviews 컬렉션에 문서 생성
   ↓
6. 성공 처리
   - 폼 초기화
   - 리뷰 목록 새로고침
```

## 컴포넌트 구조

### 1. ReviewForm (리뷰 작성 폼)

**경로**: `components/reviews/review-form.tsx`

```typescript
interface ReviewFormProps {
  onSuccess?: () => void  // 리뷰 등록 성공 시 콜백
}

export default function ReviewForm({ onSuccess }: ReviewFormProps)
```

**주요 기능**:
- 별점 선택 UI (호버 효과)
- 제목/내용 입력 필드
- 이미지 업로드 및 미리보기
- 로그인 상태 확인
- Firebase Storage 업로드 통합

**사용 예시**:

```tsx
<ReviewForm onSuccess={() => {
  console.log('리뷰가 등록되었습니다!')
  // 리뷰 목록 새로고침 등
}} />
```

### 2. ReviewList (리뷰 목록)

**경로**: `components/reviews/review-list.tsx`

```typescript
interface ReviewListProps {
  refreshTrigger?: number  // 변경 시 리뷰 다시 불러오기
}

export default function ReviewList({ refreshTrigger = 0 }: ReviewListProps)
```

**주요 기능**:
- 최신 리뷰 10개 조회
- 사용자 프로필 표시
- 별점 표시
- 이미지 갤러리
- 로딩/빈 상태 처리

**사용 예시**:

```tsx
const [trigger, setTrigger] = useState(0)

<ReviewList refreshTrigger={trigger} />

// 새로고침
setTrigger(prev => prev + 1)
```

### 3. Reviews (통합 섹션)

**경로**: `components/sections/reviews.tsx`

리뷰 작성 폼과 목록을 하나의 섹션으로 통합한 컴포넌트입니다.

```tsx
export default function Reviews() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleReviewSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <section>
      <ReviewForm onSuccess={handleReviewSuccess} />
      <ReviewList refreshTrigger={refreshTrigger} />
    </section>
  )
}
```

## API 엔드포인트

### 1. 리뷰 생성

**POST** `/api/reviews`

**Request Body**:

```json
{
  "userId": "firebase_uid_123",
  "userName": "홍길동",
  "userEmail": "user@example.com",
  "userPhoto": "https://...",
  "rating": 5,
  "title": "정말 좋은 상품입니다",
  "content": "품질이 우수하고 배송도 빨라요. 강력 추천합니다!",
  "images": [
    "https://firebasestorage.googleapis.com/..."
  ]
}
```

**Response** (성공):

```json
{
  "success": true,
  "review": {
    "id": "review_abc123",
    "userId": "firebase_uid_123",
    "rating": 5,
    // ... 나머지 필드
  }
}
```

**Response** (실패):

```json
{
  "success": false,
  "message": "필수 필드가 누락되었습니다"
}
```

### 2. 리뷰 조회

**GET** `/api/reviews?limit=10`

**Query Parameters**:
- `limit` (optional): 가져올 리뷰 개수 (기본값: 10)

**Response**:

```json
{
  "success": true,
  "reviews": [
    {
      "id": "review_abc123",
      "userId": "firebase_uid_123",
      "userName": "홍길동",
      "rating": 5,
      "title": "정말 좋은 상품입니다",
      "content": "품질이 우수하고...",
      "images": ["https://..."],
      "createdAt": "2025-10-01T12:00:00.000Z",
      "updatedAt": "2025-10-01T12:00:00.000Z"
    }
    // ... 더 많은 리뷰
  ]
}
```

## 이미지 업로드

### Firebase Storage 구조

```
gs://treecode-5fbb1.firebasestorage.app/
└── reviews/
    └── {userId}/
        ├── {timestamp}_0_{filename}.jpg
        ├── {timestamp}_1_{filename}.png
        └── ...
```

### 업로드 프로세스

```typescript
// lib/storage/upload.ts

// 단일 이미지 업로드
export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

// 여러 이미지 업로드
export async function uploadMultipleImages(
  files: File[],
  basePath: string
): Promise<string[]> {
  const uploadPromises = files.map((file, index) => {
    const timestamp = Date.now()
    const fileName = `${timestamp}_${index}_${file.name}`
    const path = `${basePath}/${fileName}`
    return uploadImage(file, path)
  })

  return await Promise.all(uploadPromises)
}
```

### 사용 예시

```typescript
const imageFiles: File[] = [/* ... */]
const userId = 'user123'

const imageUrls = await uploadMultipleImages(
  imageFiles,
  `reviews/${userId}`
)

// imageUrls: ["https://...", "https://..."]
```

## 데이터베이스 함수

### 리뷰 생성

```typescript
// lib/db/reviews.ts
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function createReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date()

  const docRef = await addDoc(collection(db, 'reviews'), {
    ...reviewData,
    createdAt: Timestamp.fromDate(now),
    updatedAt: Timestamp.fromDate(now)
  })

  return {
    id: docRef.id,
    ...reviewData,
    createdAt: now,
    updatedAt: now
  }
}
```

### 리뷰 조회

```typescript
export async function getReviews(limitCount: number = 10): Promise<Review[]> {
  const q = query(
    collection(db, 'reviews'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(doc => {
    const data = doc.data()
    return {
      id: doc.id,
      userId: data.userId,
      userName: data.userName,
      userEmail: data.userEmail,
      userPhoto: data.userPhoto,
      rating: data.rating,
      title: data.title,
      content: data.content,
      images: data.images || [],
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    }
  })
}
```

### 리뷰 수정

```typescript
export async function updateReview(
  reviewId: string,
  updates: Partial<Omit<Review, 'id' | 'createdAt' | 'updatedAt'>>
) {
  const reviewRef = doc(db, 'reviews', reviewId)

  await updateDoc(reviewRef, {
    ...updates,
    updatedAt: Timestamp.fromDate(new Date())
  })
}
```

### 리뷰 삭제

```typescript
export async function deleteReview(reviewId: string) {
  const reviewRef = doc(db, 'reviews', reviewId)
  await deleteDoc(reviewRef)
}
```

## 메인 페이지 통합

```typescript
// app/page.tsx
import Reviews from '@/components/sections/reviews'

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Products />
      <Reviews />  {/* 리뷰 섹션 추가 */}
      <Offer />
    </>
  )
}
```

## 스타일링

### 별점 표시

```tsx
{[1, 2, 3, 4, 5].map((star) => (
  <Star
    key={star}
    size={20}
    className={
      star <= rating
        ? 'fill-yellow-400 text-yellow-400'
        : 'text-gray-300'
    }
  />
))}
```

### 이미지 미리보기

```tsx
<div className="relative w-24 h-24">
  <Image
    src={preview}
    alt="첨부 이미지"
    fill
    className="object-cover rounded-lg"
  />
  <button
    onClick={() => removeImage(index)}
    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
  >
    <X size={16} />
  </button>
</div>
```

## 보안 고려사항

### 1. Firestore 보안 규칙

```javascript
match /reviews/{reviewId} {
  allow read: if true;  // 모든 사용자가 읽기 가능
  allow create: if request.auth != null;  // 로그인한 사용자만 생성
  allow update, delete: if request.auth != null &&
                          request.auth.uid == resource.data.userId;  // 작성자만 수정/삭제
}
```

### 2. Storage 보안 규칙

```javascript
match /reviews/{userId}/{imageId} {
  allow read: if true;  // 모든 사용자가 읽기 가능
  allow write: if request.auth != null && request.auth.uid == userId;  // 해당 사용자만 업로드
}
```

### 3. 입력 검증

```typescript
// 클라이언트 사이드
if (!title.trim() || !content.trim()) {
  alert('제목과 내용을 입력해주세요.')
  return
}

if (title.length > 100) {
  alert('제목은 100자 이내로 입력해주세요.')
  return
}

if (content.length > 1000) {
  alert('내용은 1000자 이내로 입력해주세요.')
  return
}

// 서버 사이드 (API)
if (!userId || !rating || !title || !content) {
  return NextResponse.json(
    { success: false, message: '필수 필드가 누락되었습니다' },
    { status: 400 }
  )
}
```

### 4. XSS 방지

React는 기본적으로 XSS를 방지하지만, 추가 보안을 위해:

```typescript
import DOMPurify from 'isomorphic-dompurify'

const sanitizedContent = DOMPurify.sanitize(content)
```

## 성능 최적화

### 1. 이미지 최적화

```typescript
// next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'firebasestorage.googleapis.com'
    }
  ]
}

// 컴포넌트
<Image
  src={imageUrl}
  alt="리뷰 이미지"
  width={100}
  height={100}
  quality={75}  // 품질 조정
  placeholder="blur"  // 블러 효과
/>
```

### 2. 무한 스크롤 (향후 구현)

```typescript
import { query, orderBy, limit, startAfter } from 'firebase/firestore'

let lastVisible = null

const loadMore = async () => {
  const q = query(
    collection(db, 'reviews'),
    orderBy('createdAt', 'desc'),
    startAfter(lastVisible),
    limit(10)
  )

  const snapshot = await getDocs(q)
  lastVisible = snapshot.docs[snapshot.docs.length - 1]
  // ...
}
```

### 3. 이미지 압축

```typescript
import imageCompression from 'browser-image-compression'

const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  return await imageCompression(file, options)
}
```

## 향후 개선 사항

- [ ] 리뷰 수정/삭제 기능
- [ ] 리뷰 좋아요/신고 기능
- [ ] 페이지네이션 또는 무한 스크롤
- [ ] 이미지 확대 모달
- [ ] 리뷰 필터링 (별점별, 최신순 등)
- [ ] 답글 기능
- [ ] 리뷰 작성 보상 시스템
- [ ] 관리자 리뷰 관리 페이지

## 문제 해결

### 이미지가 표시되지 않음

1. `next.config.js`에 도메인 추가 확인
2. Firebase Storage 보안 규칙 확인
3. 이미지 URL 유효성 확인

### 리뷰가 저장되지 않음

1. 로그인 상태 확인
2. Firestore 보안 규칙 확인
3. 네트워크 탭에서 API 응답 확인
4. Firebase Console에서 데이터 확인

### 업로드 속도가 느림

1. 이미지 압축 적용
2. 동시 업로드 수 제한
3. Firebase Storage 리전 확인

## 참고 자료

- [Firestore 쿼리 가이드](https://firebase.google.com/docs/firestore/query-data/queries)
- [Firebase Storage 업로드](https://firebase.google.com/docs/storage/web/upload-files)
- [Next.js Image 최적화](https://nextjs.org/docs/app/building-your-application/optimizing/images)
