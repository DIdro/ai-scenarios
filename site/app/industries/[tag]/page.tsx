import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { INDUSTRIES } from '@/lib/tree'
import { getArticlesByIndustry, getAllIndustries } from '@/lib/content'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArticleCard from '@/components/ArticleCard'
import { nArticles } from '@/lib/pluralize'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllIndustries().map(({ slug }) => ({ tag: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const name = INDUSTRIES[tag] ?? tag
  return {
    title: `${name} — Сценарии внедрения ИИ`,
    description: `Сценарии внедрения ИИ в отрасли «${name}»`,
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const name = INDUSTRIES[tag]
  if (!name) notFound()

  const articles = getArticlesByIndustry(tag)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: `Отрасль: ${name}` }]} />
      <header className="mb-10">
        <div className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-3">
          Отрасль
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
          {name}
        </h1>
        <p className="text-gray-600">
          Сценарии, применимые в отрасли «{name}» — {nArticles(articles.length)}.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-gray-500 text-sm">Пока нет статей с этой отраслью.</p>
      ) : (
        <ul className="space-y-1">
          {articles.map((a) => (
            <li key={a.href}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
