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
import { UserIcon, MailIcon, PhoneIcon, SearchIcon, ShieldCheckIcon, UserXIcon } from 'lucide-react'
import { Input } from '@/app/shared/ui/input'

interface User {
  id: number
  name: string | null
  email: string | null
  phone: string | null
  isGuest: boolean
  totalOrders: number
  totalAddresses: number
  createdAt: string
  lastLogin: string | null
}

export default function UsersPage() {
  const [user, setUser] = useState<User | null>(null)
  const [searchEmail, setSearchEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch() {
    if (!searchEmail.trim()) {
      setError('이메일을 입력해주세요.')
      return
    }

    setLoading(true)
    setError(null)
    setUser(null)

    try {
      const response = await fetch(`/api/users?email=${encodeURIComponent(searchEmail)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '사용자 검색에 실패했습니다.')
      }

      if (!data.user) {
        setError('해당 이메일의 사용자를 찾을 수 없습니다.')
      } else {
        setUser(data.user)
      }
    } catch (err) {
      console.error('Failed to search user:', err)
      setError(err instanceof Error ? err.message : '사용자 검색에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateString: string | null) {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">회원 관리</h1>
        <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">이메일로 회원을 검색합니다</p>
      </div>

      {/* 이메일 검색 */}
      <div className="mb-6 bg-card p-6 rounded-lg border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">회원 검색</h2>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="이메일 주소를 입력하세요 (예: user@example.com)"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
              disabled={loading}
            />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            <SearchIcon className="h-4 w-4 mr-2" />
            {loading ? '검색 중...' : '검색'}
          </Button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        )}
      </div>

      {/* 회원 정보 */}
      {user && (
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border bg-muted/30">
            <h2 className="text-xl font-semibold text-foreground">회원 정보</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">회원 ID</label>
                  <p className="text-foreground font-medium">{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">이름</label>
                  <p className="text-foreground font-medium">{user.name || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">이메일</label>
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-foreground font-medium">{user.email || '-'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">전화번호</label>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-foreground font-medium">{user.phone || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Activity Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">회원 유형</label>
                  <p className="text-foreground font-medium">
                    {user.isGuest ? (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        게스트 회원
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                        정회원
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">총 주문 수</label>
                  <p className="text-foreground font-medium">{user.totalOrders}건</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">등록된 배송지 수</label>
                  <p className="text-foreground font-medium">{user.totalAddresses}개</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">가입일</label>
                  <p className="text-foreground font-medium">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">최근 로그인</label>
                  <p className="text-foreground font-medium">{formatDate(user.lastLogin)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
