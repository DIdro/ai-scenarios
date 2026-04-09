import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { TREE, getCategory, getSubcategory, type CategoryMeta, type SubcategoryMeta } from './tree'

const CONTENT_DIR = path.join(process.cwd(), 'content')

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
  slug: string // file basename without extension
  category: string // category slug
  subcategory: string // subcategory slug
  href: string // /operations/meetings/protocol-extraction/
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

  for (const category of fs.readdirSync(CONTENT_DIR)) {
    const categoryDir = path.join(CONTENT_DIR, category)
    if (!fs.statSync(categoryDir).isDirectory()) continue

    for (const subcategory of fs.readdirSync(categoryDir)) {
      const subcategoryDir = path.join(categoryDir, subcategory)
      if (!fs.statSync(subcategoryDir).isDirectory()) continue

      for (const file of fs.readdirSync(subcategoryDir)) {
        if (!file.endsWith('.mdx')) continue
        const slug = file.replace(/\.mdx$/, '')
        const filePath = path.join(subcategoryDir, file)
        const raw = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(raw)
        const fm = data as Record<string, unknown>
        // gray-matter parses ISO dates as Date objects — normalize to string
        const publishedAt =
          fm.publishedAt instanceof Date
            ? fm.publishedAt.toISOString().slice(0, 10)
            : (fm.publishedAt as string | undefined) ?? ''
        articles.push({
          slug,
          category,
          subcategory,
          href: `/${category}/${subcategory}/${slug}/`,
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

  // sort newest first
  articles.sort((a, b) => (b.frontmatter.publishedAt ?? '').localeCompare(a.frontmatter.publishedAt ?? ''))
  cache = articles
  return cache
}

export function getAllArticles(): Article[] {
  return readAllArticles()
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return readAllArticles().filter((a) => a.category === categorySlug)
}

export function getArticlesBySubcategory(categorySlug: string, subSlug: string): Article[] {
  return readAllArticles().filter((a) => a.category === categorySlug && a.subcategory === subSlug)
}

export function getArticlesByIndustry(industry: string): Article[] {
  return readAllArticles().filter((a) => a.frontmatter.industries.includes(industry))
}

export function getArticle(category: string, subcategory: string, slug: string): Article | undefined {
  return readAllArticles().find(
    (a) => a.category === category && a.subcategory === subcategory && a.slug === slug,
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

export function countArticlesInSubcategory(category: string, sub: string): number {
  return getArticlesBySubcategory(category, sub).length
}

export function countArticlesInCategory(category: string): number {
  return getArticlesByCategory(category).length
}

export { TREE, getCategory, getSubcategory }
export type { CategoryMeta, SubcategoryMeta }
