# AI Scenarios Library

> Библиотека сценариев внедрения ИИ — часть методологии AIM (AI Transformation Methodology).

Воспроизводимые сценарии применения искусственного интеллекта в компаниях
среднего бизнеса. Только реальный опыт — каждая статья описывает то, что мы
или партнёры действительно внедряли.

**Live:** https://ai-scenarios.vercel.app/

## Структура репозитория

```
ai-scenarios/
└── site/                              # Next.js 16 приложение (всё живёт здесь)
    ├── content/                       # Статьи-сценарии (MDX)
    │   ├── operations/
    │   │   ├── meetings/
    │   │   ├── planning/
    │   │   ├── reporting/
    │   │   ├── knowledge/
    │   │   └── process-design/
    │   ├── sales/
    │   │   ├── proposals/
    │   │   └── market-intelligence/
    │   └── hr/
    │       ├── recruiting/
    │       ├── onboarding/
    │       └── development/
    ├── lib/
    │   ├── tree.ts                    # Дерево категорий и подкатегорий
    │   └── content.ts                 # Парсер статей из content/
    ├── components/
    │   ├── article/                   # MDX-компоненты статьи
    │   ├── CategoryTree.tsx
    │   ├── ArticleCard.tsx
    │   ├── SearchBox.tsx              # Pagefind поиск
    │   └── ...
    └── app/
        ├── page.tsx                   # Главная
        ├── [...slug]/page.tsx         # Категория / подкатегория / статья
        └── industries/[tag]/page.tsx  # Срез по отрасли
```

## Принципы

- Это **библиотека сценариев**, не база данных. Каждый сценарий — статья
  в свободной структуре.
- Только реальный опыт — никаких сгенерированных или гипотетических сценариев.
- Дерево категорий + теги отраслей. Без фасетных фильтров.
- У каждой статьи есть автор. Сценарии партнёров публикуются с указанием
  команды-исполнителя.

## Как добавить сценарий

1. Выберите категорию и подкатегорию из дерева в [site/lib/tree.ts](site/lib/tree.ts).
   Если подкатегории не хватает — добавьте её туда же.
2. Создайте файл `site/content/<категория>/<подкатегория>/<slug>.mdx`.
3. Заполните frontmatter:

```yaml
---
title: Краткое название сценария
description: Одно предложение про то, что это даёт бизнесу
author: Имя Фамилия
authorOrg: Компания / команда
publishedAt: 2026-04-09
industries: [universal, manufacturing, services]
forWhom: [роль-1, роль-2]
---
```

4. Напишите статью. Доступны MDX-компоненты:

```mdx
<Steps>
1. **Шаг.** Описание.
2. **Следующий шаг.** Описание.
</Steps>

<ToolList>
  <Tool name="Claude" role="Что делает в сценарии" />
  <Tool name="n8n" role="Оркестрация" />
</ToolList>

<Stat label="Метрика" before="Было" after="Стало" />

<Callout type="warning" title="Опционально">
  Важное предупреждение или нюанс.
</Callout>
```

5. Запустите `npm run build` локально — проверит, что всё собирается.
6. Откройте PR.

## Локальная разработка

```bash
cd site
npm install
npm run dev      # http://localhost:3000
npm run build    # статический билд + индекс Pagefind в site/out/
```

Требуется Node.js >= 20.9.0.

## Деплой

Vercel автоматически собирает на push в `main`. Root Directory = `site`,
вывод — статический (`output: 'export'`), Pagefind-индекс генерируется
в `site/out/pagefind/`.

---

*Часть методологии AIM*
