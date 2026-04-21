import Link from 'next/link'
import { getAllIndustries } from '@/lib/content'
import { INDUSTRIES } from '@/lib/tree'
import { nArticles } from '@/lib/pluralize'

export default function IndustryTagCloud() {
  const industries = getAllIndustries()
  if (industries.length === 0) return null

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {industries.map(({ slug, count }) => (
        <li key={slug}>
          <Link
            href={`/industries/${slug}/`}
            className="group relative flex items-center justify-between gap-3 h-full p-6 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-black truncate">
                {INDUSTRIES[slug] ?? slug}
              </h3>
              <div className="text-sm text-gray-500 tabular-nums mt-0.5">
                {nArticles(count)}
              </div>
            </div>
            <svg
              aria-hidden
              className="shrink-0 w-4 h-4 text-gray-300 group-hover:text-gray-700 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  )
}
