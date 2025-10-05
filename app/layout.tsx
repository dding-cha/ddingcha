import type { Metadata } from "next"
import { LayoutContent } from "./layout-content"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://ddingcha.com'),
  title: "띵차 | 틱톡 트렌드 쇼핑몰",
  description: "틱톡에서 화제인 상품을 빠르게 배송해드립니다. 2-4일 안에 트렌디한 제품을 받아보세요.",
  keywords: ["틱톡 쇼핑", "빠른 배송", "온라인 쇼핑", "트렌드 상품", "띵차"],
  authors: [{ name: "DdingCha" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "띵차 | 틱톡 트렌드 쇼핑몰",
    description: "틱톡에서 화제인 상품을 빠르게 배송해드립니다. 2-4일 안에 트렌디한 제품을 받아보세요.",
    url: "https://ddingcha.com",
    siteName: "띵차",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "띵차",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "띵차 | 틱톡 트렌드 쇼핑몰",
    description: "틱톡에서 화제인 상품을 빠르게 배송해드립니다. 2-4일 안에 트렌디한 제품을 받아보세요.",
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="font-noto w-full flex flex-col min-h-screen">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  )
}
