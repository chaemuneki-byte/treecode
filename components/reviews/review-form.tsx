'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { Star, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { uploadMultipleImages } from '@/lib/storage/upload'

interface ReviewFormProps {
  onSuccess?: () => void
}

export default function ReviewForm({ onSuccess }: ReviewFormProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    const remainingSlots = 5 - imageFiles.length
    const filesToAdd = newFiles.slice(0, remainingSlots)

    // 파일 객체 저장
    setImageFiles((prev) => [...prev, ...filesToAdd])

    // 미리보기 생성
    filesToAdd.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      // Firebase Storage에 이미지 업로드
      let imageUrls: string[] = []
      if (imageFiles.length > 0) {
        const basePath = `reviews/${user.uid}`
        imageUrls = await uploadMultipleImages(imageFiles, basePath)
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          userName: user.displayName || '익명',
          userEmail: user.email,
          userPhoto: user.photoURL,
          rating,
          title,
          content,
          images: imageUrls,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert('리뷰가 등록되었습니다!')
        setRating(5)
        setTitle('')
        setContent('')
        setImageFiles([])
        setImagePreviews([])
        onSuccess?.()
      } else {
        alert(data.message || '리뷰 등록에 실패했습니다.')
      }
    } catch (error) {
      console.error('Review submission error:', error)
      alert('리뷰 등록 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600 mb-4">리뷰를 작성하려면 로그인이 필요합니다.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
        >
          로그인하기
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">리뷰 작성하기</h3>

      {/* 별점 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          별점
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={`${
                  star <= (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
          <span className="ml-4 text-gray-600 self-center">
            {rating}점
          </span>
        </div>
      </div>

      {/* 제목 */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="리뷰 제목을 입력하세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={100}
        />
      </div>

      {/* 내용 */}
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="상품에 대한 리뷰를 작성해주세요"
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          maxLength={1000}
        />
        <p className="text-sm text-gray-500 mt-1">{content.length} / 1000</p>
      </div>

      {/* 이미지 업로드 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이미지 첨부 (최대 5개)
        </label>
        <div className="flex flex-wrap gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative w-24 h-24">
              <Image
                src={preview}
                alt={`첨부 이미지 ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {imageFiles.length < 5 && (
            <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="text-center">
                <Upload size={24} className="mx-auto text-gray-400" />
                <p className="text-xs text-gray-500 mt-1">업로드</p>
              </div>
            </label>
          )}
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          isSubmitting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? '등록 중...' : '리뷰 등록하기'}
      </button>
    </form>
  )
}
