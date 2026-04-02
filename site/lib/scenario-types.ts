export type Scenario = {
  slug: string
  title: string
  id: string
  status: 'verified' | 'hypothesis' | 'in-progress'
  ai_pattern: string[]
  function: string
  industry: string
  autonomy: 'chat' | 'cowork' | 'agent' | 'multi-agent'
  process_maturity: 'chaos' | 'process-exists' | 'data-exists'
  effect: string[]
  // card fields
  scale: 'micro' | 'meso' | 'macro'
  input_type: string[]
  complexity: 'no-code' | 'low-code' | 'custom-dev'
  budget: 'free' | 'low' | 'medium' | 'high'
  timeToResult: 'days' | 'weeks' | 'months'
  tags: string[]
  pain: string
  content: string
}

export const FUNCTION_LABELS: Record<string, string> = {
  operations: 'Операции',
  management: 'Управление',
  sales: 'Продажи',
  marketing: 'Маркетинг',
  hr: 'HR',
  finance: 'Финансы',
  'customer-service': 'Клиентский сервис',
  it: 'ИТ',
  legal: 'Юридический',
  rd: 'R&D',
}

export const AUTONOMY_LABELS: Record<string, string> = {
  chat: 'Chat',
  cowork: 'Cowork',
  agent: 'Agent',
  'multi-agent': 'Multi-agent',
}

export const AI_PATTERN_LABELS: Record<string, string> = {
  rag: 'RAG',
  nql: 'NQL',
  classification: 'Классификация',
  generation: 'Генерация',
  agent: 'Агент',
  extraction: 'Извлечение',
  monitoring: 'Мониторинг',
}

export const STATUS_LABELS: Record<string, string> = {
  verified: 'Проверено',
  hypothesis: 'Гипотеза',
  'in-progress': 'В процессе',
}

export const COMPLEXITY_LABELS: Record<string, string> = {
  'no-code': 'No-code',
  'low-code': 'Low-code',
  'custom-dev': 'Разработка',
}

export const TIME_LABELS: Record<string, string> = {
  days: 'Дни',
  weeks: 'Недели',
  months: 'Месяцы',
}

export const BUDGET_LABELS: Record<string, string> = {
  free: 'Бесплатно',
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
}

export const MATURITY_LABELS: Record<string, string> = {
  chaos: 'Хаос',
  'process-exists': 'Есть процесс',
  'data-exists': 'Есть данные',
}
