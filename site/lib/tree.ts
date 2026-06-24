// Дерево категорий и подкатегорий — единственный источник правды для русских названий
// и порядка сортировки. Сами статьи берутся из файловой структуры content/.
//
// Таксономия ДИИП: процессная цепочка создания ценности, а не департаменты.
// Категория = подсистема, подкатегория = процесс. Сценарии лежат под подкатегорией.

export type SubcategoryMeta = {
  slug: string
  title: string
  description: string
}

export type CategoryMeta = {
  slug: string
  title: string
  description: string
  accent: string
  subcategories: SubcategoryMeta[]
}

export const TREE: CategoryMeta[] = [
  {
    slug: 'strategy',
    title: 'Стратегия и проектирование',
    description:
      'Замысел бизнеса: куда идём, что и как создаём — анализ рынка и проектирование процессов.',
    accent: 'indigo',
    subcategories: [
      {
        slug: 'market-analysis',
        title: 'Анализ рынка и конкурентов',
        description:
          'Мониторинг конкурентов, клиентов и рыночных трендов из открытых источников.',
      },
      {
        slug: 'process-design',
        title: 'Проектирование процессов',
        description: 'Описание и моделирование бизнес-процессов и регламентов.',
      },
    ],
  },
  {
    slug: 'value-stream',
    title: 'Создание и поставка ценности',
    description: 'Основной поток работы с клиентом — от предложения до сервиса.',
    accent: 'sky',
    subcategories: [
      {
        slug: 'sales',
        title: 'Продажи и предложения',
        description:
          'Подготовка коммерческих предложений, анализ запросов и тендеров.',
      },
      {
        slug: 'client-service',
        title: 'Сервис и работа с клиентами',
        description: 'Клиентские ИИ-сервисы, расчёты и отвȱеты 24/7.',
      },
    ],
  },
  {
    slug: 'data',
    title: 'Данные, аналитика и интеллект',
    description: 'Топливо для ИИ: аналитика, отчётность, ассистенты и базы знаний.',
    accent: 'emerald',
    subcategories: [
      {
        slug: 'analytics',
        title: 'Аналитика и отчётность',
        description:
          'Самообслуживание руководителей в работе с корпоративными данными.',
      },
      {
        slug: 'ai-knowledge',
        title: 'ИИ-ассистенты и базы знаний',
        description:
          'RAG-поиск и ассистенты поверх корпоративных документов и знаний.',
      },
    ],
  },
  {
    slug: 'support',
    title: 'Обеспечение',
    description: 'Поддерживающие функции бизнеса.',
    accent: 'violet',
    subcategories: [
      {
        slug: 'hr',
        title: 'Персонал (HR)',
        description: 'Подбор, адаптация и развитие сотрудников.',
      },
    ],
  },
  {
    slug: 'management',
    title: 'Управление и контроль',
    description:
      'Управление работой и качеством: координация, совещания, контроль.',
    accent: 'amber',
    subcategories: [
      {
        slug: 'operations',
        title: 'Оперативное управление и координация',
        description: 'Совещания, протоколы, планирование сроков и загрузки команды.',
      },
      {
        slug: 'quality',
        title: 'Контроль качества',
        description:
          'Оценка и контроль качества работы — например, разговоров с клиентами.',
      },
    ],
  },
]

// Карта отраслей — теги, по которым горизонтальная фильтрация
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

// Цветовые классы Tailwind для каждого accent — нужны как литералы,
// иначе Tailwind v4 не включит их в билд.
// tint — мягкий пастельный двухцветный градиент (тёмный текст); cardBorder — тонкая кромка.
// glow / glowSoft — цветное свечение.
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

export function getCategory(slug: string): CategoryMeta | undefined {
  return TREE.find((c) => c.slug === slug)
}

export function getSubcategory(
  categorySlug: string,
  subSlug: string,
): { category: CategoryMeta; subcategory: SubcategoryMeta } | undefined {
  const category = getCategory(categorySlug)
  if (!category) return undefined
  const subcategory = category.subcategories.find((s) => s.slug === subSlug)
  if (!subcategory) return undefined
  return { category, subcategory }
}
