import type { ArticleFrontmatter } from '@/lib/content'

export default function ArticleByline({ frontmatter }: { frontmatter: ArticleFrontmatter }) {
  return (
    <footer className="not-prose mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
      <span>
        <span className="text-gray-900 font-medium">{frontmatter.author}</span>
        {frontmatter.authorOrg && (
          <span className="text-gray-400"> · {frontmatter.authorOrg}</span>
        )}
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
    </footer>
  )
}
