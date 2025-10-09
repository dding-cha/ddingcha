'use client'

import { useState } from 'react'
import { Button } from '@/app/shared/ui/button'
import { Input } from '@/app/shared/ui/input'
import { Textarea } from '@/app/shared/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table'
import { SearchIcon, PackageIcon, MessageCircleIcon, XIcon } from 'lucide-react'

interface Inquiry {
  id: string
  type: 'product' | 'general'
  productId?: string
  productName?: string
  customerName: string
  customerEmail: string
  title: string
  content: string
  status: 'pending' | 'answered' | 'closed'
  answer?: string
  createdAt: string
  answeredAt?: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [answerText, setAnswerText] = useState('')

  const getStatusBadge = (status: Inquiry['status']) => {
    const statusConfig = {
      pending: { label: '대기중', color: 'bg-muted text-muted-foreground' },
      answered: { label: '답변완료', color: 'bg-accent text-accent-foreground' },
      closed: { label: '종료', color: 'bg-card text-card-foreground' },
    }

    const config = statusConfig[status]
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmitAnswer = () => {
    if (!selectedInquiry || !answerText.trim()) return

    setInquiries(
      inquiries.map((inq) =>
        inq.id === selectedInquiry.id
          ? {
              ...inq,
              status: 'answered',
              answer: answerText,
              answeredAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
            }
          : inq
      )
    )

    setAnswerText('')
    setSelectedInquiry(null)
    alert('답변이 등록되었습니다.')
  }

  const handleStatusChange = (id: string, status: Inquiry['status']) => {
    setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)))
    alert('상태가 변경되었습니다.')
  }

  const pendingCount = inquiries.filter((i) => i.status === 'pending').length
  const answeredCount = inquiries.filter((i) => i.status === 'answered').length

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">문의 관리</h1>
        <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">고객 문의를 관리합니다</p>
      </div>

      {/* 문의 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-muted p-2 rounded-lg">
              <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">미답변</p>
              <p className="text-xl font-bold">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-2 rounded-lg">
              <MessageCircleIcon className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">답변완료</p>
              <p className="text-xl font-bold">{answeredCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <PackageIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">상품 문의</p>
              <p className="text-xl font-bold">{inquiries.filter((i) => i.type === 'product').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 검색 */}
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="제목, 내용, 고객명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 문의 목록 */}
      <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">유형</TableHead>
                <TableHead className="whitespace-nowrap">상품명</TableHead>
                <TableHead className="whitespace-nowrap">제목</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">고객명</TableHead>
                <TableHead className="whitespace-nowrap">상태</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">문의일</TableHead>
                <TableHead className="whitespace-nowrap">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? '검색 결과가 없습니다.' : '문의 내역이 없습니다.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      {inquiry.type === 'product' ? (
                        <span className="flex items-center gap-1 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          <PackageIcon className="h-3 w-3" />
                          상품
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                          <MessageCircleIcon className="h-3 w-3" />
                          일반
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {inquiry.productName || '-'}
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{inquiry.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{inquiry.customerName}</TableCell>
                    <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{inquiry.createdAt}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        상세
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 문의 상세 모달 */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">문의 상세</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4">
              {/* 문의 정보 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {selectedInquiry.type === 'product' ? (
                    <span className="flex items-center gap-1 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      <PackageIcon className="h-3 w-3" />
                      상품 문의
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                      <MessageCircleIcon className="h-3 w-3" />
                      일반 문의
                    </span>
                  )}
                  {getStatusBadge(selectedInquiry.status)}
                </div>

                {selectedInquiry.productName && (
                  <div>
                    <p className="text-sm text-muted-foreground">상품명</p>
                    <p className="font-medium">{selectedInquiry.productName}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">고객 정보</p>
                  <p className="font-medium">{selectedInquiry.customerName}</p>
                  <p className="text-sm text-muted-foreground">{selectedInquiry.customerEmail}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">제목</p>
                  <p className="font-medium">{selectedInquiry.title}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">문의 내용</p>
                  <p className="mt-1 p-3 bg-muted rounded-lg">{selectedInquiry.content}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">문의일시</p>
                  <p className="text-sm">{selectedInquiry.createdAt}</p>
                </div>
              </div>

              {/* 기존 답변 */}
              {selectedInquiry.answer && (
                <div className="border-t pt-4">
                  <div className="mb-2">
                    <p className="text-sm font-medium">답변 내용</p>
                    <p className="text-xs text-muted-foreground">답변일시: {selectedInquiry.answeredAt}</p>
                  </div>
                  <p className="p-3 bg-accent rounded-lg">{selectedInquiry.answer}</p>
                </div>
              )}

              {/* 답변 작성 */}
              {selectedInquiry.status === 'pending' && (
                <div className="border-t pt-4 space-y-3">
                  <p className="font-medium">답변 작성</p>
                  <Textarea
                    placeholder="답변 내용을 입력하세요..."
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    rows={5}
                  />
                  <Button onClick={handleSubmitAnswer} className="w-full md:w-auto">
                    답변 등록
                  </Button>
                </div>
              )}

              {/* 상태 변경 */}
              <div className="border-t pt-4 flex flex-wrap gap-2">
                <p className="w-full font-medium mb-2">상태 변경</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(selectedInquiry.id, 'pending')}
                  disabled={selectedInquiry.status === 'pending'}
                >
                  대기중으로 변경
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(selectedInquiry.id, 'answered')}
                  disabled={selectedInquiry.status === 'answered'}
                >
                  답변완료로 변경
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(selectedInquiry.id, 'closed')}
                  disabled={selectedInquiry.status === 'closed'}
                >
                  종료로 변경
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
