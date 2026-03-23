'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import type { ContentBlock, SectionTitleData } from '@/lib/types'

interface SectionNavProps {
  contentBlocks: ContentBlock[]
}

export function SectionNav({ contentBlocks }: SectionNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Extract section titles from content blocks
  const sections = contentBlocks
    .filter(b => b.type === 'section_title' && b.is_visible)
    .sort((a, b) => a.position - b.position)
    .map(b => ({
      id: b.id,
      title: (b.data as SectionTitleData).title,
    }))

  // Track which section is currently active (first section by default)
  const [activeId, setActiveId] = useState<string | null>(
    sections.length > 0 ? sections[0].id : null
  )

  // Ignore observer updates briefly after a click-scroll
  const isClickScrolling = useRef(false)

  // Scroll-based active section detection via IntersectionObserver
  useEffect(() => {
    if (sections.length === 0) return

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Skip observer updates while click-scroll is in progress
      if (isClickScrolling.current) return

      for (const entry of entries) {
        if (entry.isIntersecting) {
          // Extract section id from element id (format: "section-<id>")
          const id = entry.target.id.replace('section-', '')
          setActiveId(id)
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    })

    // Observe all section elements
    for (const section of sections) {
      const el = document.getElementById(`section-${section.id}`)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sections.map(s => s.id).join(',')])

  const scrollToSection = useCallback((sectionId: string) => {
    // Set active immediately on click
    setActiveId(sectionId)

    // Prevent observer from overriding during smooth scroll
    isClickScrolling.current = true

    const el = document.getElementById(`section-${sectionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Re-enable observer after scroll animation finishes
    setTimeout(() => {
      isClickScrolling.current = false
    }, 600)
  }, [])

  if (sections.length === 0) return null

  return (
    <div
      ref={scrollRef}
      style={{
        display: 'flex',
        gap: '0.375rem',
        overflowX: 'auto',
        padding: '0.5rem 1rem',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <style>{`
        .section-nav::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="section-nav" style={{
        display: 'flex',
        gap: '0.375rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        width: '100%',
      }}>
        {sections.map(section => {
          const isActive = section.id === activeId
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              style={{
                whiteSpace: 'nowrap',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                border: isActive ? '1px solid transparent' : '1px solid var(--border)',
                background: isActive ? 'var(--surface)' : 'transparent',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.01em',
                cursor: 'pointer',
                transition: 'background 0.15s, opacity 0.15s, font-weight 0.15s, border 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--surface)'
                  e.currentTarget.style.opacity = '0.8'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.opacity = '1'
                }
              }}
            >
              {section.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
