'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/shared/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table'
import { PackageIcon, TruckIcon, CheckCircleIcon, XCircleIcon, SearchIcon } from 'lucide-react'
import { Input } from '@/app/shared/ui/input'

interface Order {
  id: number
  orderNumber: string
  recipientName: string
  phone: string
  totalAmount: number
  shippingFee: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  items: Array<{
    productId: string
    productName: string
    price: number
    quantity: number
  }>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch orders from API
  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true)
        const response = await fetch('/api/orders/all')
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const data = await response.json()
        setOrders(data.orders || [])
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { label: '주문접수', color: 'bg-muted text-muted-foreground' },
      confirmed: { label: '주문확인', color: 'bg-accent text-accent-foreground' },
      shipped: { label: '배송중', color: 'bg-accent text-accent-foreground' },
      delivered: { label: '배송완료', color: 'bg-primary text-primary-foreground' },
      cancelled: { label: '취소됨', color: 'bg-destructive text-destructive-foreground' },
    }

    const config = statusConfig[status]
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  // Calculate statistics from real data
  const statistics = {
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.recipientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">주문 관리</h1>
        <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">고객 주문을 관리합니다</p>
      </div>

      {/* 주문 상태 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-muted p-2 rounded-lg">
              <PackageIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">주문접수</p>
              <p className="text-xl font-bold">{statistics.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-2 rounded-lg">
              <TruckIcon className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">배송중</p>
              <p className="text-xl font-bold">{statistics.shipped}</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">배송완료</p>
              <p className="text-xl font-bold">{statistics.delivered}</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-destructive p-2 rounded-lg">
              <XCircleIcon className="h-5 w-5 text-destructive-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">취소됨</p>
              <p className="text-xl font-bold">{statistics.cancelled}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 검색 */}
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="주문번호 또는 고객명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">주문번호</TableHead>
                <TableHead className="whitespace-nowrap">고객명</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">연락처</TableHead>
                <TableHead className="whitespace-nowrap">상품</TableHead>
                <TableHead className="whitespace-nowrap">수량</TableHead>
                <TableHead className="whitespace-nowrap">금액</TableHead>
                <TableHead className="whitespace-nowrap">상태</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">주문일</TableHead>
                <TableHead className="whitespace-nowrap">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    로딩 중...
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? '검색 결과가 없습니다.' : '주문이 없습니다.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => {
                  const firstItem = order.items[0]
                  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0)
                  const itemsText = order.items.length > 1
                    ? `${firstItem?.productName || '상품'} 외 ${order.items.length - 1}건`
                    : firstItem?.productName || '상품'

                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.recipientName}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.phone}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{itemsText}</TableCell>
                      <TableCell>{totalQuantity}개</TableCell>
                      <TableCell>{order.totalAmount.toLocaleString()}원</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            처리
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
