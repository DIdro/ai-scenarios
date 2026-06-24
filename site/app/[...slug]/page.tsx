import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getAllArticles,
  getArticlesByProcess,
  getArticlesBySubprocess,
  getArticle,
  getSubsystem,
  getProcess,
  getSubprocess,
  countArticlesInProcess,
  countArticlesInSubprocess,
  TREE,
} from '@/lib/content'
import { ACCENT_CLASSES } from '@/lib/tree'
import CategoryTree from '@/components/CategoryTree'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArticleCard from '@/components/ArticleCard'
import ArticleHeader from '@/components/ArticleHeader'
import ArticleByline from '@/components/ArticleByline'
import CategoryIcon from '@/components/CategoryIcon'
import HeroTitle from '@/components/HeroTitle'
import Reveal from '@/components/Reveal'
import EmptyState from '@/components/EmptyState'
import { nArticles } from '@/lib/pluralize'

export const dynamicParams = false

type Params = { slug: string[] }

export async function generateStaticParams(): Promise<Params[]> {
  const params: Params[] = []
  for (const s of TREE) {
    params.push({ slug: [s.slug] })
    for (const p of s.processes) {
      params.push({ slug: [s.slug, p.slug] })
      for (const sp of p.subprocesses) {
        params.push({ slug: [s.slug, p.slug, sp.slug] })
      }
    }
  }
  for (const a of getAllArticles()) {
    params.push({ slug: [a.subsystem, a.process, a.subprocess, a.slug] })
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
    const s = getSubsystem(slug[0])
    if (s) return { title: `${s.title} — Библиотека ДИИП`, description: s.description }
  }
  if (slug.length === 2) {
    const f = getProcess(slug[0], slug[1])
    if (f) return { title: `${f.process.title} — ${f.subsystem.title} — Библиотека ДИИП`, description: f.process.description }
  }
  if (slug.length === 3) {
    const f = getSubprocess(slug[0], slug[1], slug[2])
    if (f) return { title: `${f.subprocess.title} — ${f.process.title} — Библиотека ДИИП` }
  }
  if (slug.length === 4) {
    const a = getArticle(slug[0], slug[1], slug[2], slug[3])
    if (a) return { title: `${a.frontmatter.title} — Библиотека ДИИП`, description: a.frontmatter.description }
  }
  return {}
}

export default async function CatchAllPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  if (slug.length === 1) return <SubsystemView s={slug[0]} />
  if (slug.length === 2) return <ProcessView s={slug[0]} p={slug[1]} />
  if (slug.length === 3) return <SubprocessView s={slug[0]} p={slug[1]} sp={slug[2]} />
  if (slug.length === 4) return <ArticleView s={slug[0]} p={slug[1]} sp={slug[2]} a={slug[3]} />
  notFound()
}

