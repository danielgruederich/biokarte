'use client'

import { useRef } from 'react'
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

  if (sections.length === 0) return null

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            style={{
              whiteSpace: 'nowrap',
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              cursor: 'pointer',
              transition: 'background 0.15s, opacity 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--surface)'
              e.currentTarget.style.opacity = '0.8'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.opacity = '1'
            }}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  )
}
