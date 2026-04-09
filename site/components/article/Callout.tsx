import type { ReactNode } from 'react'

const variants = {
  info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', icon: 'ℹ' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', icon: '⚠' },
  success: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900', icon: '✓' },
  note: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-900', icon: '◆' },
} as const

type Variant = keyof typeof variants

export default function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: Variant
  title?: string
  children: ReactNode
}) {
  const v = variants[type]
  return (
    <aside className={`not-prose my-6 rounded-xl border ${v.border} ${v.bg} p-5`}>
      <div className="flex gap-3">
        <span className={`text-lg leading-6 ${v.text}`}>{v.icon}</span>
        <div className="flex-1">
          {title && <div className={`font-semibold mb-1 ${v.text}`}>{title}</div>}
          <div className={`text-sm leading-relaxed ${v.text} [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0`}>
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}
