'use client'

import { useEffect } from 'react'
import type { Profile, SocialLink, ContentBlock } from '@/lib/types'
import type { Template } from '@/lib/types'
import { getTemplateCSSVars } from '@/lib/templates'
import { HeroSection } from './hero-section'
import { SectionNav } from './section-nav'
import { ContentBlockRenderer } from './content-block'
import { trackEvent } from '@/lib/analytics'

interface ProfileRendererProps {
  profile: Profile
  socialLinks: SocialLink[]
  contentBlocks: ContentBlock[]
  template: Template
  /** When true, disables analytics tracking (used in editor preview) */
  previewMode?: boolean
}

export function ProfileRenderer({
  profile,
  socialLinks,
  contentBlocks,
  template,
  previewMode = false,
}: ProfileRendererProps) {
  const cssVars = getTemplateCSSVars(template)

  // Track page view once on mount (skip in preview)
  useEffect(() => {
    if (!previewMode) {
      trackEvent(profile.id, 'view')
    }
  }, [profile.id, previewMode])

  const visibleBlocks = contentBlocks
    .filter(b => b.is_visible)
    .sort((a, b) => a.position - b.position)

  return (
    <div
      style={{
        ...(cssVars as React.CSSProperties),
        background: template.backgroundCSS,
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        minHeight: '100dvh',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Background overlay pattern (starfield, monogram, etc.) */}
      {template.backgroundOverlay && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: template.backgroundOverlay,
            backgroundRepeat: 'repeat',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Centered content column, max 640px */}
      <div
        style={{
          maxWidth: '640px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Hero */}
        <HeroSection
          profile={profile}
          socialLinks={socialLinks}
          template={template}
        />

        {/* KOMI-style section navigation tabs */}
        <SectionNav contentBlocks={contentBlocks} />

        {/* Content blocks */}
        {visibleBlocks.length > 0 && (
          <div
            style={{
              padding: '0 1.25rem 3rem',
            }}
          >
            {visibleBlocks.map(block => (
              <ContentBlockRenderer
                key={block.id}
                block={block}
                profileId={profile.id}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            paddingBottom: '2rem',
            color: 'var(--muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
          }}
        >
          made with{' '}
          <a
            href="https://biokarte.de"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            BioKarte
          </a>
        </div>
      </div>
    </div>
  )
}
