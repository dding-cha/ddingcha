'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PencilIcon, TrashIcon, PlusIcon, SearchIcon, XIcon } from 'lucide-react'
import { Button } from '@/app/shared/ui/button'
import { Input } from '@/app/shared/ui/input'
import { Label } from '@/app/shared/ui/label'
import { Textarea } from '@/app/shared/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table'

interface Product {
  id: string
  name: string
  price: number
  original_price: number
  discount: number
  rating: number
  reviews: number
  image: string
  category_id: string
  trending: boolean
  badge: string | null
  created_at: string
  description?: string
  features?: string
  specifications?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
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
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?all=true')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('상품 목록 불러오기 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  // 카테고리 목록 추출
  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category_id)))]

  // 필터링 및 정렬
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category_id?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || product.category_id === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      // HOT 상품 우선 정렬
      if (a.trending && !b.trending) return -1
      if (!a.trending && b.trending) return 1
      return 0
    })

  // 페이지네이션
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name || '',
        price: product.price?.toString() || '',
        original_price: product.original_price?.toString() || '',
        discount: product.discount?.toString() || '',
        rating: product.rating?.toString() || '0',
        reviews: product.reviews?.toString() || '0',
        image: product.image || '',
        category_id: product.category_id || '',
        trending: !!product.trending,
        badge: product.badge || '',
        description: product.description || '',
        features: product.features || '',
        specifications: product.specifications || '',
      })
    } else {
      setEditingProduct(null)
      setFormData({
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
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = editingProduct
      ? `/api/products/${editingProduct.id}`
      : '/api/products/create'
    const method = editingProduct ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
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
        alert(editingProduct ? '수정되었습니다.' : '등록되었습니다.')
        handleCloseModal()
        fetchProducts()
      } else {
        const error = await res.json()
        alert(error.error || '실패')
      }
    } catch (error) {
      console.error('실패:', error)
      alert('실패')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        alert('삭제되었습니다.')
        fetchProducts()
      } else {
        alert('삭제 실패')
      }
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제 실패')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">상품 관리</h1>
          <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">등록된 상품을 관리합니다</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          <span className="hidden md:inline">상품 등록</span>
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="mb-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="상품명 또는 카테고리 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white"
        >
          <option value="all">전체 카테고리</option>
          {categories.filter((c) => c !== 'all').map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value))
            setCurrentPage(1)
          }}
          className="px-4 py-2 border rounded-md bg-white"
        >
          <option value={10}>10개씩</option>
          <option value={20}>20개씩</option>
          <option value={50}>50개씩</option>
        </select>
      </div>

      {/* 상품 목록 */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">이미지</TableHead>
                <TableHead>상품명</TableHead>
                <TableHead>가격</TableHead>
                <TableHead>할인율</TableHead>
                <TableHead className="hidden md:table-cell">평점</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>HOT</TableHead>
                <TableHead className="w-24">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {searchTerm || categoryFilter !== 'all' ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      {product.price?.toLocaleString() || 0}원
                      <br />
                      <span className="text-xs text-muted-foreground line-through">
                        {product.original_price?.toLocaleString() || 0}원
                      </span>
                    </TableCell>
                    <TableCell>{product.discount || 0}%</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.rating || 0} ({product.reviews || 0})
                    </TableCell>
                    <TableCell>{product.category_id}</TableCell>
                    <TableCell>
                      {product.trending ? (
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded font-bold">
                          HOT
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleOpenModal(product)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </div>
      )}

      {/* 상품 등록/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full my-8">
            <div className="p-4 md:p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingProduct ? '상품 수정' : '상품 등록'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">상품명 *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category_id">카테고리 *</Label>
                  <Input id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">판매가 *</Label>
                  <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="original_price">정가 *</Label>
                  <Input id="original_price" name="original_price" type="number" value={formData.original_price} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">할인율(%) *</Label>
                  <Input id="discount" name="discount" type="number" value={formData.discount} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">평점</Label>
                  <Input id="rating" name="rating" type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviews">리뷰 수</Label>
                  <Input id="reviews" name="reviews" type="number" value={formData.reviews} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">이미지 URL *</Label>
                <Input id="image" name="image" value={formData.image} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="badge">배지</Label>
                <Input id="badge" name="badge" value={formData.badge} onChange={handleChange} placeholder="예: 신상품, 베스트" />
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
                  HOT 상품으로 설정
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">상품 설명</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">주요 특징</Label>
                <Textarea id="features" name="features" value={formData.features} onChange={handleChange} rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specifications">상세 스펙</Label>
                <Textarea id="specifications" name="specifications" value={formData.specifications} onChange={handleChange} rows={3} />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" className="flex-1">
                  {editingProduct ? '수정하기' : '등록하기'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                  취소
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
