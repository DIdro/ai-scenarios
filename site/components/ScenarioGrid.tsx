'use client'

import { useState } from 'react'
import type { Scenario } from '@/lib/scenario-types'
import ScenarioCard from './ScenarioCard'
import Filters, { FilterState } from './Filters'
import ProposeModal from './ProposeModal'

export default function ScenarioGrid({ scenarios }: { scenarios: Scenario[] }) {
  const [filters, setFilters] = useState<FilterState>({
    function: '', autonomy: '', ai_pattern: '', industry: '', process_maturity: '', search: '',
  })
  const [open, setOpen] = useState(false)

  const filtered = scenarios.filter(s => {
    if (filters.function && s.function !== filters.function) return false
    if (filters.autonomy && s.autonomy !== filters.autonomy) return false
    if (filters.ai_pattern && !s.ai_pattern.includes(filters.ai_pattern)) return false
    if (filters.industry && s.industry !== filters.industry) return false
    if (filters.process_maturity && s.process_maturity !== filters.process_maturity) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      return (
        s.title.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q)) ||
        s.pain.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <Filters filters={filters} onChange={setFilters} />
        <span className="text-sm text-gray-400">{filtered.length} сценариев</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-4">Ничего не найдено</p>
          <button onClick={() => setOpen(true)} className="text-sm text-black underline">
            Предложить такой сценарий?
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => <ScenarioCard key={s.slug} scenario={s} />)}
          <button onClick={() => setOpen(true)}
            className="border-2 border-dashed border-gray-200 rounded-xl p-5 hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-600 min-h-[160px]">
            <span className="text-2xl">+</span>
            <span className="text-sm font-medium">Предложить сценарий</span>
            <span className="text-xs text-center">Знаете кейс? Добавьте в библиотеку</span>
          </button>
        </div>
      )}

      {open && <ProposeModal onClose={() => setOpen(false)} />}
    </>
  )
}
