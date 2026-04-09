import Link from 'next/link'
import { getAllIndustries } from '@/lib/content'
import { INDUSTRIES } from '@/lib/tree'

export default function IndustryTagCloud() {
  const industries = getAllIndustries()
  if (industries.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {industries.map(({ slug, count }) => (
        <Link
          key={slug}
          href={`/industries/${slug}/`}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full transition-colors"
        >
          {INDUSTRIES[slug] ?? slug}
          <span className="text-xs text-gray-400 tabular-nums">{count}</span>
        </Link>
      ))}
    </div>
  )
}
