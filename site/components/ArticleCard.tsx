import Link from 'next/link'
import type { Article } from '@/lib/content'
import { getCategory, INDUSTRIES, ACCENT_CLASSES } from '@/lib/tree'

export default function ArticleCard({ article }: { article: Article }) {
  const category = getCategory(article.category)
  const accent = category
    ? ACCENT_CLASSES[category.accent] ?? ACCENT_CLASSES.amber
    : ACCENT_CLASSES.amber

  return (
    <Link
      href={article.href}
      className={`group relative flex items-start gap-3 border-l-[3px] ${accent.border} ${accent.hoverBg} hover:shadow-sm transition-all -mx-3 pl-5 pr-3 py-3.5 rounded-r-lg`}
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 group-hover:text-black mb-1 leading-snug">
          {article.frontmatter.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {article.frontmatter.description}
        </p>
        {article.frontmatter.industries.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {article.frontmatter.industries.slice(0, 4).map((ind) => (
              <span
                key={ind}
                className={`px-2 py-0.5 text-[11px] rounded-full ${accent.bgSoft} ${accent.text}`}
              >
                {INDUSTRIES[ind] ?? ind}
              </span>
            ))}
          </div>
        )}
      </div>
      <svg
        aria-hidden
        className="shrink-0 mt-1 w-4 h-4 text-gray-300 group-hover:text-gray-700 transition-transform group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
