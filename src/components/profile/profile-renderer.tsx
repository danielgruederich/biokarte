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
        // KOMI outer: dark with subtle warm glow bleeding from edges
        background: `
          radial-gradient(ellipse 800px 500px at 20% 25%, rgba(200,60,40,0.2) 0%, transparent 100%),
          radial-gradient(ellipse 600px 400px at 85% 20%, rgba(220,100,40,0.15) 0%, transparent 100%),
          radial-gradient(ellipse 500px 300px at 50% 60%, rgba(180,50,80,0.1) 0%, transparent 100%),
          ${template.colors.background}
        `,
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

      {/* KOMI: centered content column */}
      <div
        style={{
          maxWidth: '560px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          // Content column gets the actual template background
          background: template.backgroundCSS,
          minHeight: '100dvh',
          // Desktop: subtle shadow to separate from glow
          boxShadow: '0 0 80px rgba(0,0,0,0.3)',
        }}
      >
        {/* Hero */}
        <HeroSection
          profile={profile}
          socialLinks={socialLinks}
          template={template}
        />

        {/* Section navigation tabs */}
        <SectionNav contentBlocks={contentBlocks} />

        {/* Content blocks */}
        {visibleBlocks.length > 0 && (
          <div style={{ padding: '0 1rem 2rem' }}>
            {visibleBlocks.map(block => (
              <ContentBlockRenderer
                key={block.id}
                block={block}
                profileId={profile.id}
              />
            ))}
          </div>
        )}

        {/* KOMI-style footer */}
        <div
          style={{
            textAlign: 'center',
            padding: '2rem 1rem 2.5rem',
          }}
        >
          <a
            href="https://colognebeats.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--muted)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.02em',
            }}
          >
            powered by <span style={{ fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Colognebeats</span>
          </a>
        </div>
      </div>
    </div>
  )
}
