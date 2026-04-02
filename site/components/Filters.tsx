'use client'

import { FUNCTION_LABELS, AUTONOMY_LABELS, AI_PATTERN_LABELS, MATURITY_LABELS } from '@/lib/scenario-types'

const INDUSTRY_LABELS: Record<string, string> = {
  universal: 'Любая отрасль',
  manufacturing: 'Производство',
  services: 'Услуги',
  retail: 'Ритейл',
  'it-company': 'ИТ-компания',
  education: 'Образование',
  healthcare: 'Медицина',
  fintech: 'Финтех',
}

export type FilterState = {
  function: string
  autonomy: string
  ai_pattern: string
  industry: string
  process_maturity: string
  search: string
}

const EMPTY: FilterState = { function: '', autonomy: '', ai_pattern: '', industry: '', process_maturity: '', search: '' }

const FILTER_LABELS: Record<keyof Omit<FilterState, 'search'>, Record<string, string>> = {
  function: FUNCTION_LABELS,
  industry: INDUSTRY_LABELS,
  autonomy: AUTONOMY_LABELS,
  ai_pattern: AI_PATTERN_LABELS,
  process_maturity: MATURITY_LABELS,
}

export default function Filters({ filters, onChange }: {
  filters: FilterState
  onChange: (f: FilterState) => void
}) {
  const set = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value })

  const activeChips = (Object.keys(FILTER_LABELS) as (keyof typeof FILTER_LABELS)[])
    .filter(k => filters[k] !== '')

  return (
    <div className="flex flex-col gap-3">
      {/* Controls row */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="search"
          placeholder="Поиск..."
          value={filters.search}
          onChange={e => set('search', e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 w-44"
        />
        <Select value={filters.industry} onChange={v => set('industry', v)}
          options={[['', 'Отрасль'], ...Object.entries(INDUSTRY_LABELS)]} />
        <Select value={filters.function} onChange={v => set('function', v)}
          options={[['', 'Функция'], ...Object.entries(FUNCTION_LABELS)]} />
        <Select value={filters.autonomy} onChange={v => set('autonomy', v)}
          options={[['', 'Автономность'], ...Object.entries(AUTONOMY_LABELS)]} />
        <Select value={filters.ai_pattern} onChange={v => set('ai_pattern', v)}
          options={[['', 'Паттерн ИИ'], ...Object.entries(AI_PATTERN_LABELS)]} />
        <Select value={filters.process_maturity} onChange={v => set('process_maturity', v)}
          options={[['', 'Зрелость'], ...Object.entries(MATURITY_LABELS)]} />
      </div>

      {/* Active chips */}
      {(activeChips.length > 0 || filters.search) && (
        <div className="flex flex-wrap gap-1.5 items-center">
          {filters.search && (
            <Chip label={`«${filters.search}»`} onRemove={() => set('search', '')} />
          )}
          {activeChips.map(k => (
            <Chip
              key={k}
              label={FILTER_LABELS[k][filters[k]] ?? filters[k]}
              onRemove={() => set(k, '')}
            />
          ))}
          <button
            onClick={() => onChange(EMPTY)}
            className="text-xs text-gray-400 hover:text-gray-700 underline ml-1"
          >Сбросить всё</button>
        </div>
      )}
    </div>
  )
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="text-gray-400 hover:text-gray-700 leading-none">×</button>
    </span>
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
