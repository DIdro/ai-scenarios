import Link from 'next/link'
import { TREE, ACCENT_CLASSES } from '@/lib/tree'
import {
  countArticlesInSubsystem,
  countArticlesInProcess,
  countArticlesInSubprocess,
} from '@/lib/content'
import CategoryIcon from './CategoryIcon'

type Props = {
  activeSubsystem?: string
  activeProcess?: string
  activeSubprocess?: string
}

export default function CategoryTree({ activeSubsystem, activeProcess, activeSubprocess }: Props) {
  return (
    <nav className="text-sm">
      <ul className="space-y-5">
        {TREE.map((subsystem) => {
          const isActiveSub = activeSubsystem === subsystem.slug
          const accent = ACCENT_CLASSES[subsystem.accent] ?? ACCENT_CLASSES.amber
          const count = countArticlesInSubsystem(subsystem.slug)
          return (
            <li key={subsystem.slug}>
              <Link
                href={`/${subsystem.slug}/`}
                className={`flex items-center justify-between font-medium ${
                  isActiveSub ? accent.text : 'text-gray-900 hover:text-gray-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={isActiveSub ? accent.iconText : 'text-gray-400'}>
                    <CategoryIcon slug={subsystem.slug} className="w-4 h-4" />
                  </span>
                  {subsystem.title}
                </span>
                <span className="text-xs text-gray-400 tabular-nums">{count}</span>
              </Link>

              {isActiveSub && (
                <ul className="mt-2 ml-6 space-y-1.5 border-l border-gray-100 pl-4">
                  {subsystem.processes.map((proc) => {
                    const isActiveProc = activeProcess === proc.slug
                    const procCount = countArticlesInProcess(subsystem.slug, proc.slug)
                    return (
                      <li key={proc.slug}>
                        <Link
                          href={`/${subsystem.slug}/${proc.slug}/`}
                          className={`flex items-center justify-between ${
                            isActiveProc ? `${accent.text} font-medium` : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <span>{proc.title}</span>
                          <span className="text-xs text-gray-400 tabular-nums">{procCount}</span>
                        </Link>

                        {isActiveProc && (
                          <ul className="mt-1.5 ml-3 space-y-1 border-l border-gray-100 pl-3">
                            {proc.subprocesses.map((sub) => {
                              const isActiveSp = activeSubprocess === sub.slug
                              const spCount = countArticlesInSubprocess(
                                subsystem.slug,
                                proc.slug,
                                sub.slug,
                              )
                              return (
                                <li key={sub.slug}>
                                  <Link
                                    href={`/${subsystem.slug}/${proc.slug}/${sub.slug}/`}
                                    className={`flex items-center justify-between text-[13px] ${
                                      isActiveSp
                                        ? `${accent.text} font-medium`
                                        : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                  >
                                    <span>{sub.title}</span>
                                    {spCount > 0 && (
                                      <span className="text-[11px] text-gray-400 tabular-nums">{spCount}</span>
                                    )}
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
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
