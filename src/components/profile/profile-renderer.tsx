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
        // KOMI-style: dark outer area with colored glow
        background: template.category === 'dark'
          ? `radial-gradient(ellipse 800px 500px at 20% 25%, rgba(200,60,40,0.25) 0%, transparent 100%), radial-gradient(ellipse 600px 400px at 85% 20%, rgba(220,100,40,0.2) 0%, transparent 100%), radial-gradient(ellipse 500px 300px at 50% 60%, rgba(180,50,80,0.12) 0%, transparent 100%), ${template.colors.background}`
          : template.backgroundCSS,
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        minHeight: '100dvh',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Background overlay pattern */}
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

      {/* Content column */}
      <div
        style={{
          maxWidth: '480px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          // KOMI: content sits on a slightly lighter surface
          background: template.category === 'dark' ? template.backgroundCSS : 'transparent',
          minHeight: '100dvh',
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
          <div style={{ padding: '0 1.25rem 2rem' }}>
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
            padding: '1.5rem 1.25rem 2rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          <a
            href="https://biokarte.de"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--muted)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
            }}
          >
            made with <span style={{ fontWeight: 700 }}>BioKarte</span>
          </a>
        </div>
      </div>
    </div>
  )
}
