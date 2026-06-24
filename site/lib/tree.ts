// Каноническое дерево ДИИП: Подсистема (L1) → Бизнес-процесс (L2) → Подпроцесс (L3).
// Сценарии (статьи) крепятся к подпроцессам. Масштаб: 5 / 29 / 85.
// Физические MDX лежат как content/<subsystem>/<folder>/<slug>.mdx — привязка к
// процессу/подпроцессу задаётся в lib/content.ts (NODE_MAP), дерево здесь — канон.

export type SubprocessMeta = {
  slug: string
  title: string
}

export type ProcessMeta = {
  slug: string
  title: string
  description: string
  subprocesses: SubprocessMeta[]
}

export type SubsystemMeta = {
  slug: string
  title: string
  description: string
  accent: string
  processes: ProcessMeta[]
}

const sp = (slug: string, title: string): SubprocessMeta => ({ slug, title })

export const TREE: SubsystemMeta[] = [
  {
    slug: 'strategy',
    title: 'Стратегия и проектирование',
    description: 'Замысел бизнеса: куда идём, что и как создаём.',
    accent: 'indigo',
    processes: [
      {
        slug: 'strategic-planning',
        title: 'Стратегическое планирование',
        description: 'Куда идёт бизнес и зачем.',
        subprocesses: [
          sp('market-analysis', 'Анализ рынка, трендов и конкурентов'),
          sp('vision-goals', 'Видение, миссия и цели'),
          sp('business-model', 'Бизнес-модель'),
          sp('initiatives-portfolio', 'Портфель стратегических инициатив'),
        ],
      },
      {
        slug: 'customers-markets',
        title: 'Клиенты и рынки',
        description: 'Кому и какую ценность предлагаем.',
        subprocesses: [
          sp('segmentation', 'Сегментация рынков и клиентов'),
          sp('customer-needs', 'Потребности и профили клиентов'),
          sp('value-proposition', 'Ценностное предложение'),
        ],
      },
      {
        slug: 'product-development',
        title: 'Разработка продуктов и услуг',
        description: 'Создание новых продуктов и услуг.',
        subprocesses: [
          sp('ideas-research', 'Идеи, исследования и концепции'),
          sp('prototyping', 'Разработка и прототипирование'),
          sp('testing-launch', 'Тестирование и запуск на рынок'),
        ],
      },
      {
        slug: 'facilities-tech',
        title: 'Площадки, технологии и оборудование',
        description: 'Проектирование того, на чём работает бизнес.',
        subprocesses: [
          sp('facility-design', 'Проектирование площадок и среды'),
          sp('tech-selection', 'Выбор технологий и оборудования'),
          sp('commissioning', 'Запуск в эксплуатацию'),
        ],
      },
      {
        slug: 'processes-org',
        title: 'Процессы и оргструктура',
        description: 'Как устроена работа и кто за что отвечает.',
        subprocesses: [
          sp('process-design', 'Дизайн бизнес-процессов'),
          sp('regulations', 'Регламенты и стандарты'),
          sp('org-structure', 'Оргструктура и роли'),
        ],
      },
    ],
  },
  {
    slug: 'value-stream',
    title: 'Создание и поставка ценности',
    description: 'Основной поток работы с клиентом — от спроса до сервиса.',
    accent: 'sky',
    processes: [
      {
        slug: 'marketing',
        title: 'Маркетинг и спрос',
        description: 'Привлечь внимание и сформировать спрос.',
        subprocesses: [
          sp('campaigns', 'Кампании и каналы'),
          sp('content', 'Контент'),
          sp('lead-gen', 'Генерация и квалификация лидов'),
          sp('brand', 'Бренд и репутация'),
        ],
      },
      {
        slug: 'sales',
        title: 'Продажи',
        description: 'Превратить интерес в сделку.',
        subprocesses: [
          sp('acquisition', 'Привлечение клиентов'),
          sp('deal-pipeline', 'Работа со сделкой и воронкой'),
          sp('pricing', 'Ценообразование и скидки'),
          sp('offers-contracts', 'Предложения и договоры'),
        ],
      },
      {
        slug: 'procurement',
        title: 'Закупки и поставщики',
        description: 'Обеспечить ресурсы и работать с поставщиками.',
        subprocesses: [
          sp('supplier-selection', 'Поиск и выбор поставщиков'),
          sp('purchase-orders', 'Договоры и заказы на закупку'),
          sp('supplier-evaluation', 'Оценка поставщиков'),
        ],
      },
      {
        slug: 'planning',
        title: 'Планирование спроса и ресурсов',
        description: 'Спрогнозировать спрос и сбалансировать ресурсы.',
        subprocesses: [
          sp('demand-forecast', 'Прогноз спроса'),
          sp('resource-planning', 'Планирование ресурсов и закупок'),
        ],
      },
      {
        slug: 'order-intake',
        title: 'Приём заказов и подготовка',
        description: 'Принять заявку и подготовиться к исполнению.',
        subprocesses: [
          sp('order-registration', 'Приём и регистрация заявок'),
          sp('resource-prep', 'Подготовка ресурсов и назначение исполнителей'),
          sp('scheduling', 'Расписание и загрузка'),
        ],
      },
      {
        slug: 'fulfillment',
        title: 'Исполнение — продукт и услуга',
        description: 'Ядро: создать продукт или оказать услугу.',
        subprocesses: [
          sp('execution-start', 'Запуск цикла исполнения'),
          sp('production-service', 'Создание продукта / оказание услуги'),
          sp('inline-quality', 'Контроль качества на ходу'),
          sp('handover', 'Завершение и передача результата'),
        ],
      },
      {
        slug: 'logistics',
        title: 'Логистика и доставка',
        description: 'Склад, запасы и доставка клиенту.',
        subprocesses: [
          sp('receiving-storage', 'Приёмка и хранение'),
          sp('inventory', 'Запасы и инвентаризация'),
          sp('picking-shipping', 'Комплектация и отгрузка'),
          sp('delivery-returns', 'Доставка клиенту и возвраты'),
        ],
      },
      {
        slug: 'billing',
        title: 'Биллинг и оплата',
        description: 'Выставить счёт и получить деньги.',
        subprocesses: [
          sp('invoicing', 'Счета и приём оплаты'),
          sp('receivables', 'Контроль дебиторки и взыскание'),
        ],
      },
      {
        slug: 'client-service',
        title: 'Сервис и сопровождение клиента',
        description: 'Поддержка после продажи и удержание.',
        subprocesses: [
          sp('support-requests', 'Поддержка и обращения'),
          sp('proactive-service', 'Проактивное обслуживание'),
          sp('feedback-retention', 'Обратная связь и удержание клиента'),
        ],
      },
    ],
  },
  {
    slug: 'data',
    title: 'Данные, аналитика и интеллект',
    description: 'Топливо для ИИ: данные, аналитика и модели.',
    accent: 'emerald',
    processes: [
      {
        slug: 'data-management',
        title: 'Управление данными',
        description: 'Порядок в данных.',
        subprocesses: [
          sp('master-data', 'Мастер-данные и качество данных'),
          sp('data-integration', 'Интеграция данных'),
        ],
      },
      {
        slug: 'analytics',
        title: 'Аналитика и отчётность',
        description: 'Видеть, что происходит.',
        subprocesses: [
          sp('dashboards', 'Дашборды и мониторинг показателей'),
          sp('reporting', 'Отчётность'),
        ],
      },
      {
        slug: 'ai-platform',
        title: 'Продвинутая аналитика и ИИ-платформа',
        description: 'Прогнозы, модели и базы знаний.',
        subprocesses: [
          sp('predictive', 'Прогнозная и предписывающая аналитика'),
          sp('ml-ops', 'ИИ/ML-платформа и эксплуатация моделей'),
          sp('ai-knowledge-base', 'База знаний для ИИ (поиск, RAG)'),
        ],
      },
    ],
  },
  {
    slug: 'support',
    title: 'Обеспечение',
    description: 'Поддерживающие функции бизнеса.',
    accent: 'violet',
    processes: [
      {
        slug: 'finance',
        title: 'Финансы и учёт',
        description: 'Деньги, учёт и бюджеты.',
        subprocesses: [
          sp('accounting', 'Бухгалтерский и налоговый учёт'),
          sp('management-accounting', 'Управленческий учёт и бюджеты'),
          sp('treasury', 'Казначейство и платежи'),
          sp('capital', 'Инвестиции и привлечение капитала'),
        ],
      },
      {
        slug: 'hr',
        title: 'Персонал (HR)',
        description: 'Люди: найм, развитие, мотивация.',
        subprocesses: [
          sp('recruiting', 'Подбор и найм'),
          sp('onboarding-training', 'Адаптация и обучение'),
          sp('compensation', 'Мотивация и вознаграждение'),
          sp('performance', 'Оценка и развитие'),
          sp('hr-admin', 'Кадровое администрирование'),
        ],
      },
      {
        slug: 'it',
        title: 'ИТ и системы',
        description: 'Информационные системы и инфраструктура.',
        subprocesses: [
          sp('infrastructure', 'Информационные системы и инфраструктура'),
          sp('user-support', 'Поддержка пользователей'),
          sp('infosec', 'Информационная безопасность'),
        ],
      },
      {
        slug: 'documents',
        title: 'Документы и знания',
        description: 'Документооборот и база знаний компании.',
        subprocesses: [
          sp('document-flow', 'Документооборот и архив'),
          sp('knowledge-base', 'База знаний и регламенты'),
        ],
      },
      {
        slug: 'assets',
        title: 'Активы и инфраструктура',
        description: 'Оборудование, площадки, энергетика.',
        subprocesses: [
          sp('equipment-maintenance', 'Обслуживание оборудования и площадок'),
          sp('utilities', 'Энергетика и инженерные системы'),
        ],
      },
      {
        slug: 'transport',
        title: 'Транспорт',
        description: 'Перевозки и автопарк.',
        subprocesses: [
          sp('shipping-transport', 'Перевозки'),
          sp('fleet', 'Управление автопарком'),
        ],
      },
      {
        slug: 'risk',
        title: 'Риски, безопасность и комплаенс',
        description: 'Защита, охрана труда, соответствие.',
        subprocesses: [
          sp('security', 'Безопасность (физическая и экономическая)'),
          sp('labor-safety', 'Охрана труда и экология'),
          sp('legal', 'Юридическое обеспечение'),
          sp('compliance', 'Риски, непрерывность и комплаенс'),
        ],
      },
      {
        slug: 'external',
        title: 'Внешние отношения и ESG',
        description: 'Госорганы, PR, устойчивое развитие.',
        subprocesses: [
          sp('government', 'Госорганы и регуляторы'),
          sp('pr-partnerships', 'PR, партнёрства и инвесторы'),
          sp('esg', 'Устойчивое развитие (ESG)'),
        ],
      },
    ],
  },
  {
    slug: 'management',
    title: 'Управление и контроль',
    description: 'Управление работой и качеством: координация, контроль, улучшение.',
    accent: 'amber',
    processes: [
      {
        slug: 'operations',
        title: 'Оперативное управление',
        description: 'Координация работы в моменте.',
        subprocesses: [
          sp('coordination', 'Диспетчеризация и координация'),
          sp('escalations', 'Отклонения и эскалации'),
        ],
      },
      {
        slug: 'quality',
        title: 'Управление качеством',
        description: 'Надзор за качеством.',
        subprocesses: [
          sp('quality-control', 'Контроль качества процессов и результата'),
          sp('nonconformity', 'Несоответствия и корректирующие действия'),
        ],
      },
      {
        slug: 'projects',
        title: 'Проекты и изменения',
        description: 'Проекты и управление изменениями.',
        subprocesses: [
          sp('pmo', 'Управление проектами (PMO)'),
          sp('change-management', 'Управление изменениями'),
        ],
      },
      {
        slug: 'improvement',
        title: 'Постоянное улучшение',
        description: 'Делать лучше со временем.',
        subprocesses: [
          sp('bottleneck-analysis', 'Анализ узких мест'),
          sp('best-practices', 'Тиражирование лучших практик'),
        ],
      },
    ],
  },
]

