export default function Stat({
  label,
  before,
  after,
}: {
  label: string
  before: string
  after: string
}) {
  return (
    <div className="not-prose grid grid-cols-[1fr_auto_auto_auto] items-baseline gap-4 py-3 border-b border-gray-100 last:border-0">
      <div className="text-sm text-gray-700">{label}</div>
      <div className="text-sm text-gray-400 line-through">{before}</div>
      <div className="text-gray-300">→</div>
      <div className="text-sm font-semibold text-gray-900">{after}</div>
    </div>
  )
}
