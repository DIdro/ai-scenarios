'use client'

import { useState } from 'react'
import ProposeModal from './ProposeModal'

export default function ProposeButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors"
      >
        + Предложить сценарий
      </button>
      {open && <ProposeModal onClose={() => setOpen(false)} />}
    </>
  )
}
