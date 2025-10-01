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
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { Order } from './schema';

const COLLECTION_NAME = 'orders';

// 주문 생성
export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { id: docRef.id, ...orderData };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// 주문 조회 (ID로)
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Order;
    }
    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
}

// 사용자별 주문 조회
export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.error('Error getting orders by user:', error);
    throw error;
  }
}

// 상태별 주문 조회
export async function getOrdersByStatus(status: Order['status']): Promise<Order[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.error('Error getting orders by status:', error);
    throw error;
  }
}

// 모든 주문 조회
export async function getAllOrders(): Promise<Order[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.error('Error getting all orders:', error);
    throw error;
  }
}

// 주문 업데이트
export async function updateOrder(orderId: string, orderData: Partial<Omit<Order, 'id'>>) {
  try {
    const docRef = doc(db, COLLECTION_NAME, orderId);
    await updateDoc(docRef, {
      ...orderData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

// 주문 상태 업데이트
export async function updateOrderStatus(orderId: string, status: Order['status']) {
  try {
    await updateOrder(orderId, { status });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// 주문 삭제
export async function deleteOrder(orderId: string) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, orderId));
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}
