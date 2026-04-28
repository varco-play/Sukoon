'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { LOGO_GOLD_FILTER } from '@/lib/config'

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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-green-dark/96 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Sukoon — на главную">
          <div className="relative h-10 w-10 overflow-hidden">
            <Image
              src="/logo/sukoon-logo.jpg"
              alt="Sukoon Cafe"
              fill
              sizes="40px"
              className="object-contain"
              style={{ filter: LOGO_GOLD_FILTER }}
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
          className="md:hidden text-brand-cream p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 border-t border-brand-gold/20' : 'max-h-0'
        } bg-brand-green-dark/98 backdrop-blur-md`}
      >
        <nav className="container-site py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
                className={`font-sans text-sm tracking-widest uppercase py-3 border-b border-brand-gold/10 transition-colors duration-200 ${
                  isActive ? 'text-brand-gold' : 'text-brand-cream-muted hover:text-brand-cream'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/reservation"
            className="mt-4 font-sans text-xs tracking-widest uppercase border border-brand-gold text-brand-gold px-5 py-3 text-center hover:bg-brand-gold hover:text-brand-green-dark transition-all duration-200"
          >
            Забронировать стол
          </Link>
        </nav>
      </div>
    </header>
  )
}
