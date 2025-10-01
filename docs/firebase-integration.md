# Firebase 통합 가이드

## 개요

이 프로젝트는 Firebase의 다음 서비스들을 사용합니다:
- **Firestore**: NoSQL 데이터베이스
- **Authentication**: Google OAuth 인증
- **Storage**: 이미지 파일 저장

## Firebase 설정

### 프로젝트 정보

```typescript
// lib/firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSyCqvro2aB_mnOc2vo4RCaprQhNqKBAaHio",
  authDomain: "treecode-5fbb1.firebaseapp.com",
  projectId: "treecode-5fbb1",
  storageBucket: "treecode-5fbb1.firebasestorage.app",
  messagingSenderId: "549320675513",
  appId: "1:549320675513:web:5ab7922387474da8808b68",
  measurementId: "G-QY9N3SB3FS"
}
```

### 초기화

```typescript
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
```

## Firestore 데이터베이스

### 컬렉션 구조

#### 1. Users 컬렉션

```typescript
interface User {
  id: string              // Firebase UID
  email: string
  displayName: string
  photoURL?: string
  createdAt: Date
  updatedAt: Date
}
```

**경로**: `users/{userId}`

#### 2. Products 컬렉션

```typescript
interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  stock: number
  createdAt: Date
  updatedAt: Date
}
```

**경로**: `products/{productId}`

#### 3. Orders 컬렉션

```typescript
interface Order {
  id: string
  userId: string
  items: Array<{
    productId: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: 'pending' | 'paid' | 'cancelled' | 'refunded'
  paymentKey?: string
  createdAt: Date
  updatedAt: Date
}
```

**경로**: `orders/{orderId}`

#### 4. Reviews 컬렉션

```typescript
interface Review {
  id: string
  userId: string
  userName: string
  userEmail: string
  userPhoto?: string
  rating: number          // 1-5
  title: string
  content: string
  images?: string[]       // Firebase Storage URLs
  createdAt: Date
  updatedAt: Date
}
```

**경로**: `reviews/{reviewId}`

### CRUD 작업

#### 생성 (Create)

```typescript
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const docRef = await addDoc(collection(db, 'reviews'), {
  userId: 'user123',
  rating: 5,
  title: '좋은 상품입니다',
  content: '매우 만족스럽습니다',
  createdAt: new Date(),
  updatedAt: new Date()
})
```

#### 조회 (Read)

```typescript
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore'

const q = query(
  collection(db, 'reviews'),
  orderBy('createdAt', 'desc'),
  limit(10)
)

const querySnapshot = await getDocs(q)
const reviews = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}))
```

#### 수정 (Update)

```typescript
import { doc, updateDoc } from 'firebase/firestore'

const reviewRef = doc(db, 'reviews', reviewId)
await updateDoc(reviewRef, {
  title: '수정된 제목',
  updatedAt: new Date()
})
```

#### 삭제 (Delete)

```typescript
import { doc, deleteDoc } from 'firebase/firestore'

const reviewRef = doc(db, 'reviews', reviewId)
await deleteDoc(reviewRef)
```

## Firebase Storage

### 이미지 업로드

```typescript
// lib/storage/upload.ts
import { storage } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}
```

### 스토리지 경로 구조

```
gs://treecode-5fbb1.firebasestorage.app/
├── reviews/
│   ├── {userId}/
│   │   ├── {timestamp}_{index}_{filename}.jpg
│   │   └── ...
└── products/
    └── {productId}/
        └── ...
```

### 사용 예시

```typescript
// 리뷰 이미지 업로드
const imageUrls = await uploadMultipleImages(
  files,
  `reviews/${userId}`
)

// Firestore에 URL 저장
await addDoc(collection(db, 'reviews'), {
  // ... other fields
  images: imageUrls
})
```

## 보안 규칙

### Firestore Rules

Firebase Console에서 다음 규칙을 설정하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users 컬렉션
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Products 컬렉션 (읽기 전용)
    match /products/{productId} {
      allow read: if true;
      allow write: if false; // 관리자만 가능 (별도 구현 필요)
    }

    // Orders 컬렉션
    match /orders/{orderId} {
      allow read: if request.auth != null &&
                     request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
      allow update, delete: if false; // API 서버에서만 수정
    }

    // Reviews 컬렉션
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
                               request.auth.uid == resource.data.userId;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 리뷰 이미지
    match /reviews/{userId}/{imageId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }

    // 상품 이미지 (읽기 전용)
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Firebase Console 설정

### 1. Authentication 활성화

1. Firebase Console → Authentication → Get Started
2. Sign-in method → Google 활성화
3. 승인된 도메인에 localhost 및 배포 도메인 추가

### 2. Firestore Database 생성

1. Firebase Console → Firestore Database → Create Database
2. 위치: asia-northeast3 (서울) 권장
3. 보안 규칙 설정 (위 참조)

### 3. Storage 활성화

1. Firebase Console → Storage → Get Started
2. 보안 규칙 설정 (위 참조)

### 4. 인덱스 생성 (필요시)

복합 쿼리 사용 시 Firebase가 자동으로 인덱스 생성을 요청합니다.
콘솔에서 제공하는 링크를 클릭하여 생성하세요.

## 문제 해결

### "Missing or insufficient permissions" 오류

- Firestore 보안 규칙을 확인하세요
- 사용자가 로그인되어 있는지 확인하세요
- 콘솔에서 규칙을 임시로 `allow read, write: if true`로 설정하여 테스트

### 이미지 업로드 실패

- Storage 보안 규칙 확인
- 파일 크기 제한 확인 (기본 5MB)
- CORS 설정 확인

### 데이터가 조회되지 않음

- 컬렉션 이름과 경로 확인
- Firestore 콘솔에서 데이터 존재 여부 확인
- 쿼리 조건 확인

## 참고 자료

- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Firestore 가이드](https://firebase.google.com/docs/firestore)
- [Firebase Storage 가이드](https://firebase.google.com/docs/storage)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
