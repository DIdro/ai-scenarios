import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: 'Библиотека ДИИП — сценарии внедрения ИИ',
  description:
    'Воспроизводимые сценарии применения ИИ в среднем бизнесе. Только реальный опыт.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans text-gray-900 antialiased">
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110506469', 'ym');

              ym(110506469, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/110506469" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        {/* Глобальное переливающееся свечение за всем контентом */}
        <div className="site-aura" aria-hidden="true">
          <span />
        </div>
        <Header />
        {children}
        <footer className="border-t border-gray-200/70 mt-24 py-10">
          <div className="max-w-5xl mx-auto px-4 text-xs text-gray-400 flex flex-wrap gap-3">
            <span>Библиотека ДИИП — часть методологии «Дизайн ИИ-Преобразований»</span>
            <span className="text-gray-300">·</span>
            <span>Только проверенные сценарии</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
