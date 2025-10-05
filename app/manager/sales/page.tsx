'use client'

import { useState, useEffect } from 'react'
import { TrendingUpIcon, TrendingDownIcon, DollarSignIcon, ShoppingBagIcon, UsersIcon, PackageIcon } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table'

interface SalesData {
  date: string
  revenue: number
  orders: number
  avgOrderValue: number
  newCustomers: number
}

interface TopProduct {
  id: string
  name: string
  category: string
  sales: number
  revenue: number
  image: string
}

export default function SalesPage() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week')
  const [loading, setLoading] = useState(true)

  // 임시 데이터
  const stats = {
    totalRevenue: 45678000,
    revenueChange: 12.5,
    totalOrders: 1234,
    ordersChange: 8.3,
    avgOrderValue: 37000,
    avgOrderChange: 4.2,
    newCustomers: 456,
    customersChange: 15.7,
  }

  const salesData: SalesData[] = [
    { date: '2025-10-01', revenue: 3450000, orders: 89, avgOrderValue: 38764, newCustomers: 23 },
    { date: '2025-10-02', revenue: 4120000, orders: 102, avgOrderValue: 40392, newCustomers: 31 },
    { date: '2025-10-03', revenue: 3890000, orders: 95, avgOrderValue: 40947, newCustomers: 28 },
    { date: '2025-10-04', revenue: 5230000, orders: 134, avgOrderValue: 39029, newCustomers: 42 },
    { date: '2025-10-05', revenue: 4890000, orders: 121, avgOrderValue: 40413, newCustomers: 35 },
    { date: '2025-10-06', revenue: 6120000, orders: 156, avgOrderValue: 39230, newCustomers: 48 },
  ]

  const topProducts: TopProduct[] = [
    {
      id: '1',
      name: '무선 블루투스 이어폰',
      category: '전자기기',
      sales: 234,
      revenue: 8190000,
      image: '/products/earbuds.jpg',
    },
    {
      id: '2',
      name: '스마트 워치',
      category: '전자기기',
      sales: 189,
      revenue: 9450000,
      image: '/products/watch.jpg',
    },
    {
      id: '3',
      name: '휴대용 선풍기',
      category: '생활용품',
      sales: 167,
      revenue: 2505000,
      image: '/products/fan.jpg',
    },
    {
      id: '4',
      name: '무선 충전기',
      category: '전자기기',
      sales: 145,
      revenue: 4350000,
      image: '/products/charger.jpg',
    },
    {
      id: '5',
      name: 'LED 스탠드',
      category: '생활용품',
      sales: 132,
      revenue: 3960000,
      image: '/products/lamp.jpg',
    },
  ]

  useEffect(() => {
    // 실제로는 API 호출
    setTimeout(() => setLoading(false), 500)
  }, [period])

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">매출 관리</h1>
          <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
            매출 현황 및 통계를 확인합니다
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('day')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              period === 'day'
                ? 'bg-gray-900 text-white'
                : 'bg-white border hover:bg-gray-50'
            }`}
          >
            일간
          </button>
          <button
            onClick={() => setPeriod('week')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              period === 'week'
                ? 'bg-gray-900 text-white'
                : 'bg-white border hover:bg-gray-50'
            }`}
          >
            주간
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              period === 'month'
                ? 'bg-gray-900 text-white'
                : 'bg-white border hover:bg-gray-50'
            }`}
          >
            월간
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">총 매출</p>
              <p className="text-2xl font-bold mt-1">
                {stats.totalRevenue.toLocaleString()}원
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  +{stats.revenueChange}%
                </span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <DollarSignIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">총 주문</p>
              <p className="text-2xl font-bold mt-1">
                {stats.totalOrders.toLocaleString()}건
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  +{stats.ordersChange}%
                </span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <ShoppingBagIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">평균 주문액</p>
              <p className="text-2xl font-bold mt-1">
                {stats.avgOrderValue.toLocaleString()}원
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  +{stats.avgOrderChange}%
                </span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <PackageIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">신규 고객</p>
              <p className="text-2xl font-bold mt-1">
                {stats.newCustomers.toLocaleString()}명
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  +{stats.customersChange}%
                </span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 일별 매출 내역 */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold">일별 매출 내역</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>날짜</TableHead>
                <TableHead>매출액</TableHead>
                <TableHead>주문 수</TableHead>
                <TableHead>평균 주문액</TableHead>
                <TableHead>신규 고객</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((data) => (
                <TableRow key={data.date}>
                  <TableCell className="font-medium">
                    {new Date(data.date).toLocaleDateString('ko-KR', {
                      month: 'long',
                      day: 'numeric',
                      weekday: 'short',
                    })}
                  </TableCell>
                  <TableCell className="font-bold text-blue-600">
                    {data.revenue.toLocaleString()}원
                  </TableCell>
                  <TableCell>{data.orders.toLocaleString()}건</TableCell>
                  <TableCell>{data.avgOrderValue.toLocaleString()}원</TableCell>
                  <TableCell>{data.newCustomers.toLocaleString()}명</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 베스트 상품 */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold">베스트 상품 TOP 5</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">순위</TableHead>
                <TableHead>상품명</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>판매량</TableHead>
                <TableHead>매출액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        index === 0
                          ? 'bg-yellow-100 text-yellow-700'
                          : index === 1
                          ? 'bg-gray-200 text-gray-700'
                          : index === 2
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.sales.toLocaleString()}개
                  </TableCell>
                  <TableCell className="font-bold text-blue-600">
                    {product.revenue.toLocaleString()}원
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 매출 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-bold mb-4">카테고리별 매출 비중</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>전자기기</span>
                <span className="font-medium">52%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '52%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>생활용품</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>패션</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>기타</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-600 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-bold mb-4">시간대별 주문 분포</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>오전 (06:00-12:00)</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>오후 (12:00-18:00)</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>저녁 (18:00-24:00)</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>심야 (00:00-06:00)</span>
                <span className="font-medium">8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
