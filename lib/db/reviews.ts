import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  limit,
} from 'firebase/firestore'
import { db } from '../firebase'

export interface Review {
  id: string
  userId: string
  userName: string
  userEmail: string
  userPhoto?: string
  rating: number
  title: string
  content: string
  images?: string[]
  createdAt: Date
  updatedAt: Date
}

const COLLECTION_NAME = 'reviews'

// 리뷰 생성
export async function createReview(
  reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>
) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...reviewData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return { id: docRef.id, ...reviewData }
  } catch (error) {
    console.error('Error creating review:', error)
    throw error
  }
}

// 모든 리뷰 조회 (최신순)
export async function getAllReviews(limitCount?: number): Promise<Review[]> {
  try {
    const reviewsQuery = limitCount
      ? query(
          collection(db, COLLECTION_NAME),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        )
      : query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))

    const querySnapshot = await getDocs(reviewsQuery)
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Review
    })
  } catch (error) {
    console.error('Error getting reviews:', error)
    throw error
  }
}

// 특정 리뷰 조회
export async function getReviewById(reviewId: string): Promise<Review | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, reviewId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Review
    }
    return null
  } catch (error) {
    console.error('Error getting review:', error)
    throw error
  }
}

// 사용자별 리뷰 조회
export async function getReviewsByUserId(userId: string): Promise<Review[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Review
    })
  } catch (error) {
    console.error('Error getting user reviews:', error)
    throw error
  }
}

// 리뷰 업데이트
export async function updateReview(
  reviewId: string,
  reviewData: Partial<Omit<Review, 'id' | 'userId' | 'createdAt'>>
) {
  try {
    const docRef = doc(db, COLLECTION_NAME, reviewId)
    await updateDoc(docRef, {
      ...reviewData,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating review:', error)
    throw error
  }
}

// 리뷰 삭제
export async function deleteReview(reviewId: string) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, reviewId))
  } catch (error) {
    console.error('Error deleting review:', error)
    throw error
  }
}

// 평균 별점 계산
export async function getAverageRating(): Promise<number> {
  try {
    const reviews = await getAllReviews()
    if (reviews.length === 0) return 0

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    return totalRating / reviews.length
  } catch (error) {
    console.error('Error calculating average rating:', error)
    return 0
  }
}
