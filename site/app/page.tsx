import Link from 'next/link'
import { TREE, ACCENT_CLASSES } from '@/lib/tree'
import { getAllArticles, countArticlesInCategory } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import IndustryTagCloud from '@/components/IndustryTagCloud'

export default function HomePage() {
  const recent = getAllArticles().slice(0, 6)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-5">
          Библиотека сценариев<br />внедрения ИИ
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Воспроизводимые сценарии применения искусственного интеллекта в компаниях среднего бизнеса.
          Только реальный опыт — каждая статья описывает то, что мы или наши партнёры действительно
          внедряли.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-5">
          По функциям бизнеса
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {TREE.map((category) => {
            const accent = ACCENT_CLASSES[category.accent] ?? ACCENT_CLASSES.amber
            const count = countArticlesInCategory(category.slug)
            return (
              <li key={category.slug} className="bg-white">
                <Link
                  href={`/${category.slug}/`}
                  className={`block p-6 h-full ${accent.hoverBg} transition-colors`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className={`text-2xl ${accent.text}`}>{category.icon}</span>
                    <span className="text-xs text-gray-400 tabular-nums">{count} статей</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1.5">{category.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {category.description}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
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

      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-5">
          По отраслям
        </h2>
        <IndustryTagCloud />
      </section>
    </div>
  )
}
