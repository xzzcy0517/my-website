import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '最喜欢真真的小陈 | 生活养生 × 科技 AI 教程',
  description: '一个热爱生活、也痴迷科技的UP主。分享健康养生的生活智慧，带你探索AI科技的前沿玩法。',
  keywords: ['小陈', '生活养生', '科技AI', 'AI教程', '健康养生', 'UP主'],
  authors: [{ name: '最喜欢真真的小陈' }],
  openGraph: {
    title: '最喜欢真真的小陈 | 生活养生 × 科技 AI 教程',
    description: '一个热爱生活、也痴迷科技的UP主。分享健康养生的生活智慧，带你探索AI科技的前沿玩法。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '最喜欢真真的小陈',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
