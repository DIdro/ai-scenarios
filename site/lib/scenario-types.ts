export type Scenario = {
  slug: string
  title: string
  id: string
  status: 'verified' | 'hypothesis' | 'in-progress'
  function: string
  industry: string
  companySize: string[]
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
