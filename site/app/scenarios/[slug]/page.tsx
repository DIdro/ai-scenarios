import { getAllScenarios, getScenarioBySlug } from '@/lib/scenarios'
import { FUNCTION_LABELS, STATUS_LABELS, COMPLEXITY_LABELS, TIME_LABELS, BUDGET_LABELS } from '@/lib/scenario-types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProposeButton from '@/components/ProposeButton'

export async function generateStaticParams() {
  return getAllScenarios().map(s => ({ slug: s.slug }))
}

const statusColor: Record<string, string> = {
  verified: 'bg-green-50 text-green-700 border-green-200',
  hypothesis: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
}

export default async function ScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scenario = getScenarioBySlug(slug)
  if (!scenario) notFound()

  const sections = parseSections(scenario!.content)

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
          ← Все сценарии
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              {FUNCTION_LABELS[scenario.function] ?? scenario.function}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${statusColor[scenario.status] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
              {STATUS_LABELS[scenario.status] ?? scenario.status}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-8">{scenario.title}</h1>

          {sections.map(({ heading, body }) => (
            <Section key={heading} heading={heading} body={body} />
          ))}

          {scenario.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-1.5">
                {scenario.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="border border-gray-100 rounded-xl p-4 text-sm space-y-3">
            <MetaRow label="Сложность" value={COMPLEXITY_LABELS[scenario.complexity] ?? scenario.complexity} />
            <MetaRow label="Срок" value={TIME_LABELS[scenario.timeToResult] ?? scenario.timeToResult} />
            <MetaRow label="Бюджет" value={BUDGET_LABELS[scenario.budget] ?? scenario.budget} />
            <MetaRow label="Отрасль" value={scenario.industry === 'universal' ? 'Любая' : scenario.industry} />
            <MetaRow label="Размер компании" value={scenario.companySize.join(', ')} />
          </div>
          <ProposeButton />
        </aside>
      </div>
    </main>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-800 font-medium text-right">{value}</span>
    </div>
  )
}

function Section({ heading, body }: { heading: string; body: string }) {
  if (heading === 'Мета' || heading === 'Теги') return null
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">{heading}</h2>
      <div
        className="text-sm text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: mdToHtml(body) }}
      />
    </div>
  )
}

function parseSections(content: string): { heading: string; body: string }[] {
  const sections: { heading: string; body: string }[] = []
  const parts = content.split(/^## /m)
  for (const part of parts.slice(1)) {
    const idx = part.indexOf('\n')
    const heading = part.slice(0, idx).trim()
    const body = part.slice(idx).trim()
    sections.push({ heading, body })
  }
  return sections
}

function mdToHtml(md: string): string {
  return md
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-xs font-mono">$1</code>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-gray-200 pl-4 text-gray-500 italic my-3">$1</blockquote>')
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, '<li class="mb-1">$1</li>')
    // Checklist checked
    .replace(/^[-*] \[x\] (.+)$/gm, '<li class="flex gap-2 mb-1"><span class="text-green-500 shrink-0">✓</span><span>$1</span></li>')
    // Checklist unchecked
    .replace(/^[-*] \[ \] (.+)$/gm, '<li class="flex gap-2 mb-1 text-gray-400"><span class="shrink-0">○</span><span>$1</span></li>')
    // Unordered list items
    .replace(/^[-*] (.+)$/gm, '<li class="mb-1">$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li[\s\S]*?<\/li>\n?)+/g, '<ul class="space-y-0.5 list-none pl-0 mb-4">$&</ul>')
    // Table rows
    .replace(/^\|(.+)\|$/gm, (_, row) => {
      const cells = row.split('|').map((c: string) => c.trim())
      if (cells.every((c: string) => /^[-: ]+$/.test(c))) return ''
      return `<tr class="border-b border-gray-100">${cells.map((c: string) => `<td class="py-1.5 pr-4 text-sm">${c.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</td>`).join('')}</tr>`
    })
    // Wrap consecutive <tr> in <table>
    .replace(/(<tr[\s\S]*?<\/tr>\n?)+/g, '<div class="overflow-x-auto mb-4"><table class="w-full text-left">$&</table></div>')
    // Double newlines to paragraphs
    .replace(/\n\n+/g, '</p><p class="mb-3 mt-0">')
    // Wrap in paragraph tags
    .replace(/^(.)/, '<p class="mb-3">$1')
    .concat('</p>')
}
