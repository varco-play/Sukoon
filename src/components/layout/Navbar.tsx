'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { RESTAURANT_PHONE_DISPLAY } from '@/lib/config'

const NAV_LINKS = [
  { href: '/',            label: 'Главная' },
  { href: '/menu',        label: 'Меню' },
  { href: '/reservation', label: 'Бронирование' },
  { href: '/contact',     label: 'Контакты' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  // Lock body scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled && !mobileOpen
          ? 'bg-brand-green-dark/96 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-[60]" aria-label="Sukoon — на главную">
          <div className="relative h-10 w-10">
            <Image
              src="/logo/sukoon-logo.png"
              alt="Sukoon Cafe"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-brand-gold text-xl tracking-wide">Sukoon</span>
            <span className="font-sans text-brand-cream-muted text-[10px] tracking-[0.2em] uppercase -mt-0.5">cafe</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans text-sm tracking-widest uppercase transition-colors duration-200 py-1 ${
                  isActive
                    ? 'text-brand-gold'
                    : 'text-brand-cream-muted hover:text-brand-cream'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-brand-gold" />
                )}
              </Link>
            )
          })}
          <Link
            href="/reservation"
            className="font-sans text-xs tracking-widest uppercase border border-brand-gold text-brand-gold px-5 py-2.5 hover:bg-brand-gold hover:text-brand-green-dark transition-all duration-200"
          >
            Забронировать
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-cream p-2 relative z-[60]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>

    {/* Mobile full-screen overlay menu — sibling of header so `fixed` fills the
        viewport (header's backdrop-blur would otherwise trap it). Sits at z-40,
        below the header bar at z-50, keeping the logo + close button on top. */}
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          key="mobile-overlay"
          className="md:hidden fixed inset-0 z-40 bg-brand-green-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Botanical texture + radial gold glow */}
            <div className="absolute inset-0 bg-botanical opacity-[0.04] pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 35%, rgba(201,168,76,0.10) 0%, transparent 70%)' }}
            />

            <nav className="relative h-full flex flex-col items-center justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, delay: 0.12 + i * 0.07, ease: 'easeOut' }}
                  >
                    <Link
                      href={link.href}
                      className={`block font-display text-4xl py-3 transition-colors duration-200 ${
                        isActive ? 'text-brand-gold' : 'text-brand-cream hover:text-brand-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.12 + NAV_LINKS.length * 0.07, ease: 'easeOut' }}
                className="mt-8 flex flex-col items-center gap-6"
              >
                <Link
                  href="/reservation"
                  className="font-sans text-xs tracking-[0.25em] uppercase border border-brand-gold text-brand-gold px-10 py-4 hover:bg-brand-gold hover:text-brand-green-dark transition-all duration-200"
                >
                  Забронировать стол
                </Link>
                <a
                  href={`tel:${RESTAURANT_PHONE_DISPLAY.replace(/\s/g, '')}`}
                  className="font-sans text-sm text-brand-cream-muted tracking-wide hover:text-brand-gold transition-colors"
                >
                  {RESTAURANT_PHONE_DISPLAY}
                </a>
              </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
