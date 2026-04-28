'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import GoldDivider from './GoldDivider'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  subheading?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const textAlign = centered ? 'text-center' : 'text-left'
  const headingColor = light ? 'text-brand-green-dark' : 'text-brand-cream'
  const subColor = light ? 'text-brand-green' : 'text-brand-cream-muted'

  return (
    <motion.div
      ref={ref}
      className={`mb-12 ${textAlign}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {eyebrow && (
        <p className="font-sans text-brand-gold text-xs tracking-[0.3em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 ${headingColor}`}>
        {heading}
      </h2>
      <GoldDivider ornament={centered} className={centered ? 'max-w-xs mx-auto mt-4 mb-4' : 'mt-4 mb-4 max-w-xs'} />
      {subheading && (
        <p className={`font-sans text-base md:text-lg leading-relaxed max-w-2xl ${subColor} ${centered ? 'mx-auto' : ''}`}>
          {subheading}
        </p>
      )}
    </motion.div>
  )
}
