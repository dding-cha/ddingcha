'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboardIcon, PackageIcon, ShoppingCartIcon, UsersIcon, HomeIcon, MenuIcon, XIcon, MessageSquareIcon, MegaphoneIcon, TrendingUpIcon } from 'lucide-react'

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/manager') {
      return pathname === '/manager'
    }
    return pathname.startsWith(path)
  }

  const menuItems = [
    { href: '/manager', label: '대시보드', icon: LayoutDashboardIcon },
    { href: '/manager/notices', label: '공지사항', icon: MegaphoneIcon },
    { href: '/manager/sales', label: '매출 관리', icon: TrendingUpIcon },
    { href: '/manager/products', label: '상품 관리', icon: PackageIcon },
    { href: '/manager/orders', label: '주문 관리', icon: ShoppingCartIcon },
    { href: '/manager/users', label: '회원 관리', icon: UsersIcon },
    { href: '/manager/inquiries', label: '문의 관리', icon: MessageSquareIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 모바일 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link href="/manager" className="flex items-center gap-2 text-xl font-bold hover:text-gray-300 transition-colors">
            <Image src="/logo.png" alt="띵차" width={32} height={32} className="h-8 w-8" />
            띵차 관리자
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item, index) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href) && (item.href === '/manager' ? pathname === '/manager' : true)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
              {/* 공지사항 아래에 구분선 */}
              {item.href === '/manager/notices' && (
                <div className="my-3 border-t border-gray-800"></div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <HomeIcon className="h-4 w-4" />
            홈페이지로 이동
          </Link>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 lg:ml-64">
        {/* 모바일 헤더 */}
        <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="font-bold text-lg">띵차 관리자</h1>
        </div>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
