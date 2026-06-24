'use client'

import { useState } from 'react'
import ProposeModal from './ProposeModal'

// Пустой узел дерева: раздел есть в структуре, но сценариев пока нет.
export default function EmptyState() {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white/50 px-6 py-12 text-center">
      <p className="font-serif font-medium text-xl text-gray-900 mb-1.5">
        Сценариев пока нет
      </p>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
        Этот раздел уже есть в структуре ДИИП. Вы можете предложить первый сценарий —
        и он появится здесь.
      </p>
      <button
        onClick={() => setOpen(true)}
        className="text-sm px-5 py-2.5 bg-black text-white rounded-full shadow-[0_4px_18px_-3px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 transition-all duration-300"
      >
        Предложить сценарий
      </button>
      {open && <ProposeModal onClose={() => setOpen(false)} />}
    </div>
  )
}
