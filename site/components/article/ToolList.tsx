import type { ReactNode } from 'react'

export default function ToolList({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl border border-gray-200 divide-y divide-gray-100 [&>div]:px-5">
      {children}
    </div>
  )
}
