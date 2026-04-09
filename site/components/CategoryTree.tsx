import Link from 'next/link'
import { TREE, ACCENT_CLASSES } from '@/lib/tree'
import { countArticlesInCategory, countArticlesInSubcategory } from '@/lib/content'
import CategoryIcon from './CategoryIcon'

type Props = {
  activeCategory?: string
  activeSubcategory?: string
}

export default function CategoryTree({ activeCategory, activeSubcategory }: Props) {
  return (
    <nav className="text-sm">
      <ul className="space-y-6">
        {TREE.map((category) => {
          const isActiveCat = activeCategory === category.slug
          const accent = ACCENT_CLASSES[category.accent] ?? ACCENT_CLASSES.amber
          const count = countArticlesInCategory(category.slug)

          return (
            <li key={category.slug}>
              <Link
                href={`/${category.slug}/`}
                className={`flex items-center justify-between font-medium ${
                  isActiveCat ? accent.text : 'text-gray-900 hover:text-gray-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={isActiveCat ? accent.iconText : 'text-gray-400'}>
                    <CategoryIcon slug={category.slug} className="w-4 h-4" />
                  </span>
                  {category.title}
                </span>
                <span className="text-xs text-gray-400 tabular-nums">{count}</span>
              </Link>

              {isActiveCat && (
                <ul className="mt-2 ml-6 space-y-1.5 border-l border-gray-100 pl-4">
                  {category.subcategories.map((sub) => {
                    const isActiveSub = activeSubcategory === sub.slug
                    const subCount = countArticlesInSubcategory(category.slug, sub.slug)
                    return (
                      <li key={sub.slug}>
                        <Link
                          href={`/${category.slug}/${sub.slug}/`}
                          className={`flex items-center justify-between text-sm ${
                            isActiveSub
                              ? `${accent.text} font-medium`
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <span>{sub.title}</span>
                          <span className="text-xs text-gray-400 tabular-nums">{subCount}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
