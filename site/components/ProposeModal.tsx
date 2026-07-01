'use client'

import { useState } from 'react'

const REPO_URL = 'https://github.com/DIdro/ai-scenarios'

export default function ProposeModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl leading-none"
          aria-label="Закрыть"
        >×</button>

        {sent ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-semibold mb-2">Спасибо!</h2>
            <p className="text-gray-500 text-sm">Сценарий отправлен на модерацию. Мы рассмотрим его в ближайшее время.</p>
            <button onClick={onClose} className="mt-6 px-5 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-1">Предложить сценарий</h2>
            <p className="text-gray-500 text-sm mb-6">Знаете кейс внедрения ИИ? Добавьте его — через GitHub или формой ниже.</p>

            {/* ── Путь 1: GitHub ── */}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="w-4 h-4">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Добавить через GitHub
            </a>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Оформите сценарий как MDX по шаблону в README и откройте pull request.
            </p>

            {/* ── разделитель ── */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs uppercase tracking-wide text-gray-400">или</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* ── Путь 2: форма ── */}
            <form
              action="https://formspree.io/f/xpwzorjb"
              method="POST"
              onSubmit={() => setSent(true)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название сценария *</label>
                <input
                  name="title"
                  required
                  placeholder="Например: ИИ для квалификации лидов в B2B"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Какую боль решает? *</label>
                <textarea
                  name="pain"
                  required
                  rows={2}
                  placeholder="Что болит у бизнеса без этого сценария?"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Как ИИ решает задачу? *</label>
                <textarea
                  name="solution"
                  required
                  rows={3}
                  placeholder="Опишите подход, инструменты, результат"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ваш контакт</label>
                <input
                  name="contact"
                  placeholder="Email или Telegram"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <input type="hidden" name="_replyto" value="gmdidro@gmail.com" />
              <input type="hidden" name="_subject" value="Новый сценарий на модерацию — Библиотека ДИИП" />

              <button
                type="submit"
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Отправить на модерацию
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
