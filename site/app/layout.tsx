import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Библиотека ДИИП — сценарии внедрения ИИ',
  description:
    'Воспроизводимые сценарии применения ИИ в среднем бизнесе. Только реальный опыт.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <Header />
        {children}
        <footer className="border-t border-gray-100 mt-24 py-10">
          <div className="max-w-5xl mx-auto px-4 text-xs text-gray-400 flex flex-wrap gap-3">
            <span>Библиотека ДИИП — часть методологии «Дизайн ИИ-Преобразований»</span>
            <span className="text-gray-300">·</span>
            <span>Только проверенные сценарии</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
