import Link from 'next/link'
import type { Article } from '@/lib/content'
import { getCategory, INDUSTRIES, ACCENT_CLASSES } from '@/lib/tree'

export default function ArticleCard({ article }: { article: Article }) {
  const category = getCategory(article.category)
  const accent = category ? ACCENT_CLASSES[category.accent] ?? ACCENT_CLASSES.amber : ACCENT_CLASSES.amber

  return (
    <Link
      href={article.href}
      className={`group block border-l-2 ${accent.border} pl-5 py-3 hover:bg-gray-50 transition-colors -mx-3 px-3 rounded-r-lg`}
    >
      <h3 className="font-medium text-gray-900 group-hover:text-black mb-1 leading-snug">
        {article.frontmatter.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{article.frontmatter.description}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
        <span>{article.frontmatter.author}</span>
        {article.frontmatter.industries.length > 0 && (
          <>
            <span>·</span>
            <span>
              {article.frontmatter.industries
                .slice(0, 3)
                .map((ind) => INDUSTRIES[ind] ?? ind)
                .join(' · ')}
            </span>
          </>
        )}
      </div>
    </Link>
  )
}
