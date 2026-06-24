import Link from 'next/link'
import { TREE, ACCENT_CLASSES } from '@/lib/tree'
import { getAllArticles, countArticlesInCategory } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import IndustryTagCloud from '@/components/IndustryTagCloud'
import SearchBox from '@/components/SearchBox'
import HeroTitle from '@/components/HeroTitle'
import Reveal from '@/components/Reveal'
import { nArticles } from '@/lib/pluralize'

export default function HomePage() {
  const all = getAllArticles()
  const recent = all.slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
      {/* Hero */}
      <section className="mb-16 md:mb-20 max-w-3xl">
        <p className="text-sm font-medium text-gray-500 mb-5 tracking-wide">
          Библиотека ДИИП · {nArticles(all.length)}
        </p>
        <HeroTitle
          text="Сценарии внедрения ИИ в бизнес"
          className="font-serif font-medium text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl tracking-tight text-gray-900 mb-6"
        />
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
          Готовые сценарии применения ИИ в среднем бизнесе. Только реальный
          опыт: каждая статья — то, что мы или партнёры действительно внедряли.
        </p>
        <div className="max-w-xl">
          <SearchBox variant="hero" />
        </div>
      </section>

      {/* Categories */}
      <section className="mb-20">
        <Reveal>
          <h2 className="text-xs uppercase tracking-[0.12em] text-gray-400 font-medium mb-6">
            По бизнес-процессам
          </h2>
        </Reveal>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TREE.map((category, i) => {
            const accent = ACCENT_CLASSES[category.accent] ?? ACCENT_CLASSES.amber
            const count = countArticlesInCategory(category.slug)
            return (
              <li key={category.slug}>
                <Reveal delay={i * 60} className="h-full">
                  <Link
                    href={`/${category.slug}/`}
                    className={`group relative flex h-full flex-col p-6 rounded-2xl ${accent.tint} ${accent.glow} hover:-translate-y-1 transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/80" aria-hidden />
                      <span className="text-xs tabular-nums text-white/75">{nArticles(count)}</span>
                    </div>
                    <h3 className="font-serif font-medium text-xl text-white mb-2 leading-snug">
                      {category.title}
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-3">
                      {category.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white">
                      Смотреть
                      <svg
                        aria-hidden
                        className="w-4 h-4 text-white/80 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Industries */}
      <section className="mb-20">
        <Reveal>
          <h2 className="text-xs uppercase tracking-[0.12em] text-gray-400 font-medium mb-6">
            По отраслям
          </h2>
          <IndustryTagCloud />
        </Reveal>
      </section>

      {recent.length > 0 && (
        <section>
          <Reveal>
            <h2 className="text-xs uppercase tracking-[0.12em] text-gray-400 font-medium mb-6">
              Свежие статьи
            </h2>
          </Reveal>
          <ul className="space-y-2">
            {recent.map((a, i) => (
              <li key={a.href}>
                <Reveal delay={i * 70}>
                  <ArticleCard article={a} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
