import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ddingcha.com'),
  title: "DdingCha | Fast, Simple Shopping from TikTok",
  description: "We bring trending products straight to your door. No hassle, no delays—just quality items delivered fast.",
  keywords: ["TikTok shopping", "fast delivery", "online shopping", "trending products"],
  authors: [{ name: "DdingCha" }],
  openGraph: {
    title: "DdingCha | Fast, Simple Shopping from TikTok",
    description: "We bring trending products straight to your door. No hassle, no delays—just quality items delivered fast.",
    url: "https://ddingcha.com",
    siteName: "DdingCha",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DdingCha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DdingCha | Fast, Simple Shopping from TikTok",
    description: "We bring trending products straight to your door. No hassle, no delays—just quality items delivered fast.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
