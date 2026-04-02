import Link from 'next/link'
import type { Scenario } from '@/lib/scenario-types'
import { FUNCTION_LABELS, AUTONOMY_LABELS, AI_PATTERN_LABELS } from '@/lib/scenario-types'

const functionBorder: Record<string, string> = {
  operations: 'border-l-amber-400',
  management: 'border-l-violet-400',
  sales: 'border-l-emerald-400',
  hr: 'border-l-rose-400',
  finance: 'border-l-blue-400',
  marketing: 'border-l-pink-400',
  it: 'border-l-cyan-400',
  legal: 'border-l-slate-400',
  rd: 'border-l-indigo-400',
}

const functionText: Record<string, string> = {
  operations: 'text-amber-600',
  management: 'text-violet-600',
  sales: 'text-emerald-600',
  hr: 'text-rose-500',
  finance: 'text-blue-600',
  marketing: 'text-pink-500',
  it: 'text-cyan-600',
  legal: 'text-slate-500',
  rd: 'text-indigo-600',
}

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const borderColor = functionBorder[scenario.function] ?? 'border-l-gray-300'
  const textColor = functionText[scenario.function] ?? 'text-gray-500'

  return (
    <Link href={`/scenarios/${scenario.slug}`} className="group block h-full">
      <div className={`border border-gray-100 border-l-4 ${borderColor} rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all bg-white h-full flex flex-col`}>

        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs font-semibold uppercase tracking-wider ${textColor}`}>
            {FUNCTION_LABELS[scenario.function] ?? scenario.function}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {AUTONOMY_LABELS[scenario.autonomy] ?? scenario.autonomy}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-black leading-snug">
          {scenario.title}
        </h3>

        <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2 flex-1">
          {scenario.pain}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {scenario.ai_pattern.slice(0, 2).map(p => (
            <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
              {AI_PATTERN_LABELS[p] ?? p}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
