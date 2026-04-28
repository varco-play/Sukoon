'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { GALLERY_IMAGES } from '@/lib/mockData'

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section bg-brand-green relative overflow-hidden">
      <div className="absolute inset-0 bg-botanical opacity-[0.04] pointer-events-none" />

      <div className="container-site relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Атмосфера"
            heading="Галерея"
            centered
          />
        </motion.div>

        {/* CSS columns masonry — no JS masonry, no hydration issues */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.figure
              key={img.id}
              className="break-inside-avoid overflow-hidden relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
            >
              <div className="relative w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={i % 3 === 0 ? 800 : i % 2 === 0 ? 500 : 650}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <figcaption className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="font-display text-brand-cream text-sm italic">{img.alt}</span>
                </figcaption>
                {/* Gold corner accent on hover */}
                <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-brand-gold/0 group-hover:border-brand-gold/70 transition-all duration-300" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-brand-gold/0 group-hover:border-brand-gold/70 transition-all duration-300" />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
