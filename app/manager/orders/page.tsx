'use client'

import { useState } from 'react'
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
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  product: string
  quantity: number
  totalPrice: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: string
}

// 임시 데이터
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: '김철수',
    customerPhone: '010-1234-5678',
    product: '무선 이어폰',
    quantity: 2,
    totalPrice: 89000,
    status: 'pending',
    orderDate: '2024-01-15',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: '이영희',
    customerPhone: '010-9876-5432',
    product: '스마트 워치',
    quantity: 1,
    totalPrice: 199000,
    status: 'processing',
    orderDate: '2024-01-14',
  },
]

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { label: '주문접수', color: 'bg-yellow-100 text-yellow-800' },
      processing: { label: '처리중', color: 'bg-blue-100 text-blue-800' },
      shipped: { label: '배송중', color: 'bg-purple-100 text-purple-800' },
      delivered: { label: '배송완료', color: 'bg-green-100 text-green-800' },
      cancelled: { label: '취소됨', color: 'bg-red-100 text-red-800' },
    }

    const config = statusConfig[status]
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">주문 관리</h1>
        <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">고객 주문을 관리합니다</p>
      </div>

      {/* 주문 상태 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <PackageIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">주문접수</p>
              <p className="text-xl font-bold">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <TruckIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">배송중</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">배송완료</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <XCircleIcon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">취소됨</p>
              <p className="text-xl font-bold">0</p>
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
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
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
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? '검색 결과가 없습니다.' : '주문이 없습니다.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.customerPhone}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.quantity}개</TableCell>
                    <TableCell>{order.totalPrice.toLocaleString()}원</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{order.orderDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          처리
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
    </div>
  )
}
