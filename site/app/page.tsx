import { getAllScenarios } from '@/lib/scenarios'
import ScenarioGrid from '@/components/ScenarioGrid'

export default function Home() {
  const scenarios = getAllScenarios()

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          Библиотека AI-сценариев
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed">
          Открытая база воспроизводимых сценариев внедрения ИИ в бизнес. Не кейсы конкретных компаний — типовые паттерны, применимые к классу ситуаций.
        </p>
      </div>

      <ScenarioGrid scenarios={scenarios} />
    </main>
  )
}
