import Link from 'next/link'
import type { Scenario } from '@/lib/scenario-types'
import { FUNCTION_LABELS, STATUS_LABELS, AUTONOMY_LABELS, AI_PATTERN_LABELS } from '@/lib/scenario-types'

const statusColor: Record<string, string> = {
  verified: 'bg-green-50 text-green-700',
  hypothesis: 'bg-yellow-50 text-yellow-700',
  'in-progress': 'bg-blue-50 text-blue-700',
}

const autonomyColor: Record<string, string> = {
  chat: 'bg-gray-100 text-gray-600',
  cowork: 'bg-indigo-50 text-indigo-700',
  agent: 'bg-purple-50 text-purple-700',
  'multi-agent': 'bg-orange-50 text-orange-700',
}

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <Link href={`/scenarios/${scenario.slug}`} className="group block h-full">
      <div className="border border-gray-100 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-white h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {FUNCTION_LABELS[scenario.function] ?? scenario.function}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColor[scenario.status] ?? 'bg-gray-100 text-gray-600'}`}>
            {STATUS_LABELS[scenario.status] ?? scenario.status}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-black leading-snug">
          {scenario.title}
        </h3>

        <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2 flex-1">
          {scenario.pain}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${autonomyColor[scenario.autonomy] ?? 'bg-gray-100 text-gray-600'}`}>
            {AUTONOMY_LABELS[scenario.autonomy] ?? scenario.autonomy}
          </span>
          {scenario.ai_pattern.slice(0, 2).map(p => (
            <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">
              {AI_PATTERN_LABELS[p] ?? p}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
