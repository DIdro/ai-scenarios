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
              className="text-sm px-5 py-2 bg-black text-white rounded-full shadow-[0_4px_20px_-2px_rgba(99,102,241,0.55)] hover:shadow-[0_6px_30px_-2px_rgba(99,102,241,0.85)] hover:bg-gray-900 hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            >
              Предложить сценарий
            </button>
          </div>
        </div>
      </header>
      {open && <ProposeModal onClose={() => setOpen(false)} />}
    </>
  )
}
