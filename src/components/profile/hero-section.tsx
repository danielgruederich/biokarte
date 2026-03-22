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
  xl: { fontSize: 'clamp(2.5rem, 12vw, 5rem)', letterSpacing: '-0.03em', textTransform: 'uppercase' as string | undefined },
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

      {heroStyle === 'cover-photo' ? (
        /* ── KOMI-STYLE: Photo with name overlapping the fade ── */
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Photo container */}
          <div
            style={{
              width: '100%',
              padding: '0 1.25rem',
              paddingTop: '0.75rem',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                maxHeight: '480px',
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
                  {/* Bottom fade — stronger, for name overlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '55%',
                      background: `linear-gradient(to top, var(--bg) 5%, rgba(0,0,0,0.6) 40%, transparent 100%)`,
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

              {/* Name OVER the photo fade — KOMI style */}
              <h1
                style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  left: '1rem',
                  right: '1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: nameStyles.fontSize,
                  fontWeight: 900,
                  color: 'var(--text)',
                  textAlign: 'center',
                  lineHeight: 1.0,
                  letterSpacing: nameStyles.letterSpacing,
                  textTransform: nameStyles.textTransform as React.CSSProperties['textTransform'],
                  margin: 0,
                  zIndex: 2,
                }}
              >
                {profile.display_name}
              </h1>
            </div>
          </div>

          {/* Bio, icons, below the photo */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0.75rem 1.25rem 0.5rem',
            }}
          >
            {profile.bio && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--muted)',
                  textAlign: 'center',
                  lineHeight: 1.5,
                  maxWidth: '320px',
                  marginBottom: '0.75rem',
                }}
              >
                {profile.bio}
              </p>
            )}

            {/* Social icons */}
            {visibleLinks.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  marginBottom: '0.25rem',
                }}
              >
                {visibleLinks.map(link => {
                  const platform = getPlatform(link.platform)
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
                        fontSize: '1.2rem',
                        transition: 'opacity 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      {platform?.icon ?? '🔗'}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── CIRCLE AVATAR style ── */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '2.5rem',
            paddingBottom: '0.75rem',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
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

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: nameSizeMap[nameSize].fontSize,
              fontWeight: 900,
              color: 'var(--text)',
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
              letterSpacing: nameSizeMap[nameSize].letterSpacing,
              textTransform: nameSizeMap[nameSize].textTransform as React.CSSProperties['textTransform'],
            }}
          >
            {profile.display_name}
          </h1>

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
              }}
            >
              {profile.bio}
            </p>
          )}

          {visibleLinks.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: socialStyle === 'icons-only' ? '0.625rem' : '0.5rem',
                justifyContent: 'center',
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
      )}
    </div>
  )
}
