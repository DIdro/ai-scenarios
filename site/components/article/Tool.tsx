export default function Tool({ name, role }: { name: string; role: string }) {
  return (
    <div className="not-prose flex items-start gap-3 py-2">
      <span className="font-medium text-gray-900 min-w-[140px]">{name}</span>
      <span className="text-sm text-gray-600 leading-6">{role}</span>
    </div>
  )
}
