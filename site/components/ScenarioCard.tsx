import Link from 'next/link'
import type { Scenario } from '@/lib/scenario-types'
import { FUNCTION_LABELS, AUTONOMY_LABELS, AI_PATTERN_LABELS } from '@/lib/scenario-types'

const autonomyColor: Record<string, string> = {
  chat: 'bg-sky-50 text-sky-700',
  cowork: 'bg-indigo-50 text-indigo-700',
  agent: 'bg-purple-50 text-purple-700',
  'multi-agent': 'bg-orange-50 text-orange-700',
}

const patternColor: Record<string, string> = {
  rag: 'bg-green-50 text-green-700',
  nql: 'bg-teal-50 text-teal-700',
  classification: 'bg-yellow-50 text-yellow-700',
  generation: 'bg-pink-50 text-pink-700',
  agent: 'bg-purple-50 text-purple-700',
  extraction: 'bg-orange-50 text-orange-700',
  monitoring: 'bg-blue-50 text-blue-700',
}

const functionColor: Record<string, string> = {
  operations: 'text-amber-600',
  management: 'text-violet-600',
  sales: 'text-emerald-600',
  hr: 'text-rose-500',
  finance: 'text-blue-600',
  marketing: 'text-pink-600',
  it: 'text-cyan-600',
  legal: 'text-slate-600',
  rd: 'text-indigo-600',
}

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <Link href={`/scenarios/${scenario.slug}`} className="group block h-full">
      <div className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 hover:shadow-md transition-all bg-white h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`text-xs font-semibold uppercase tracking-wide ${functionColor[scenario.function] ?? 'text-gray-400'}`}>
            {FUNCTION_LABELS[scenario.function] ?? scenario.function}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${autonomyColor[scenario.autonomy] ?? 'bg-gray-100 text-gray-600'}`}>
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
            <span key={p} className={`text-xs px-2 py-0.5 rounded-full font-medium ${patternColor[p] ?? 'bg-gray-50 text-gray-500'}`}>
              {AI_PATTERN_LABELS[p] ?? p}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
