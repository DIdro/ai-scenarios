import Link from 'next/link'
import type { ArticleFrontmatter } from '@/lib/content'
import { INDUSTRIES } from '@/lib/tree'

export default function ArticleHeader({ frontmatter }: { frontmatter: ArticleFrontmatter }) {
  return (
    <header className="not-prose mb-10 pb-8 border-b border-gray-100">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-3 leading-tight">
        {frontmatter.title}
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-5">{frontmatter.description}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
        <span>
          <span className="text-gray-900 font-medium">{frontmatter.author}</span>
          {frontmatter.authorOrg && <span className="text-gray-400"> · {frontmatter.authorOrg}</span>}
        </span>
        {frontmatter.publishedAt && (
          <>
            <span className="text-gray-300">·</span>
            <time dateTime={frontmatter.publishedAt}>
              {new Date(frontmatter.publishedAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </>
        )}
      </div>
      {frontmatter.industries.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {frontmatter.industries.map((ind) => (
            <Link
              key={ind}
              href={`/industries/${ind}/`}
              className="px-2.5 py-1 text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full transition-colors"
            >
              {INDUSTRIES[ind] ?? ind}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
