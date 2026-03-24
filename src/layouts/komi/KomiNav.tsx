'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import type { ContentBlock, SectionTitleData } from '@/lib/types'
import styles from './komi.module.css'

interface KomiNavProps {
  contentBlocks: ContentBlock[]
}

export function KomiNav({ contentBlocks }: KomiNavProps) {
  const sections = contentBlocks
    .filter(b => b.type === 'section_title' && b.is_visible)
    .sort((a, b) => a.position - b.position)
    .map(b => ({
      id: b.id,
      title: (b.data as SectionTitleData).title,
    }))

  const [activeId, setActiveId] = useState<string | null>(
    sections.length > 0 ? sections[0].id : null
  )

  // Prevent observer override during click-scroll
  const isClickScrolling = useRef(false)

  useEffect(() => {
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('section-', '')
            setActiveId(id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    for (const section of sections) {
      const el = document.getElementById(`section-${section.id}`)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.map(s => s.id).join(',')])

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveId(sectionId)
    isClickScrolling.current = true

    const el = document.getElementById(`section-${sectionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    setTimeout(() => {
      isClickScrolling.current = false
    }, 600)
  }, [])

  if (sections.length === 0) return null

  return (
    <nav className={styles.nav}>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`${styles.navButton} ${section.id === activeId ? styles.navButtonActive : ''}`}
        >
          {section.title}
        </button>
      ))}
    </nav>
  )
}
