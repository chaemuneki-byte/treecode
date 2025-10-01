# 인증 시스템 가이드

## 개요

이 프로젝트는 Firebase Authentication을 사용하여 Google OAuth 로그인을 구현합니다.

## 인증 플로우

```
1. 사용자가 "Google로 로그인" 버튼 클릭
   ↓
2. Google OAuth 팝업 창 열림
   ↓
3. 사용자가 Google 계정으로 로그인
   ↓
4. Firebase가 인증 토큰 생성
   ↓
5. AuthContext가 사용자 정보 저장
   ↓
6. Firestore에 사용자 정보 저장 (첫 로그인 시)
   ↓
7. UI 업데이트 (로그인 상태 반영)
```

## 구조

### 1. Firebase Authentication 설정

```typescript
// lib/firebase.ts
import { getAuth } from "firebase/auth"

export const auth = getAuth(app)
```

### 2. AuthContext (전역 인증 상태 관리)

```typescript
// lib/auth/auth-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { createUser, getUser } from '@/lib/db/users'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        // Firestore에 사용자 정보 저장
        const existingUser = await getUser(firebaseUser.uid)
        if (!existingUser) {
          await createUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || undefined
          })
        }
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### 3. AuthProvider 적용

```typescript
// app/layout.tsx
import { AuthProvider } from '@/lib/auth/auth-context'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

## 컴포넌트에서 사용

### 1. 로그인 버튼

```typescript
// components/ui/auth-buttons.tsx
'use client'

import { useAuth } from '@/lib/auth/auth-context'

export default function AuthButtons() {
  const { user, signInWithGoogle, signOut } = useAuth()

  if (user) {
    return (
      <button onClick={signOut}>
        로그아웃
      </button>
    )
  }

  return (
    <button onClick={signInWithGoogle}>
      Google로 로그인
    </button>
  )
}
```

### 2. 사용자 정보 표시

```typescript
'use client'

import { useAuth } from '@/lib/auth/auth-context'
import Image from 'next/image'

export default function UserProfile() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (!user) {
    return <div>로그인이 필요합니다</div>
  }

  return (
    <div>
      {user.photoURL && (
        <Image
          src={user.photoURL}
          alt={user.displayName || ''}
          width={40}
          height={40}
        />
      )}
      <p>{user.displayName}</p>
      <p>{user.email}</p>
    </div>
  )
}
```

### 3. 보호된 컴포넌트

```typescript
'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedComponent() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div>
      보호된 콘텐츠
    </div>
  )
}
```

## 보호된 라우트 (Protected Routes)

### HOC 방식

```typescript
// lib/auth/protected-route.tsx
'use client'

import { useAuth } from './auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>로딩 중...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
```

### 사용 예시

```typescript
// app/dashboard/page.tsx
import ProtectedRoute from '@/lib/auth/protected-route'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>대시보드 내용</div>
    </ProtectedRoute>
  )
}
```

## API 라우트에서 인증 확인

### 1. 서버 사이드 인증 확인

```typescript
// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/firebase-admin' // Firebase Admin SDK

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: '인증이 필요합니다' },
      { status: 401 }
    )
  }

  const token = authHeader.split('Bearer ')[1]

  try {
    const decodedToken = await auth.verifyIdToken(token)
    const userId = decodedToken.uid

    // 인증된 사용자 정보로 작업 수행
    return NextResponse.json({ userId })
  } catch (error) {
    return NextResponse.json(
      { error: '유효하지 않은 토큰입니다' },
      { status: 401 }
    )
  }
}
```

### 2. 클라이언트에서 토큰 전송

```typescript
'use client'

import { useAuth } from '@/lib/auth/auth-context'

export default function ProtectedApiCall() {
  const { user } = useAuth()

  const fetchProtectedData = async () => {
    if (!user) return

    const token = await user.getIdToken()

    const response = await fetch('/api/protected', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <button onClick={fetchProtectedData}>
      보호된 데이터 가져오기
    </button>
  )
}
```

## Firebase Admin SDK 설정

API 라우트에서 토큰을 검증하려면 Firebase Admin SDK가 필요합니다.

### 1. 설치

```bash
npm install firebase-admin
```

### 2. 서비스 계정 키 발급

1. Firebase Console → 프로젝트 설정 → 서비스 계정
2. "새 비공개 키 생성" 클릭
3. JSON 파일 다운로드
4. 프로젝트 루트에 `firebase-admin-key.json` 저장
5. `.gitignore`에 추가

### 3. Admin SDK 초기화

```typescript
// lib/firebase-admin.ts
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  })
}

export const auth = admin.auth()
export const db = admin.firestore()
```

### 4. 환경 변수 설정

```env
# .env.local
FIREBASE_PROJECT_ID=treecode-5fbb1
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@treecode-5fbb1.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 사용자 데이터 관리

### Firestore에 사용자 저장

```typescript
// lib/db/users.ts
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'

export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  createdAt: Date
  updatedAt: Date
}

export async function createUser(userData: Omit<User, 'createdAt' | 'updatedAt'>) {
  const now = new Date()
  const userRef = doc(db, 'users', userData.id)

  await setDoc(userRef, {
    ...userData,
    createdAt: Timestamp.fromDate(now),
    updatedAt: Timestamp.fromDate(now)
  })
}

export async function getUser(userId: string): Promise<User | null> {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    return null
  }

  const data = userSnap.data()
  return {
    id: userSnap.id,
    email: data.email,
    displayName: data.displayName,
    photoURL: data.photoURL,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate()
  }
}
```

## 로그인 상태 유지

Firebase Authentication은 자동으로 로그인 상태를 유지합니다.

- **세션 쿠키**: Firebase가 자동으로 관리
- **토큰 갱신**: Firebase가 자동으로 처리
- **영구 로그인**: 기본 설정으로 활성화됨

## 보안 고려사항

### 1. Firebase Console 설정

- **승인된 도메인**: localhost, 배포 도메인 추가
- **API 제한**: Firebase Console에서 API 키 제한 설정

### 2. Firestore 보안 규칙

```javascript
// 사용자는 자신의 정보만 수정 가능
match /users/{userId} {
  allow read: if true;
  allow write: if request.auth != null && request.auth.uid == userId;
}
```

### 3. 클라이언트 사이드 보호

```typescript
// useAuth 훅을 사용하여 항상 인증 상태 확인
const { user, loading } = useAuth()

if (loading) return <Loading />
if (!user) return <LoginRequired />
```

## 로그아웃

### 기본 로그아웃

```typescript
const { signOut } = useAuth()

await signOut()
// 사용자가 로그아웃되고 onAuthStateChanged가 트리거됨
```

### 로그아웃 후 리다이렉트

```typescript
import { useRouter } from 'next/navigation'

const router = useRouter()
const { signOut } = useAuth()

const handleSignOut = async () => {
  await signOut()
  router.push('/')
}
```

## 문제 해결

### "auth/popup-blocked" 오류

브라우저가 팝업을 차단한 경우입니다.
- 팝업 차단 해제 안내
- 또는 리다이렉트 방식으로 변경

```typescript
import { signInWithRedirect } from 'firebase/auth'

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithRedirect(auth, provider)
}
```

### "auth/unauthorized-domain" 오류

Firebase Console에서 도메인 승인 필요:
1. Firebase Console → Authentication → Settings
2. Authorized domains에 도메인 추가

### 프로필 이미지가 표시되지 않음

`next.config.js`에 Google 이미지 도메인 추가:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com'
    }
  ]
}
```

## 참고 자료

- [Firebase Authentication 문서](https://firebase.google.com/docs/auth)
- [Google OAuth 설정](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
