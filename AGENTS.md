# AGENTS.md

Репозиторий **Библиотеки ДИИП** — сценарии внедрения ИИ. Next.js static export,
прод: https://scenarios.diip-method.ru/

## Добавляешь сценарий?

Читай **[CONTRIBUTING.md](CONTRIBUTING.md)** — там полная инструкция: путь к файлу,
frontmatter со всеми полями, шаблон статьи, MDX-компоненты, полный пример и список
отраслей. Коротко: один `.mdx` в `site/content/<subsystem>/<process>/<slug>.mdx` + PR.
Узлы дерева (5 / 29 / 85) — в [`site/lib/tree.ts`](site/lib/tree.ts), `subprocess`
указывается в frontmatter.

## Меняешь код сайта?

Код в `site/` — Next.js 16 (`output: 'export'`), MDX, Tailwind CSS v4, Pagefind.
См. также [`site/AGENTS.md`](site/AGENTS.md). Перед PR: `cd site && npm run build`.

## Правила контента

Только реальный опыт (не гипотетические кейсы). Один сценарий = один узел дерева.
Блок «Где нужен человек» обязателен. У каждой статьи есть автор.
