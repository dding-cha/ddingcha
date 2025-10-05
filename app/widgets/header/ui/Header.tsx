"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="띵차 로고"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xl font-bold text-foreground">띵차</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 flex-1 justify-center"
          aria-label="메인 네비게이션"
        >
          <Link
            href="/#products"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            상품
          </Link>
          <Link
            href="/#trending"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            트렌딩
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            이용방법
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            자주 묻는 질문
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="검색"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="내 계정">
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="장바구니"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
              0
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="메뉴"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
