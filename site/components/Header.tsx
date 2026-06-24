'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ProposeModal from './ProposeModal'
import SearchBox from './SearchBox'

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  // На главной поиск живёт в hero — в шапке его не дублируем.
  const showSearch = pathname !== '/'

  return (
    <>
      {/* Liquid glass: полупрозрачный матовый фон + верхний блик + мягкая тень.
          Запасной непрозрачный фон, если backdrop-filter не поддерживается. */}
      <header className="sticky top-0 z-40 border-b border-white/40 bg-white/80 supports-[backdrop-filter]:bg-white/55 backdrop-blur-lg backdrop-saturate-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_6px_24px_-14px_rgba(0,0,0,0.18)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif font-medium text-xl md:text-2xl tracking-tight text-gray-900 hover:opacity-70 transition-opacity shrink-0"
          >
            Библиотека ДИИП
          </Link>
          <div className="flex items-center gap-3">
            {showSearch && <SearchBox />}
            <button
              onClick={() => setOpen(true)}
              className="text-sm px-4 py-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              + Предложить
            </button>
          </div>
        </div>
      </header>
      {open && <ProposeModal onClose={() => setOpen(false)} />}
    </>
  )
}
