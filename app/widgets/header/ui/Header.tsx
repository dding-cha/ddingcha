"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { CATEGORIES } from "@/shared/config/categories";
import { useCart } from "@/shared/lib/contexts/CartContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-8">
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
          className="hidden md:flex items-center gap-6"
          aria-label="메인 네비게이션"
        >
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            상품
          </Link>
          <Link
            href="/trending"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            트렌딩
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            자주 묻는 질문
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:block max-w-sm flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="상품 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/my/addresses">
            <Button variant="ghost" size="icon" aria-label="내 계정">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/my/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="장바구니"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="메뉴"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="상품 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-4">
              <Link
                href="/products"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                상품
              </Link>
              <div className="pl-4 flex flex-col gap-2">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/trending"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                트렌딩
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                자주 묻는 질문
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
