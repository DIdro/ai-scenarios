import Link from 'next/link'

export type Crumb = { href?: string; label: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-xs text-gray-500 mb-6">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Главная
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-gray-300">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