// Карта отраслей — теги горизонтальной фильтрации
export const INDUSTRIES: Record<string, string> = {
  universal: 'Универсально',
  manufacturing: 'Производство',
  services: 'Услуги',
  retail: 'Ритейл',
  'it-company': 'IT-компании',
  education: 'Образование',
  healthcare: 'Здравоохранение',
  fintech: 'Финтех',
  construction: 'Строительство',
}

// Цветовые классы Tailwind для каждого accent — литералы (иначе Tailwind v4 не включит).
// tint — мягкий пастельный двухцветный градиент; cardBorder — тонкая кромка; glow/glowSoft — свечение.
export const ACCENT_CLASSES: Record<
  string,
  {
    border: string
    bg: string
    bgSoft: string
    text: string
    textStrong: string
    ring: string
    hoverBg: string
    iconBg: string
    iconText: string
    tint: string
    cardBorder: string
    glow: string
    glowSoft: string
  }
> = {
  indigo: {
    border: 'border-l-indigo-400',
    bg: 'bg-indigo-500',
    bgSoft: 'bg-indigo-50',
    text: 'text-indigo-700',
    textStrong: 'text-indigo-900',
    ring: 'ring-indigo-200',
    hoverBg: 'hover:bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-700',
    tint: 'bg-gradient-to-br from-indigo-50 to-violet-100',
    cardBorder: 'border-indigo-200/70',
    glow: 'shadow-[0_18px_50px_-12px_rgba(99,102,241,0.55)] hover:shadow-[0_26px_64px_-10px_rgba(99,102,241,0.7)]',
    glowSoft: 'shadow-[0_10px_30px_-14px_rgba(99,102,241,0.35)] hover:shadow-[0_18px_44px_-12px_rgba(99,102,241,0.45)]',
  },
  sky: {
    border: 'border-l-sky-400',
    bg: 'bg-sky-500',
    bgSoft: 'bg-sky-50',
    text: 'text-sky-700',
    textStrong: 'text-sky-900',
    ring: 'ring-sky-200',
    hoverBg: 'hover:bg-sky-50',
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-700',
    tint: 'bg-gradient-to-br from-sky-50 to-cyan-100',
    cardBorder: 'border-sky-200/70',
    glow: 'shadow-[0_18px_50px_-12px_rgba(14,165,233,0.55)] hover:shadow-[0_26px_64px_-10px_rgba(14,165,233,0.7)]',
    glowSoft: 'shadow-[0_10px_30px_-14px_rgba(14,165,233,0.35)] hover:shadow-[0_18px_44px_-12px_rgba(14,165,233,0.45)]',
  },
  emerald: {
    border: 'border-l-emerald-400',
    bg: 'bg-emerald-500',
    bgSoft: 'bg-emerald-50',
    text: 'text-emerald-700',
    textStrong: 'text-emerald-900',
    ring: 'ring-emerald-200',
    hoverBg: 'hover:bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-700',
    tint: 'bg-gradient-to-br from-teal-50 to-emerald-100',
    cardBorder: 'border-emerald-200/70',
    glow: 'shadow-[0_18px_50px_-12px_rgba(16,185,129,0.50)] hover:shadow-[0_26px_64px_-10px_rgba(16,185,129,0.65)]',
    glowSoft: 'shadow-[0_10px_30px_-14px_rgba(16,185,129,0.32)] hover:shadow-[0_18px_44px_-12px_rgba(16,185,129,0.42)]',
  },
  violet: {
    border: 'border-l-violet-400',
    bg: 'bg-violet-500',
    bgSoft: 'bg-violet-50',
    text: 'text-violet-700',
    textStrong: 'text-violet-900',
    ring: 'ring-violet-200',
    hoverBg: 'hover:bg-violet-50',
    iconBg: 'bg-violet-100',
    iconText: 'text-violet-700',
    tint: 'bg-gradient-to-br from-violet-50 to-fuchsia-100',
    cardBorder: 'border-violet-200/70',
    glow: 'shadow-[0_18px_50px_-12px_rgba(139,92,246,0.55)] hover:shadow-[0_26px_64px_-10px_rgba(139,92,246,0.7)]',
    glowSoft: 'shadow-[0_10px_30px_-14px_rgba(139,92,246,0.35)] hover:shadow-[0_18px_44px_-12px_rgba(139,92,246,0.45)]',
  },
  amber: {
    border: 'border-l-amber-400',
    bg: 'bg-amber-500',
    bgSoft: 'bg-amber-50',
    text: 'text-amber-700',
    textStrong: 'text-amber-900',
    ring: 'ring-amber-200',
    hoverBg: 'hover:bg-amber-50',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-700',
    tint: 'bg-gradient-to-br from-amber-50 to-orange-100',
    cardBorder: 'border-amber-200/70',
    glow: 'shadow-[0_18px_50px_-12px_rgba(245,158,11,0.50)] hover:shadow-[0_26px_64px_-10px_rgba(245,158,11,0.65)]',
    glowSoft: 'shadow-[0_10px_30px_-14px_rgba(245,158,11,0.32)] hover:shadow-[0_18px_44px_-12px_rgba(245,158,11,0.42)]',
  },
}

export function getSubsystem(slug: string): SubsystemMeta | undefined {
  return TREE.find((s) => s.slug === slug)
}

export function getProcess(
  subsystemSlug: string,
  processSlug: string,
): { subsystem: SubsystemMeta; process: ProcessMeta } | undefined {
  const subsystem = getSubsystem(subsystemSlug)
  if (!subsystem) return undefined
  const process = subsystem.processes.find((p) => p.slug === processSlug)
  if (!process) return undefined
  return { subsystem, process }
}

export function getSubprocess(
  subsystemSlug: string,
  processSlug: string,
  subprocessSlug: string,
): { subsystem: SubsystemMeta; process: ProcessMeta; subprocess: SubprocessMeta } | undefined {
  const found = getProcess(subsystemSlug, processSlug)
  if (!found) return undefined
  const subprocess = found.process.subprocesses.find((s) => s.slug === subprocessSlug)
  if (!subprocess) return undefined
  return { ...found, subprocess }
}
