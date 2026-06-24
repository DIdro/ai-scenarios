'use client'

import { useEffect, useState } from 'react'

// Печатает заголовок по буквам. Полный текст всегда в DOM (sr-only + резерв места)
// — для SEO, скринридеров и отсутствия скачков вёрстки (CLS).
export default function HeroTitle({ text, className = '' }: { text: string; className?: string }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setCount(text.length)
      setDone(true)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i += 1
      setCount(i)
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
      }
    }, 42)
    return () => clearInterval(id)
  }, [text])

  return (
    <h1 className={`relative ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        <span className={`hero-caret ${done ? 'hero-caret--done' : ''}`}>|</span>
      </span>
    </h1>
  )
}
