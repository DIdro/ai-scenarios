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
      <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-semibold text-sm tracking-tight text-black hover:opacity-70 transition-opacity shrink-0"
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
