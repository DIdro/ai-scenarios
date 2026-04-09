import type { ReactNode } from 'react'

export default function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="not-prose my-8 space-y-4 border-l-2 border-gray-100 pl-6">
      {children}
    </ol>
  )
}
