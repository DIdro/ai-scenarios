'use client'

import { FUNCTION_LABELS, COMPLEXITY_LABELS, STATUS_LABELS } from '@/lib/scenario-types'

export type FilterState = {
  function: string
  complexity: string
  status: string
  search: string
}

export default function Filters({
  filters,
  onChange,
}: {
  filters: FilterState
  onChange: (f: FilterState) => void
}) {
  const set = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value })

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        type="search"
        placeholder="Поиск по названию или тегу..."
        value={filters.search}
        onChange={e => set('search', e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 w-60"
      />
      <Select
        value={filters.function}
        onChange={v => set('function', v)}
        options={[['', 'Все функции'], ...Object.entries(FUNCTION_LABELS)]}
      />
      <Select
        value={filters.complexity}
        onChange={v => set('complexity', v)}
        options={[['', 'Любая сложность'], ...Object.entries(COMPLEXITY_LABELS)]}
      />
      <Select
        value={filters.status}
        onChange={v => set('status', v)}
        options={[['', 'Любой статус'], ...Object.entries(STATUS_LABELS)]}
      />
      {(filters.function || filters.complexity || filters.status || filters.search) && (
        <button
          onClick={() => onChange({ function: '', complexity: '', status: '', search: '' })}
          className="text-xs text-gray-400 hover:text-gray-700 underline"
        >
          Сбросить
        </button>
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
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white text-gray-700"
    >
      {options.map(([val, label]) => (
        <option key={val} value={val}>{label}</option>
      ))}
    </select>
  )
}
