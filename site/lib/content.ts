import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  TREE,
  getSubsystem,
  getProcess,
  getSubprocess,
  type SubsystemMeta,
  type ProcessMeta,
  type SubprocessMeta,
} from './tree'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// Каноническая привязка статьи (process, subprocess) — по приоритету:
//   1. поля frontmatter `process` / `subprocess` — главный способ для новых статей
//      (добавить статью = один MDX-файл, без правки кода);
//   2. NODE_MAP ниже — легаси для старых файлов в папках не по процессу;
//   3. имя папки (fallback).
const NODE_MAP: Record<string, { process: string; subprocess: string }> = {
  'strategy/market-analysis/competitor-monitoring': { process: 'strategic-planning', subprocess: 'market-analysis' },
  'strategy/process-design/bpmn-from-audio': { process: 'processes-org', subprocess: 'process-design' },
  'value-stream/sales/tender-analysis': { process: 'sales', subprocess: 'offers-contracts' },
  'value-stream/client-service/client-calculator-bot': { process: 'client-service', subprocess: 'support-requests' },
  'data/analytics/manager-assistant': { process: 'analytics', subprocess: 'dashboards' },
  'data/ai-knowledge/rag-knowledge-search': { process: 'ai-platform', subprocess: 'ai-knowledge-base' },
  'data/ai-knowledge/tech-docs-chatbot': { process: 'ai-platform', subprocess: 'ai-knowledge-base' },
  'support/hr/resume-normalization': { process: 'hr', subprocess: 'recruiting' },
  'support/hr/onboarding-bot': { process: 'hr', subprocess: 'onboarding-training' },
  'support/hr/idp-generation': { process: 'hr', subprocess: 'performance' },
  'management/operations/ai-meeting-secretary': { process: 'operations', subprocess: 'coordination' },
  'management/operations/deadline-planning': { process: 'operations', subprocess: 'coordination' },
  'management/operations/protocol-extraction': { process: 'operations', subprocess: 'coordination' },
  'management/quality/call-speech-analytics': { process: 'quality', subprocess: 'quality-control' },
}

export type ArticleFrontmatter = {
  title: string
  description: string
  author: string
  authorOrg?: string
  publishedAt: string
  industries: string[]
  forWhom?: string[]
}

export type Article = {
  slug: string
  subsystem: string
  process: string
  subprocess: string
  physicalFolder: string
  href: string
  frontmatter: ArticleFrontmatter
}

let cache: Article[] | null = null

function readAllArticles(): Article[] {
  if (cache) return cache
  const articles: Article[] = []

  if (!fs.existsSync(CONTENT_DIR)) {
    cache = []
    return cache
  }

  for (const subsystem of fs.readdirSync(CONTENT_DIR)) {
    const subsystemDir = path.join(CONTENT_DIR, subsystem)
    if (!fs.statSync(subsystemDir).isDirectory()) continue

    for (const folder of fs.readdirSync(subsystemDir)) {
      const folderDir = path.join(subsystemDir, folder)
      if (!fs.statSync(folderDir).isDirectory()) continue

      for (const file of fs.readdirSync(folderDir)) {
        if (!file.endsWith('.mdx')) continue
        const slug = file.replace(/\.mdx$/, '')
        const raw = fs.readFileSync(path.join(folderDir, file), 'utf-8')
        const { data } = matter(raw)
        const fm = data as Record<string, unknown>
        const publishedAt =
          fm.publishedAt instanceof Date
            ? fm.publishedAt.toISOString().slice(0, 10)
            : (fm.publishedAt as string | undefined) ?? ''

        const fmProcess = typeof fm.process === 'string' ? (fm.process as string) : undefined
        const fmSubprocess = typeof fm.subprocess === 'string' ? (fm.subprocess as string) : undefined
        const mapped = NODE_MAP[`${subsystem}/${folder}/${slug}`]
        const process = fmProcess ?? mapped?.process ?? folder
        const subprocess = fmSubprocess ?? mapped?.subprocess ?? folder

        articles.push({
          slug,
          subsystem,
          process,
          subprocess,
          physicalFolder: folder,
          href: `/${subsystem}/${process}/${subprocess}/${slug}/`,
          frontmatter: {
            title: (fm.title as string) ?? slug,
            description: (fm.description as string) ?? '',
            author: (fm.author as string) ?? 'Александр Петров',
            authorOrg: (fm.authorOrg as string) ?? 'Диалектика',
            publishedAt,
            industries: Array.isArray(fm.industries) ? (fm.industries as string[]) : [],
            forWhom: Array.isArray(fm.forWhom) ? (fm.forWhom as string[]) : undefined,
          },
        })
      }
    }
  }

  articles.sort((a, b) =>
    (b.frontmatter.publishedAt ?? '').localeCompare(a.frontmatter.publishedAt ?? ''),
  )
  cache = articles
  return cache
}

export function getAllArticles(): Article[] {
  return readAllArticles()
}

export function getArticlesBySubsystem(subsystem: string): Article[] {
  return readAllArticles().filter((a) => a.subsystem === subsystem)
}

export function getArticlesByProcess(subsystem: string, process: string): Article[] {
  return readAllArticles().filter((a) => a.subsystem === subsystem && a.process === process)
}

export function getArticlesBySubprocess(
  subsystem: string,
  process: string,
  subprocess: string,
): Article[] {
  return readAllArticles().filter(
    (a) => a.subsystem === subsystem && a.process === process && a.subprocess === subprocess,
  )
}

export function getArticlesByIndustry(industry: string): Article[] {
  return readAllArticles().filter((a) => a.frontmatter.industries.includes(industry))
}

export function getArticle(
  subsystem: string,
  process: string,
  subprocess: string,
  slug: string,
): Article | undefined {
  return readAllArticles().find(
    (a) =>
      a.subsystem === subsystem &&
      a.process === process &&
      a.subprocess === subprocess &&
      a.slug === slug,
  )
}

export function getAllIndustries(): { slug: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const a of readAllArticles()) {
    for (const ind of a.frontmatter.industries) {
      counts.set(ind, (counts.get(ind) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
}

export function countArticlesInSubsystem(subsystem: string): number {
  return getArticlesBySubsystem(subsystem).length
}

export function countArticlesInProcess(subsystem: string, process: string): number {
  return getArticlesByProcess(subsystem, process).length
}

export function countArticlesInSubprocess(
  subsystem: string,
  process: string,
  subprocess: string,
): number {
  return getArticlesBySubprocess(subsystem, process, subprocess).length
}

export { TREE, getSubsystem, getProcess, getSubprocess }
export type { SubsystemMeta, ProcessMeta, SubprocessMeta }