// ── L1: Подсистема ──
function SubsystemView({ s }: { s: string }) {
  const subsystem = getSubsystem(s)
  if (!subsystem) notFound()
  const accent = ACCENT_CLASSES[subsystem.accent] ?? ACCENT_CLASSES.amber

  return (
    <PageShell activeSubsystem={s}>
      <Breadcrumbs items={[{ label: subsystem.title }]} />
      <header className="mb-12 flex items-start gap-4">
        <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${accent.iconBg} ${accent.iconText}`}>
          <CategoryIcon slug={subsystem.slug} className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.12em] font-medium text-gray-400 mb-1.5">Подсистема</div>
          <HeroTitle text={subsystem.title} className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-gray-900 mb-3 leading-tight" />
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">{subsystem.description}</p>
        </div>
      </header>

      <h2 className="text-xs uppercase tracking-[0.12em] text-gray-400 font-medium mb-4">Процессы</h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {subsystem.processes.map((proc, i) => {
          const count = countArticlesInProcess(s, proc.slug)
          return (
            <li key={proc.slug}>
              <Reveal delay={i * 50} className="h-full">
                <a href={`/${s}/${proc.slug}/`} className={`group relative flex h-full flex-col p-5 rounded-xl border ${accent.cardBorder} ${accent.tint} ${accent.glowSoft} hover:-translate-y-1 transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-medium ${accent.textStrong}`}>{proc.title}</h3>
                    <span className="text-xs tabular-nums text-gray-500 shrink-0 ml-3">{count}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{proc.description}</p>
                </a>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </PageShell>
  )
}

// ── L2: Процесс ──
function ProcessView({ s, p }: { s: string; p: string }) {
  const found = getProcess(s, p)
  if (!found) notFound()
  const { subsystem, process } = found
  const accent = ACCENT_CLASSES[subsystem.accent] ?? ACCENT_CLASSES.amber

  return (
    <PageShell activeSubsystem={s} activeProcess={p}>
      <Breadcrumbs items={[{ href: `/${s}/`, label: subsystem.title }, { label: process.title }]} />
      <header className="mb-10">
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-gray-400 mb-2">{subsystem.title}</div>
        <HeroTitle text={process.title} className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-gray-900 mb-3 leading-tight" />
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">{process.description}</p>
      </header>

      <h2 className="text-xs uppercase tracking-[0.12em] text-gray-400 font-medium mb-4">Подпроцессы</h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {process.subprocesses.map((sub, i) => {
          const count = countArticlesInSubprocess(s, p, sub.slug)
          return (
            <li key={sub.slug}>
              <Reveal delay={i * 50} className="h-full">
                <a href={`/${s}/${p}/${sub.slug}/`} className={`group relative flex items-center justify-between gap-3 h-full p-5 rounded-xl border ${accent.cardBorder} ${accent.tint} ${accent.glowSoft} hover:-translate-y-1 transition-all duration-300`}>
                  <span className={`font-medium ${accent.textStrong}`}>{sub.title}</span>
                  <span className="text-xs tabular-nums text-gray-500 shrink-0">{count}</span>
                </a>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </PageShell>
  )
}

// ── L3: Подпроцесс (лист со сценариями) ──
function SubprocessView({ s, p, sp }: { s: string; p: string; sp: string }) {
  const found = getSubprocess(s, p, sp)
  if (!found) notFound()
  const { subsystem, process, subprocess } = found
  const articles = getArticlesBySubprocess(s, p, sp)

  return (
    <PageShell activeSubsystem={s} activeProcess={p} activeSubprocess={sp}>
      <Breadcrumbs
        items={[
          { href: `/${s}/`, label: subsystem.title },
          { href: `/${s}/${p}/`, label: process.title },
          { label: subprocess.title },
        ]}
      />
      <header className="mb-10">
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-gray-400 mb-2">{process.title}</div>
        <HeroTitle text={subprocess.title} className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-gray-900 leading-tight" />
      </header>

      {articles.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="space-y-2">
          {articles.map((a, i) => (
            <li key={a.href}>
              <Reveal delay={i * 60}>
                <ArticleCard article={a} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}

// ── L4: Сценарий ──
async function ArticleView({ s, p, sp, a }: { s: string; p: string; sp: string; a: string }) {
  const article = getArticle(s, p, sp, a)
  if (!article) notFound()
  const found = getSubprocess(s, p, sp)
  if (!found) notFound()
  const { subsystem, process, subprocess } = found

  const { default: MDXContent } = await import(
    `@/content/${article.subsystem}/${article.physicalFolder}/${article.slug}.mdx`
  )

  const related = getArticlesBySubprocess(s, p, sp).filter((x) => x.slug !== a)

  return (
    <PageShell activeSubsystem={s} activeProcess={p} activeSubprocess={sp}>
      <Breadcrumbs
        items={[
          { href: `/${s}/`, label: subsystem.title },
          { href: `/${s}/${p}/`, label: process.title },
          { href: `/${s}/${p}/${sp}/`, label: subprocess.title },
          { label: article.frontmatter.title },
        ]}
      />
      <article>
        <ArticleHeader frontmatter={article.frontmatter} />
        <div className="prose prose-gray prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-p:leading-relaxed prose-a:text-gray-900 prose-a:underline prose-a:underline-offset-2 prose-strong:font-semibold prose-strong:text-gray-900 max-w-none">
          <MDXContent />
        </div>
        <ArticleByline frontmatter={article.frontmatter} />
      </article>

      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-200/70">
          <h2 className="text-xs uppercase tracking-[0.12em] text-gray-400 font-medium mb-4">Другие сценарии подпроцесса</h2>
          <ul className="space-y-2">
            {related.map((x, i) => (
              <li key={x.href}>
                <Reveal delay={i * 60}>
                  <ArticleCard article={x} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  )
}

// ── Shell ──
function PageShell({
  children,
  activeSubsystem,
  activeProcess,
  activeSubprocess,
}: {
  children: React.ReactNode
  activeSubsystem?: string
  activeProcess?: string
  activeSubprocess?: string
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-12">
        <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          <CategoryTree
            activeSubsystem={activeSubsystem}
            activeProcess={activeProcess}
            activeSubprocess={activeSubprocess}
          />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
