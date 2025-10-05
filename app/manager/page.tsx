'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PackageIcon, AlertTriangleIcon, ShoppingCartIcon, UsersIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface Stats {
  totalProducts: number
  lowStockProducts: number
  totalOrders: number
  totalUsers: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    lowStockProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      const products = data.products || []

      setStats({
        totalProducts: products.length,
        lowStockProducts: 0, // TODO: 재고 10개 이하 상품 수
        totalOrders: 0, // TODO: DB 연결 후
        totalUsers: 0, // TODO: DB 연결 후
      })
    } catch (error) {
      console.error('통계 불러오기 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: '전체 상품',
      value: stats.totalProducts,
      change: '+12%',
      trend: 'up',
      icon: PackageIcon,
      color: 'bg-blue-500',
      link: '/manager/products',
    },
    {
      title: '재고 임박 상품',
      value: stats.lowStockProducts,
      subtitle: '재고 10개 이하',
      icon: AlertTriangleIcon,
      color: 'bg-red-500',
      link: '/manager/products',
    },
    {
      title: '주문 관리',
      value: stats.totalOrders,
      change: '+8%',
      trend: 'up',
      icon: ShoppingCartIcon,
      color: 'bg-orange-500',
      link: '/manager/orders',
    },
    {
      title: '회원 관리',
      value: stats.totalUsers,
      change: '+23%',
      trend: 'up',
      icon: UsersIcon,
      color: 'bg-purple-500',
      link: '/manager/users',
    },
  ]

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">대시보드</h1>
        <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">관리자 대시보드에 오신 것을 환영합니다</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="bg-white p-4 md:p-6 rounded-lg border shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">{card.title}</p>
                <p className="text-2xl md:text-3xl font-bold">{card.value}</p>
                {card.change && (
                  <div className={`flex items-center gap-1 mt-2 text-xs md:text-sm ${
                    card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.trend === 'up' ? (
                      <ArrowUpIcon className="h-3 w-3 md:h-4 md:w-4" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 md:h-4 md:w-4" />
                    )}
                    <span className="font-medium">{card.change}</span>
                  </div>
                )}
                {card.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
                )}
              </div>
              <div className={`${card.color} p-2 md:p-3 rounded-lg`}>
                <card.icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 매출 현황 그래프 */}
      <div className="bg-white p-4 md:p-6 rounded-lg border shadow-sm mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold mb-4">매출 현황</h2>
        <div className="h-64 md:h-80 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-block bg-blue-100 p-4 rounded-lg">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">최근 30일 매출 데이터</p>
            <p className="text-xs text-muted-foreground mt-1">차트는 추후 연동 예정입니다</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* 공지사항 */}
        <div className="bg-white p-4 md:p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold">공지사항</h2>
            <button className="text-sm text-blue-600 hover:underline">전체보기</button>
          </div>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base">시스템 정기 점검 안내</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    2024년 1월 20일 02:00 ~ 04:00 시스템 점검이 예정되어 있습니다.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">2024-01-15</span>
              </div>
            </div>
            <div className="p-3 border-l-4 border-gray-300 bg-gray-50 rounded-r">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base">배송비 정책 변경 안내</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    2024년 2월 1일부터 배송비가 3,000원으로 조정됩니다.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">2024-01-10</span>
              </div>
            </div>
            <div className="p-3 border-l-4 border-gray-300 bg-gray-50 rounded-r">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base">신규 결제 수단 추가</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    카카오페이, 네이버페이 결제가 가능합니다.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">2024-01-05</span>
              </div>
            </div>
          </div>
        </div>

        {/* 미해결 고객 문의 */}
        <div className="bg-white p-4 md:p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold">미해결 고객 문의</h2>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              3건
            </span>
          </div>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">긴급</span>
                  <span className="font-medium text-sm md:text-base">배송 지연 문의</span>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">1시간 전</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                주문번호 ORD-2024-001 배송이 3일째 지연되고 있습니다.
              </p>
              <p className="text-xs text-muted-foreground mt-1">문의자: 김철수</p>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">일반</span>
                  <span className="font-medium text-sm md:text-base">상품 교환 요청</span>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">3시간 전</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                사이즈가 맞지 않아 교환을 원합니다.
              </p>
              <p className="text-xs text-muted-foreground mt-1">문의자: 이영희</p>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">문의</span>
                  <span className="font-medium text-sm md:text-base">재입고 문의</span>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">5시간 전</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                무선 이어폰 블랙 색상 재입고 예정이 언제인가요?
              </p>
              <p className="text-xs text-muted-foreground mt-1">문의자: 박지민</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
