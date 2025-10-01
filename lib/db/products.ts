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
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from './schema';

const COLLECTION_NAME = 'products';

// 제품 생성
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...productData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// 제품 조회 (ID로)
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
}

// 모든 제품 조회
export async function getAllProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
}

// 카테고리별 제품 조회
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
}

// 재고가 있는 제품만 조회
export async function getAvailableProducts(): Promise<Product[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('stock', '>', 0),
      orderBy('stock', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting available products:', error);
    throw error;
  }
}

// 제품 업데이트
export async function updateProduct(productId: string, productData: Partial<Omit<Product, 'id'>>) {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// 제품 삭제
export async function deleteProduct(productId: string) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, productId));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// 재고 업데이트
export async function updateProductStock(productId: string, quantity: number) {
  try {
    const product = await getProductById(productId);
    if (!product) throw new Error('Product not found');

    const newStock = product.stock + quantity;
    if (newStock < 0) throw new Error('Insufficient stock');

    await updateProduct(productId, { stock: newStock });
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
}
