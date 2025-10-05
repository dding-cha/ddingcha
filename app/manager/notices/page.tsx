'use client'

import { useState } from 'react'
import { Button } from '@/app/shared/ui/button'
import { Input } from '@/app/shared/ui/input'
import { Textarea } from '@/app/shared/ui/textarea'
import { Label } from '@/app/shared/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table'
import { PlusIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react'

interface Notice {
  id: string
  title: string
  content: string
  important: boolean
  createdAt: string
  updatedAt?: string
}

// 임시 데이터
const mockNotices: Notice[] = [
  {
    id: '1',
    title: '시스템 정기 점검 안내',
    content: '2024년 1월 20일 02:00 ~ 04:00 시스템 점검이 예정되어 있습니다.',
    important: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: '배송비 정책 변경 안내',
    content: '2024년 2월 1일부터 배송비가 3,000원으로 조정됩니다.',
    important: false,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    title: '신규 결제 수단 추가',
    content: '카카오페이, 네이버페이 결제가 가능합니다.',
    important: false,
    createdAt: '2024-01-05',
  },
]

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(mockNotices)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    important: false,
  })

  const handleOpenModal = (notice?: Notice) => {
    if (notice) {
      setEditingNotice(notice)
      setFormData({
        title: notice.title,
        content: notice.content,
        important: notice.important,
      })
    } else {
      setEditingNotice(null)
      setFormData({ title: '', content: '', important: false })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingNotice(null)
    setFormData({ title: '', content: '', important: false })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }

    if (editingNotice) {
      // 수정
      setNotices(
        notices.map((notice) =>
          notice.id === editingNotice.id
            ? {
                ...notice,
                ...formData,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : notice
        )
      )
      alert('공지사항이 수정되었습니다.')
    } else {
      // 등록
      const newNotice: Notice = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setNotices([newNotice, ...notices])
      alert('공지사항이 등록되었습니다.')
    }

    handleCloseModal()
  }

  const handleDelete = (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    setNotices(notices.filter((notice) => notice.id !== id))
    alert('공지사항이 삭제되었습니다.')
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">공지사항</h1>
          <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
            공지사항을 관리합니다
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          공지 등록
        </Button>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground">전체 공지</p>
          <p className="text-2xl md:text-3xl font-bold mt-1">{notices.length}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground">중요 공지</p>
          <p className="text-2xl md:text-3xl font-bold mt-1">
            {notices.filter((n) => n.important).length}
          </p>
        </div>
      </div>

      {/* 공지사항 목록 */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap w-16">중요</TableHead>
                <TableHead className="whitespace-nowrap">제목</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">내용</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">등록일</TableHead>
                <TableHead className="whitespace-nowrap w-32">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    등록된 공지사항이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell>
                      {notice.important && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          중요
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{notice.title}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                      {notice.content}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{notice.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleOpenModal(notice)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(notice.id)}
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

      {/* 공지사항 등록/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-4 md:p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingNotice ? '공지사항 수정' : '공지사항 등록'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="공지사항 제목을 입력하세요"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">내용 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="공지사항 내용을 입력하세요"
                  rows={6}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="important"
                  type="checkbox"
                  checked={formData.important}
                  onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="important" className="cursor-pointer">
                  중요 공지로 설정
                </Label>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" className="flex-1">
                  {editingNotice ? '수정하기' : '등록하기'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1"
                >
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
