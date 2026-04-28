import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sukoon Cafe — Ташкент',
  description:
    'Место, где время замедляется. Изысканная авторская кухня и атмосфера спокойствия в самом сердце Ташкента.',
  keywords: ['ресторан', 'кафе', 'Ташкент', 'Sukoon', 'бронирование', 'авторская кухня'],
  openGraph: {
    title: 'Sukoon Cafe — Ташкент',
    description: 'Место, где время замедляется.',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1C3A1C',
              color: '#F5F0E8',
              border: '1px solid rgba(201,168,76,0.4)',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#C9A84C', secondary: '#1C3A1C' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#1C3A1C' },
            },
          }}
        />
      </body>
    </html>
  )
}
