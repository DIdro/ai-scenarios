import type { ReactNode } from 'react'

// Линейные иконки отраслей (stroke, 24×24) — в одном стиле с CategoryIcon.
const ICONS: Record<string, ReactNode> = {
  universal: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
    </>
  ),
  manufacturing: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10l5 3V10l5 3V7h4v14" />
    </>
  ),
  services: (
    <>
      <path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 21h4" />
    </>
  ),
  retail: (
    <>
      <path d="M6 8h12l1 12H5z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  'it-company': (
    <>
      <path d="M9 8l-4 4 4 4" />
      <path d="M15 8l4 4-4 4" />
    </>
  ),
  education: (
    <>
      <path d="M3 9l9-4 9 4-9 4z" />
      <path d="M7 11v5c0 1.1 2.2 2 5 2s5-.9 5-2v-5" />
    </>
  ),
  healthcare: (
    <>
      <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" />
    </>
  ),
  fintech: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  construction: (
    <>
      <path d="M4 18h16" />
      <path d="M6 18a6 6 0 0 1 12 0" />
      <path d="M10 7a2 2 0 0 1 4 0v3" />
    </>
  ),
}

export default function IndustryIcon({
  slug,
  className = 'w-5 h-5',
}: {
  slug: string
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[slug] ?? <circle cx="12" cy="12" r="4" />}
    </svg>
  )
}
