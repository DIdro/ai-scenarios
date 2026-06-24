import Link from 'next/link'
import { getAllIndustries } from '@/lib/content'
import { INDUSTRIES } from '@/lib/tree'

export default function IndustryTagCloud() {
  const industries = getAllIndustries()
  if (industries.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-3">
      {industries.map(({ slug, count }) => (
        <li key={slug}>
          <Link
            href={`/industries/${slug}/`}
            className="group inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/70 px-5 py-3 text-base text-gray-700 hover:border-gray-300 hover:bg-white hover:text-gray-900 transition-colors"
          >
            <span className="font-medium">{INDUSTRIES[slug] ?? slug}</span>
            <span className="tabular-nums text-sm text-gray-400 group-hover:text-gray-500">
              {count}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
