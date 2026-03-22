'use client'

import Image from 'next/image'
import type { Profile, SocialLink } from '@/lib/types'
import { getPlatform } from '@/lib/platforms'
import type { Template } from '@/lib/types'

interface HeroSectionProps {
  profile: Profile
  socialLinks: SocialLink[]
  template: Template
}

const nameSizeMap = {
  md: { fontSize: '1.75rem', letterSpacing: '-0.01em', textTransform: undefined as string | undefined },
  lg: { fontSize: '2.25rem', letterSpacing: '-0.01em', textTransform: undefined as string | undefined },
  xl: { fontSize: '4.5rem', letterSpacing: '-0.03em', textTransform: 'uppercase' as string | undefined },
} as const

export function HeroSection({ profile, socialLinks, template }: HeroSectionProps) {
  const visibleLinks = socialLinks.filter(l => l.is_visible)
  const { heroStyle, socialStyle, nameSize } = template.layout
  const nameStyles = nameSizeMap[nameSize]

  return (
    <div style={{ position: 'relative' }}>
      {/* Grain overlay */}
      {template.grain && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            opacity: 0.04,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: heroStyle === 'cover-photo' ? 0 : '2.5rem',
          paddingBottom: '0.75rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── COVER PHOTO (KOMI style) ── */}
        {heroStyle === 'cover-photo' ? (
          <div
            style={{
              width: '100%',
              padding: '0 1.25rem',
              paddingTop: '1.25rem',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                maxHeight: '380px',
                overflow: 'hidden',
                position: 'relative',
                borderRadius: '1rem',
              }}
            >
              {profile.avatar_url ? (
                <>
                  <Image
                    src={profile.avatar_url}
                    alt={profile.display_name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  {/* Bottom fade */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '35%',
                      background: `linear-gradient(to top, var(--bg) 0%, transparent 100%)`,
                      pointerEvents: 'none',
                    }}
                  />
                </>
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'var(--surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '5rem',
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                  }}
                >
                  {profile.display_name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── CIRCLE AVATAR ── */
          <div style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
            {profile.avatar_url ? (
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid var(--accent)',
                  marginBottom: '1rem',
                  flexShrink: 0,
                }}
              >
                <Image
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  width={96}
                  height={96}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: 'var(--surface)',
                  border: '3px solid var(--accent)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  flexShrink: 0,
                }}
              >
                {profile.display_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        )}

        {/* ── NAME ── */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: nameStyles.fontSize,
            fontWeight: 900,
            color: 'var(--text)',
            textAlign: 'center',
            lineHeight: 1.05,
            marginTop: heroStyle === 'cover-photo' ? '1rem' : 0,
            marginBottom: '0.625rem',
            letterSpacing: nameStyles.letterSpacing,
            textTransform: nameStyles.textTransform as React.CSSProperties['textTransform'],
            padding: '0 1.25rem',
          }}
        >
          {profile.display_name}
        </h1>

        {/* ── BIO ── */}
        {profile.bio && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--muted)',
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: '320px',
              marginBottom: '1rem',
              padding: '0 1.25rem',
            }}
          >
            {profile.bio}
          </p>
        )}

        {/* ── SOCIAL ICONS ── */}
        {visibleLinks.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: socialStyle === 'icons-only' ? '0.625rem' : '0.5rem',
              justifyContent: 'center',
              padding: '0 1.25rem',
            }}
          >
            {visibleLinks.map(link => {
              const platform = getPlatform(link.platform)

              if (socialStyle === 'icons-only') {
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={platform?.name ?? link.platform}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '1.75rem',
                      height: '1.75rem',
                      color: 'var(--text)',
                      textDecoration: 'none',
                      fontSize: '1.25rem',
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {platform?.icon ?? '🔗'}
                  </a>
                )
              }

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={platform?.name ?? link.platform}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '999px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <span style={{ fontSize: '1rem' }}>{platform?.icon ?? '🔗'}</span>
                  <span>{platform?.name ?? link.platform}</span>
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
