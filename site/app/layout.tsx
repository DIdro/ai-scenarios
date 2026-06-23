import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: 'Библиотека ДИИП — сценарии внедрения ИИ',
  description:
    'Воспроизводимые сценарии применения ИИ в среднем бизнесе. Только реальный опыт.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans text-gray-900 antialiased">
        <Header />
        {children}
        <footer className="border-t border-gray-200/70 mt-24 py-10">
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
