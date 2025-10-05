'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/shared/ui/button'
import { Input } from '@/app/shared/ui/input'
import { Label } from '@/app/shared/ui/label'
import { Textarea } from '@/app/shared/ui/textarea'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [productId, setProductId] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    original_price: '',
    discount: '',
    rating: '0',
    reviews: '0',
    image: '',
    category_id: '',
    trending: false,
    badge: '',
    description: '',
    features: '',
    specifications: '',
  })

  useEffect(() => {
    params.then(({ id }) => {
      setProductId(id)
      fetchProduct(id)
    })
  }, [params])

  const fetchProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()

      if (data.product) {
        const p = data.product
        setFormData({
          name: p.name || '',
          price: p.price?.toString() || '',
          original_price: p.original_price?.toString() || '',
          discount: p.discount?.toString() || '',
          rating: p.rating?.toString() || '0',
          reviews: p.reviews?.toString() || '0',
          image: p.image || '',
          category_id: p.category_id || '',
          trending: !!p.trending,
          badge: p.badge || '',
          description: p.description || '',
          features: p.features || '',
          specifications: p.specifications || '',
        })
      }
    } catch (error) {
      console.error('상품 정보 불러오기 실패:', error)
      alert('상품 정보를 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
          original_price: parseInt(formData.original_price),
          discount: parseInt(formData.discount),
          rating: parseFloat(formData.rating),
          reviews: parseInt(formData.reviews),
        }),
      })

      if (res.ok) {
        alert('상품이 수정되었습니다.')
        router.push('/manager')
      } else {
        const error = await res.json()
        alert(error.error || '수정 실패')
      }
    } catch (error) {
      console.error('수정 실패:', error)
      alert('수정 실패')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">상품 수정</h1>
        <p className="text-muted-foreground mt-2">상품 정보를 수정합니다</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg border shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">상품명 *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category_id">카테고리 *</Label>
            <Input
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">판매가 *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="original_price">정가 *</Label>
            <Input
              id="original_price"
              name="original_price"
              type="number"
              value={formData.original_price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">할인율(%) *</Label>
            <Input
              id="discount"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rating">평점</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviews">리뷰 수</Label>
            <Input
              id="reviews"
              name="reviews"
              type="number"
              value={formData.reviews}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">이미지 URL *</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="badge">배지</Label>
          <Input
            id="badge"
            name="badge"
            value={formData.badge}
            onChange={handleChange}
            placeholder="예: 신상품, 베스트"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="trending"
            name="trending"
            type="checkbox"
            checked={formData.trending}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <Label htmlFor="trending" className="cursor-pointer">
            트렌딩 상품으로 설정
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">상품 설명</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">주요 특징</Label>
          <Textarea
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specifications">상세 스펙</Label>
          <Textarea
            id="specifications"
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="flex gap-3 pt-6 border-t">
          <Button type="submit" disabled={saving} size="lg">
            {saving ? '수정 중...' : '수정하기'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.back()}
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  )
}
