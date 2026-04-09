import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getAllArticles,
  getArticlesByCategory,
  getArticlesBySubcategory,
  getArticle,
  getCategory,
  getSubcategory,
  TREE,
} from '@/lib/content'
import { ACCENT_CLASSES } from '@/lib/tree'
import CategoryTree from '@/components/CategoryTree'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArticleCard from '@/components/ArticleCard'
import ArticleHeader from '@/components/ArticleHeader'
import CategoryIcon from '@/components/CategoryIcon'
import { nArticles } from '@/lib/pluralize'

export const dynamicParams = false

type Params = { slug: string[] }

export async function generateStaticParams(): Promise<Params[]> {
  const params: Params[] = []
  // category pages
  for (const cat of TREE) {
    params.push({ slug: [cat.slug] })
    for (const sub of cat.subcategories) {
      params.push({ slug: [cat.slug, sub.slug] })
    }
  }
  // article pages
  for (const article of getAllArticles()) {
    params.push({ slug: [article.category, article.subcategory, article.slug] })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params

  if (slug.length === 1) {
    const cat = getCategory(slug[0])
    if (cat) return { title: `${cat.title} — AI Scenarios`, description: cat.description }
  }
  if (slug.length === 2) {
    const found = getSubcategory(slug[0], slug[1])
    if (found) {
      return {
        title: `${found.subcategory.title} — ${found.category.title} — AI Scenarios`,
        description: found.subcategory.description,
      }
    }
  }
  if (slug.length === 3) {
    const article = getArticle(slug[0], slug[1], slug[2])
    if (article) {
      return {
        title: `${article.frontmatter.title} — AI Scenarios`,
        description: article.frontmatter.description,
      }
    }
  }
  return {}
}

export default async function CatchAllPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  if (slug.length === 1) return <CategoryView categorySlug={slug[0]} />
  if (slug.length === 2) return <SubcategoryView categorySlug={slug[0]} subSlug={slug[1]} />
  if (slug.length === 3)
    return <ArticleView categorySlug={slug[0]} subSlug={slug[1]} articleSlug={slug[2]} />

  notFound()
}

// ─────────────────────────────────────────────────────────────────────
// Category page
// ─────────────────────────────────────────────────────────────────────
function CategoryView({ categorySlug }: { categorySlug: string }) {
  const category = getCategory(categorySlug)
  if (!category) notFound()

  const articles = getArticlesByCategory(categorySlug)
  const accent = ACCENT_CLASSES[category.accent] ?? ACCENT_CLASSES.amber

  return (
    <PageShell activeCategory={categorySlug}>
      <Breadcrumbs items={[{ label: category.title }]} />

      <header className="mb-10 flex items-start gap-4">
        <div
          className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${accent.iconBg} ${accent.iconText}`}
        >
          <CategoryIcon slug={category.slug} className="w-6 h-6" />
        </div>
        <div>
          <div className={`text-xs uppercase tracking-wider font-medium ${accent.text} mb-1`}>
            Категория
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-3 leading-tight">
            {category.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">{category.description}</p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-4">
          Подкатегории
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {category.subcategories.map((sub) => {
            const count = articles.filter((a) => a.subcategory === sub.slug).length
            return (
              <li key={sub.slug}>
                <a
                  href={`/${category.slug}/${sub.slug}/`}
                  className="block p-5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all h-full"
                >
                  <div className="flex items-baseline justify-between mb-1.5 gap-3">
                    <h3 className="font-medium text-gray-900">{sub.title}</h3>
                    <span className="text-xs text-gray-400 tabular-nums shrink-0">
                      {nArticles(count)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{sub.description}</p>
                </a>
              </li>
            )
          })}
        </ul>
      </section>

      {articles.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-4">
            Все статьи в категории
          </h2>
          <ul className="space-y-1">
            {articles.map((a) => (
              <li key={a.href}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Subcategory page
// ─────────────────────────────────────────────────────────────────────
function SubcategoryView({ categorySlug, subSlug }: { categorySlug: string; subSlug: string }) {
  const found = getSubcategory(categorySlug, subSlug)
  if (!found) notFound()
  const { category, subcategory } = found
  const articles = getArticlesBySubcategory(categorySlug, subSlug)
  const accent = ACCENT_CLASSES[category.accent] ?? ACCENT_CLASSES.amber

  return (
    <PageShell activeCategory={categorySlug} activeSubcategory={subSlug}>
      <Breadcrumbs
        items={[
          { href: `/${category.slug}/`, label: category.title },
          { label: subcategory.title },
        ]}
      />

      <header className="mb-10">
        <div className={`text-xs uppercase tracking-wider font-medium ${accent.text} mb-2`}>
          {category.title}
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-3 leading-tight">
          {subcategory.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">{subcategory.description}</p>
      </header>

      {articles.length === 0 ? (
        <p className="text-gray-500 text-sm">Пока нет статей в этой подкатегории.</p>
      ) : (
        <ul className="space-y-1">
          {articles.map((a) => (
            <li key={a.href}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Article page
// ─────────────────────────────────────────────────────────────────────
async function ArticleView({
  categorySlug,
  subSlug,
  articleSlug,
}: {
  categorySlug: string
  subSlug: string
  articleSlug: string
}) {
  const article = getArticle(categorySlug, subSlug, articleSlug)
  if (!article) notFound()

  const found = getSubcategory(categorySlug, subSlug)
  if (!found) notFound()
  const { category, subcategory } = found

  // Dynamic import of the MDX file
  const { default: MDXContent } = await import(
    `@/content/${categorySlug}/${subSlug}/${articleSlug}.mdx`
  )

  const related = getArticlesBySubcategory(categorySlug, subSlug).filter(
    (a) => a.slug !== articleSlug,
  )

  return (
    <PageShell activeCategory={categorySlug} activeSubcategory={subSlug}>
      <Breadcrumbs
        items={[
          { href: `/${category.slug}/`, label: category.title },
          { href: `/${category.slug}/${subcategory.slug}/`, label: subcategory.title },
          { label: article.frontmatter.title },
        ]}
      />

      <article>
        <ArticleHeader frontmatter={article.frontmatter} />
        <div className="prose prose-gray prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-p:leading-relaxed prose-a:text-gray-900 prose-a:underline prose-a:underline-offset-2 prose-strong:font-semibold prose-strong:text-gray-900 max-w-none">
          <MDXContent />
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-4">
            Другие статьи в подкатегории
          </h2>
          <ul className="space-y-1">
            {related.map((a) => (
              <li key={a.href}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Layout shell
// ─────────────────────────────────────────────────────────────────────
function PageShell({
  children,
  activeCategory,
  activeSubcategory,
}: {
  children: React.ReactNode
  activeCategory?: string
  activeSubcategory?: string
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-12">
        <aside className="hidden lg:block sticky top-20 self-start">
          <CategoryTree activeCategory={activeCategory} activeSubcategory={activeSubcategory} />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
