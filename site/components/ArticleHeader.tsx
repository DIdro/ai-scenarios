import Link from 'next/link'
import type { ArticleFrontmatter } from '@/lib/content'
import { INDUSTRIES } from '@/lib/tree'

export default function ArticleHeader({ frontmatter }: { frontmatter: ArticleFrontmatter }) {
  return (
    <header className="not-prose mb-10 pb-8 border-b border-gray-200/70">
      <h1 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-gray-900 mb-3 leading-[1.15]">
        {frontmatter.title}
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">{frontmatter.description}</p>
      {frontmatter.industries.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {frontmatter.industries.map((ind) => (
            <Link
              key={ind}
              href={`/industries/${ind}/`}
              className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              {INDUSTRIES[ind] ?? ind}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
