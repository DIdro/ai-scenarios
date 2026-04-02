import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'AI Scenarios — Библиотека сценариев внедрения ИИ',
  description: 'Открытая база воспроизводимых сценариев применения искусственного интеллекта в бизнесе.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
