import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Scenario } from './scenario-types'

export type { Scenario }
export { FUNCTION_LABELS, STATUS_LABELS, COMPLEXITY_LABELS, TIME_LABELS, BUDGET_LABELS } from './scenario-types'

const SCENARIOS_DIR = path.join(process.cwd(), '..', 'scenarios')

function parseTableField(content: string, field: string): string {
  const regex = new RegExp(`\\|\\s*\\*\\*${field}\\*\\*\\s*\\|\\s*(.+?)\\s*\\|`, 'i')
  const match = content.match(regex)
  if (!match) return ''
  return match[1].replace(/`/g, '').trim()
}

function parseCompanySize(raw: string): string[] {
  return raw.split(',').map(s => s.trim()).filter(Boolean)
}

function parseTags(content: string): string[] {
  const match = content.match(/## Теги\n\n(.+)/m)
  if (!match) return []
  return match[1].split(',').map(s => s.replace(/`/g, '').trim()).filter(Boolean)
}

function parsePain(content: string): string {
  const match = content.match(/## Боль\n\n([\s\S]+?)(?=\n## )/)
  if (!match) return ''
  return match[1].trim()
}

export function getAllScenarios(): Scenario[] {
  if (!fs.existsSync(SCENARIOS_DIR)) return []
  const files = fs.readdirSync(SCENARIOS_DIR).filter(f => f.endsWith('.md') && f !== '.gitkeep')

  return files.map(filename => {
    const slug = filename.replace('.md', '')
    const raw = fs.readFileSync(path.join(SCENARIOS_DIR, filename), 'utf-8')
    const { content } = matter(raw)
    const title = content.match(/^# (.+)/m)?.[1] ?? slug

    return {
      slug,
      title,
      id: parseTableField(content, 'ID'),
      status: parseTableField(content, 'Статус') as Scenario['status'],
      function: parseTableField(content, 'Функция'),
      industry: parseTableField(content, 'Отрасль'),
      companySize: parseCompanySize(parseTableField(content, 'Размер компании')),
      complexity: parseTableField(content, 'Сложность') as Scenario['complexity'],
      budget: parseTableField(content, 'Бюджет') as Scenario['budget'],
      timeToResult: parseTableField(content, 'Срок до результата') as Scenario['timeToResult'],
      tags: parseTags(content),
      pain: parsePain(content),
      content,
    }
  })
}

export function getScenarioBySlug(slug: string): Scenario | undefined {
  return getAllScenarios().find(s => s.slug === slug)
}
