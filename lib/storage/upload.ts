import { storage } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

/**
 * Firebase Storage에 이미지 업로드
 * @param file - 업로드할 파일
 * @param path - Storage 내 저장 경로 (예: 'reviews/user123/image1.jpg')
 * @returns 업로드된 이미지의 다운로드 URL
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('이미지 업로드 실패:', error)
    throw new Error('이미지 업로드에 실패했습니다.')
  }
}

/**
 * 여러 이미지를 Firebase Storage에 업로드
 * @param files - 업로드할 파일 배열
 * @param basePath - Storage 내 기본 경로 (예: 'reviews/user123')
 * @returns 업로드된 이미지들의 다운로드 URL 배열
 */
export async function uploadMultipleImages(
  files: File[],
  basePath: string
): Promise<string[]> {
  try {
    const uploadPromises = files.map((file, index) => {
      const timestamp = Date.now()
      const fileName = `${timestamp}_${index}_${file.name}`
      const path = `${basePath}/${fileName}`
      return uploadImage(file, path)
    })

    const urls = await Promise.all(uploadPromises)
    return urls
  } catch (error) {
    console.error('여러 이미지 업로드 실패:', error)
    throw new Error('이미지 업로드에 실패했습니다.')
  }
}
