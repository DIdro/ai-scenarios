// Дерево категорий и подкатегорий — единственный источник правды для русских названий
// и порядка сортировки. Сами статьи берутся из файловой структуры content/.

export type SubcategoryMeta = {
  slug: string
  title: string
  description: string
}

export type CategoryMeta = {
  slug: string
  title: string
  description: string
  accent: string // Tailwind color name (для левой полоски, hover, hero)
  icon: string
  subcategories: SubcategoryMeta[]
}

export const TREE: CategoryMeta[] = [
  {
    slug: 'operations',
    title: 'Операции',
    description: 'Автоматизация ежедневной операционной работы: совещания, документация, планирование, отчётность.',
    accent: 'amber',
    icon: '⚙️',
    subcategories: [
      {
        slug: 'meetings',
        title: 'Совещания и коммуникации',
        description: 'Превращение устной коммуникации в структурированные артефакты.',
      },
      {
        slug: 'planning',
        title: 'Планирование и расписание',
        description: 'Управление сроками, загрузкой команд, распределением ресурсов.',
      },
      {
        slug: 'reporting',
        title: 'Отчётность и аналитика',
        description: 'Самообслуживание руководителей в работе с корпоративными данными.',
      },
      {
        slug: 'knowledge',
        title: 'Документация и знания',
        description: 'Доступ сотрудников к корпоративной документации через естественный язык.',
      },
      {
        slug: 'process-design',
        title: 'Описание процессов',
        description: 'Превращение интервью и устных описаний в формальные модели процессов.',
      },
    ],
  },
  {
    slug: 'sales',
    title: 'Продажи',
    description: 'Подготовка предложений, разведка рынка, работа с клиентами.',
    accent: 'emerald',
    icon: '📈',
    subcategories: [
      {
        slug: 'proposals',
        title: 'Подготовка предложений',
        description: 'Анализ запросов клиентов, оценка трудоёмкости, генерация коммерческих предложений.',
      },
      {
        slug: 'market-intelligence',
        title: 'Маркетинговая разведка',
        description: 'Мониторинг конкурентов, отрасли и публичных источников.',
      },
    ],
  },
  {
    slug: 'hr',
    title: 'Управление персоналом',
    description: 'Подбор, адаптация, развитие сотрудников.',
    accent: 'rose',
    icon: '👥',
    subcategories: [
      {
        slug: 'recruiting',
        title: 'Подбор персонала',
        description: 'Работа с резюме, скрининг, нормализация данных кандидатов.',
      },
      {
        slug: 'onboarding',
        title: 'Адаптация',
        description: 'Сопровождение новых сотрудников в первые недели работы.',
      },
      {
        slug: 'development',
        title: 'Развитие сотрудников',
        description: 'Индивидуальные планы развития, обучение, оценка компетенций.',
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
export const ACCENT_CLASSES: Record<
  string,
  {
    border: string
    bg: string
    bgSoft: string
    text: string
    ring: string
    hoverBg: string
  }
> = {
  amber: {
    border: 'border-l-amber-400',
    bg: 'bg-amber-500',
    bgSoft: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-amber-200',
    hoverBg: 'hover:bg-amber-50',
  },
  emerald: {
    border: 'border-l-emerald-400',
    bg: 'bg-emerald-500',
    bgSoft: 'bg-emerald-50',
    text: 'text-emerald-700',
    ring: 'ring-emerald-200',
    hoverBg: 'hover:bg-emerald-50',
  },
  rose: {
    border: 'border-l-rose-400',
    bg: 'bg-rose-500',
    bgSoft: 'bg-rose-50',
    text: 'text-rose-700',
    ring: 'ring-rose-200',
    hoverBg: 'hover:bg-rose-50',
  },
  blue: {
    border: 'border-l-blue-400',
    bg: 'bg-blue-500',
    bgSoft: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-blue-200',
    hoverBg: 'hover:bg-blue-50',
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
