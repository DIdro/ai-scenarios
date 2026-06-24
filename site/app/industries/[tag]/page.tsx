import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { INDUSTRIES, TREE, ACCENT_CLASSES } from '@/lib/tree'
import { getArticlesByIndustry, getAllIndustries } from '@/lib/content'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArticleCard from '@/components/ArticleCard'
import CategoryIcon from '@/components/CategoryIcon'
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
  const groups = TREE.map((subsystem) => ({
    subsystem,
    articles: articles.filter((a) => a.subsystem === subsystem.slug),
  })).filter((g) => g.articles.length > 0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: `Отрасль: ${name}` }]} />
      <header className="mb-10">
        <div className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-3">Отрасль</div>
        <h1 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-gray-900 mb-3">{name}</h1>
        <p className="text-gray-600">Сценарии, применимые в отрасли «{name}» — {nArticles(articles.length)}.</p>
      </header>

      {articles.length === 0 ? (
        <p className="text-gray-500 text-sm">Пока нет статей с этой отраслью.</p>
      ) : (
        <div className="space-y-10">
          {groups.map(({ subsystem, articles: group }) => {
            const accent = ACCENT_CLASSES[subsystem.accent] ?? ACCENT_CLASSES.amber
            return (
              <section key={subsystem.slug}>
                <Link href={`/${subsystem.slug}/`} className="group flex items-center gap-3 mb-4">
                  <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${accent.iconBg} ${accent.iconText}`}>
                    <CategoryIcon slug={subsystem.slug} className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-black">{subsystem.title}</h2>
                  <span className={`text-xs tabular-nums px-2 py-0.5 rounded-full ${accent.bgSoft} ${accent.text}`}>{nArticles(group.length)}</span>
                </Link>
                <ul className="space-y-1">
                  {group.map((a) => (
                    <li key={a.href}>
                      <ArticleCard article={a} />
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
