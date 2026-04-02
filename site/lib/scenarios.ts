import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Scenario } from './scenario-types'

export type { Scenario }
export {
  FUNCTION_LABELS, STATUS_LABELS, COMPLEXITY_LABELS, TIME_LABELS,
  BUDGET_LABELS, AUTONOMY_LABELS, AI_PATTERN_LABELS, MATURITY_LABELS
} from './scenario-types'

const SCENARIOS_DIR = path.join(process.cwd(), 'scenarios')

function parseField(content: string, field: string): string {
  const regex = new RegExp(`\\|\\s*\\*\\*${field}\\*\\*\\s*\\|\\s*(.+?)\\s*\\|`, 'i')
  const m = content.match(regex)
  if (!m) return ''
  return m[1].replace(/`/g, '').trim()
}

function parseMulti(raw: string): string[] {
  return raw.split(',').map(s => s.trim()).filter(Boolean)
}

function parseTags(content: string): string[] {
  const m = content.match(/## Теги\n\n(.+)/m)
  if (!m) return []
  return m[1].split(',').map(s => s.replace(/`/g, '').trim()).filter(Boolean)
}

function parsePain(content: string): string {
  const m = content.match(/## Боль\n\n([\s\S]+?)(?=\n## )/)
  if (!m) return ''
  return m[1].trim()
}

export function getAllScenarios(): Scenario[] {
  if (!fs.existsSync(SCENARIOS_DIR)) return []
  const files = fs.readdirSync(SCENARIOS_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('ONTOLOGY'))

  return files.map(filename => {
    const slug = filename.replace('.md', '')
    const raw = fs.readFileSync(path.join(SCENARIOS_DIR, filename), 'utf-8')
    const { content } = matter(raw)
    const title = content.match(/^# (.+)/m)?.[1] ?? slug

    return {
      slug,
      title,
      id: parseField(content, 'ID'),
      status: parseField(content, 'status') as Scenario['status'],
      ai_pattern: parseMulti(parseField(content, 'ai_pattern')),
      function: parseField(content, 'function'),
      industry: parseField(content, 'industry'),
      autonomy: parseField(content, 'autonomy') as Scenario['autonomy'],
      process_maturity: parseField(content, 'process_maturity') as Scenario['process_maturity'],
      effect: parseMulti(parseField(content, 'effect')),
      scale: parseField(content, 'scale') as Scenario['scale'],
      input_type: parseMulti(parseField(content, 'input_type')),
      complexity: parseField(content, 'complexity') as Scenario['complexity'],
      budget: parseField(content, 'budget') as Scenario['budget'],
      timeToResult: parseField(content, 'time_to_result') as Scenario['timeToResult'],
      tags: parseTags(content),
      pain: parsePain(content),
      content,
    }
  })
}

export function getScenarioBySlug(slug: string): Scenario | undefined {
  return getAllScenarios().find(s => s.slug === slug)
}
