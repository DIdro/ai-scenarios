'use client'

import { FUNCTION_LABELS, AUTONOMY_LABELS, AI_PATTERN_LABELS } from '@/lib/scenario-types'

export type FilterState = {
  function: string
  autonomy: string
  ai_pattern: string
  search: string
}

export default function Filters({ filters, onChange }: {
  filters: FilterState
  onChange: (f: FilterState) => void
}) {
  const set = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value })

  const hasActive = Object.values(filters).some(v => v !== '')

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <input
        type="search"
        placeholder="Поиск..."
        value={filters.search}
        onChange={e => set('search', e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 w-48"
      />
      <Select value={filters.function} onChange={v => set('function', v)}
        options={[['', 'Функция'], ...Object.entries(FUNCTION_LABELS)]} />
      <Select value={filters.autonomy} onChange={v => set('autonomy', v)}
        options={[['', 'Автономность'], ...Object.entries(AUTONOMY_LABELS)]} />
      <Select value={filters.ai_pattern} onChange={v => set('ai_pattern', v)}
        options={[['', 'Паттерн ИИ'], ...Object.entries(AI_PATTERN_LABELS)]} />
      {hasActive && (
        <button
          onClick={() => onChange({ function: '', autonomy: '', ai_pattern: '', search: '' })}
          className="text-xs text-gray-400 hover:text-gray-700 underline"
        >Сбросить</button>
      )}
    </div>
  )
}

function Select({ value, onChange, options }: {
  value: string
  onChange: (v: string) => void
  options: [string, string][]
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white text-gray-700">
      {options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
    </select>
  )
}
