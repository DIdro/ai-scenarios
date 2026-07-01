## Сценарий

<!-- Кратко: что за сценарий и где внедряли -->

## Чеклист

- [ ] Файл: `site/content/<subsystem>/<process>/<slug>.mdx`
- [ ] frontmatter заполнен: `title`, `description`, `author`, `publishedAt`, `subprocess`, `industries`, `forWhom`
- [ ] `subprocess` — валидный slug из [`site/lib/tree.ts`](../blob/main/site/lib/tree.ts)
- [ ] `industries` — из списка в README
- [ ] Формат: Что болит (+Stat) → Что делает ИИ (+Steps) → Что компания получает → Где нужен человек
- [ ] Реальный опыт (не гипотетический)
- [ ] `cd site && npm run build` проходит локально
