'use client'

import { useState } from 'react'

export default function ProposeModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl leading-none"
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
            <p className="text-gray-500 text-sm mb-6">Знаете кейс внедрения ИИ? Опишите — добавим в библиотеку после проверки.</p>

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
                className="w-full bg-black text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
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
