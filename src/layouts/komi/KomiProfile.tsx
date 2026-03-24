'use client'

import { useEffect } from 'react'
import type { Profile, SocialLink, ContentBlock, Template } from '@/lib/types'
import { getTemplateCSSVars } from '@/lib/templates'
import { trackEvent } from '@/lib/analytics'
import { KomiHero } from './KomiHero'
import { KomiNav } from './KomiNav'
import { KomiBlocks } from './KomiBlocks'
import styles from './komi.module.css'

interface KomiProfileProps {
  profile: Profile
  socialLinks: SocialLink[]
  contentBlocks: ContentBlock[]
  template: Template
}

export function KomiProfile({ profile, socialLinks, contentBlocks, template }: KomiProfileProps) {
  const cssVars = getTemplateCSSVars(template)

  useEffect(() => {
    trackEvent(profile.id, 'view')
  }, [profile.id])

  return (
    <div
      className={styles.page}
      style={{
        ...(cssVars as React.CSSProperties),
        background: `
          radial-gradient(ellipse 800px 500px at 20% 25%, rgba(200,60,40,0.2) 0%, transparent 100%),
          radial-gradient(ellipse 600px 400px at 85% 20%, rgba(220,100,40,0.15) 0%, transparent 100%),
          radial-gradient(ellipse 500px 300px at 50% 60%, rgba(180,50,80,0.1) 0%, transparent 100%),
          ${template.colors.background}
        `,
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
      <div className={styles.column}>
        {/* Grain overlay — position: absolute, not fixed! */}
        {template.grain && (
          <div className={styles.grain} aria-hidden="true" />
        )}

        <KomiHero profile={profile} socialLinks={socialLinks} />
        <KomiNav contentBlocks={contentBlocks} />
        <KomiBlocks contentBlocks={contentBlocks} profileId={profile.id} />

        {/* Footer */}
        <div className={styles.footer}>
          <a
            href="https://colognebeats.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            powered by <span className={styles.footerBrand}>Colognebeats</span>
          </a>
        </div>
      </div>
    </div>
  )
}
