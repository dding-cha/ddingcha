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
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive' | 'blocked'
  joinDate: string
}

// 임시 데이터
const mockUsers: User[] = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    totalOrders: 15,
    totalSpent: 450000,
    status: 'active',
    joinDate: '2024-01-10',
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-9876-5432',
    totalOrders: 8,
    totalSpent: 320000,
    status: 'active',
    joinDate: '2024-01-12',
  },
  {
    id: '3',
    name: '박지민',
    email: 'park@example.com',
    phone: '010-5555-6666',
    totalOrders: 3,
    totalSpent: 85000,
    status: 'inactive',
    joinDate: '2024-01-05',
  },
]

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusBadge = (status: User['status']) => {
    const statusConfig = {
      active: { label: '활성', color: 'bg-green-100 text-green-800' },
      inactive: { label: '비활성', color: 'bg-gray-100 text-gray-800' },
      blocked: { label: '차단됨', color: 'bg-red-100 text-red-800' },
    }

    const config = statusConfig[status]
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  )

  const activeUsers = users.filter((u) => u.status === 'active').length
  const inactiveUsers = users.filter((u) => u.status === 'inactive').length
  const blockedUsers = users.filter((u) => u.status === 'blocked').length

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">회원 관리</h1>
        <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">회원 정보를 관리합니다</p>
      </div>

      {/* 회원 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">활성 회원</p>
              <p className="text-2xl font-bold">{activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-3 rounded-lg">
              <UserIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">비활성 회원</p>
              <p className="text-2xl font-bold">{inactiveUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <UserXIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">차단된 회원</p>
              <p className="text-2xl font-bold">{blockedUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 검색 */}
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="이름, 이메일, 전화번호 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 회원 목록 */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">이름</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">이메일</TableHead>
                <TableHead className="whitespace-nowrap">전화번호</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">주문 수</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">총 구매액</TableHead>
                <TableHead className="whitespace-nowrap">상태</TableHead>
                <TableHead className="whitespace-nowrap hidden xl:table-cell">가입일</TableHead>
                <TableHead className="whitespace-nowrap">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? '검색 결과가 없습니다.' : '회원이 없습니다.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <UserIcon className="h-4 w-4 text-gray-600" />
                        </div>
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MailIcon className="h-4 w-4" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <PhoneIcon className="h-4 w-4 md:hidden" />
                        {user.phone}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{user.totalOrders}건</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.totalSpent.toLocaleString()}원
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="hidden xl:table-cell">{user.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          상세
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
