import Link from 'next/link'
import { TREE, ACCENT_CLASSES } from '@/lib/tree'
import { getAllArticles, countArticlesInCategory } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import IndustryTagCloud from '@/components/IndustryTagCloud'
import CategoryIcon from '@/components/CategoryIcon'
import { nArticles } from '@/lib/pluralize'

export default function HomePage() {
  const recent = getAllArticles().slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <section className="mb-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1] mb-5">
          Библиотека сценариев<br />внедрения&nbsp;ИИ
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Воспроизводимые сценарии применения искусственного интеллекта в компаниях среднего
          бизнеса. Только реальный опыт — каждая статья описывает то, что мы или наши партнёры
          действительно внедряли. Подойдёт собственникам, операционным руководителям и командам,
          которые ищут конкретные паттерны, а не общие слова о трансформации.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-5">
          По функциям бизнеса
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TREE.map((category) => {
            const accent = ACCENT_CLASSES[category.accent] ?? ACCENT_CLASSES.amber
            const count = countArticlesInCategory(category.slug)
            return (
              <li key={category.slug}>
                <Link
                  href={`/${category.slug}/`}
                  className={`group relative block h-full p-6 rounded-2xl border border-gray-200 border-l-[3px] ${accent.border} bg-white ${accent.hoverBg} hover:border-gray-300 hover:shadow-sm transition-all`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent.iconBg} ${accent.iconText}`}
                    >
                      <CategoryIcon slug={category.slug} className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs tabular-nums px-2 py-0.5 rounded-full ${accent.bgSoft} ${accent.text}`}
                    >
                      {nArticles(count)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1.5 group-hover:text-black">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 pr-6">
                    {category.description}
                  </p>
                  <svg
                    aria-hidden
                    className="absolute bottom-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-700 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-5">
          По отраслям
        </h2>
        <IndustryTagCloud />
      </section>

      {recent.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-5">
            Свежие статьи
          </h2>
          <ul className="space-y-1">
            {recent.map((a) => (
              <li key={a.href}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
