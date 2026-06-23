'use client'

import { useEffect, useRef, useState } from 'react'

type PagefindResult = {
  id: string
  data: () => Promise<{
    url: string
    meta: { title?: string }
    excerpt: string
  }>
}

type Pagefind = {
  search: (query: string) => Promise<{ results: PagefindResult[] }>
}

declare global {
  interface Window {
    __pagefind?: Pagefind
  }
}

export default function SearchBox({ variant = 'header' }: { variant?: 'header' | 'hero' }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isMac, setIsMac] = useState(false)
  const [results, setResults] = useState<
    Array<{ url: string; title: string; excerpt: string }>
  >([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform))
  }, [])

  // load pagefind once on first open — eval-wrapped so the bundler ignores it
  useEffect(() => {
    if (!open || window.__pagefind) return
    const loadPagefind = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
        const dynImport = new Function('p', 'return import(p)') as (p: string) => Promise<Pagefind>
        const pf = await dynImport('/pagefind/pagefind.js')
        window.__pagefind = pf
      } catch {
        /* index may not exist in dev mode */
      }
    }
    loadPagefind()
  }, [open])

  // search on query change
  useEffect(() => {
    if (!query.trim() || !window.__pagefind) {
      setResults([])
      return
    }
    let cancelled = false
    const run = async () => {
      const r = await window.__pagefind!.search(query)
      const items = await Promise.all(
        r.results.slice(0, 8).map(async (res) => {
          const data = await res.data()
          return {
            url: data.url,
            title: data.meta.title ?? data.url,
            excerpt: data.excerpt,
          }
        }),
      )
      if (!cancelled) setResults(items)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [query])

  // keyboard shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  return (
    <>
      {variant === 'hero' ? (
        <button
          onClick={() => setOpen(true)}
          className="group w-full flex items-center gap-3 px-5 py-4 bg-white border border-gray-200 rounded-2xl text-left shadow-sm hover:border-gray-300 hover:shadow-md transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-400">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-base text-gray-500">Искать сценарий — процесс, боль, инструмент…</span>
          <kbd className="ml-auto text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 hidden md:inline">
            {isMac ? '⌘K' : 'Ctrl K'}
          </kbd>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 border border-gray-200 rounded-full flex items-center gap-2 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Поиск</span>
          <kbd className="text-xs text-gray-400 hidden md:inline">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/30 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Поиск по сценариям..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-5 py-4 text-base border-b border-gray-100 focus:outline-none"
            />
            {results.length > 0 && (
              <ul className="max-h-96 overflow-y-auto">
                {results.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      className="block px-5 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      <div className="font-medium text-gray-900 mb-0.5 text-sm">{r.title}</div>
                      <div
                        className="text-xs text-gray-500 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: r.excerpt }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {query.trim() && results.length === 0 && (
              <div className="px-5 py-6 text-sm text-gray-400 text-center">
                Ничего не найдено
              </div>
            )}
            {!query.trim() && (
              <div className="px-5 py-6 text-xs text-gray-400">
                Введите запрос для поиска по библиотеке. Esc — закрыть.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
