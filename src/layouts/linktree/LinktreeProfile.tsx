'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import type { Profile, SocialLink, ContentBlock } from '@/lib/types'
import type { Template } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'
import { getPlatform } from '@/lib/platforms'
import { socialIconMap } from '@/components/icons/social-icons'
import styles from './linktree.module.css'

interface LinktreeProfileProps {
  profile: Profile
  socialLinks: SocialLink[]
  contentBlocks: ContentBlock[]
  template: Template
}

export function LinktreeProfile({ profile, socialLinks, contentBlocks, template }: LinktreeProfileProps) {
  const visibleLinks = socialLinks.filter(l => l.is_visible).slice(0, 7)
  const visibleBlocks = contentBlocks.filter(b => b.is_visible)

  // Button style from template
  const buttonShape = template.layout.cardRadius === '999px' ? styles.linkPill : styles.linkBox
  const buttonColor = template.colors.surface === '#ffffff' || template.colors.surface === 'rgba(255,255,255,0.8)'
    ? styles.linkWhite
    : styles.linkAccent

  useEffect(() => {
    trackEvent(profile.id, 'view')
  }, [profile.id])

  function handleLinkClick(blockId: string) {
    trackEvent(profile.id, 'click', blockId, 'content_block')
  }

  return (
    <div className={styles.page}>
      {/* Fullscreen background image */}
      {profile.avatar_url && (
        <div className={styles.bgImage}>
          <Image
            src={profile.avatar_url}
            alt=""
            fill
            className={styles.bgImageInner}
            priority
          />
        </div>
      )}

      {/* Dark overlay */}
      <div className={styles.bgOverlay} />

      {/* Content */}
      <div className={styles.column} style={{ '--accent': template.colors.accent } as React.CSSProperties}>
        {/* Avatar */}
        <div className={styles.avatar}>
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.display_name}
              fill
              className={styles.bgImageInner}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {profile.display_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className={styles.name}>{profile.display_name}</h1>

        {/* Bio */}
        {profile.bio && <p className={styles.bio}>{profile.bio}</p>}

        {/* Content Blocks */}
        <div className={styles.blocks}>
          {visibleBlocks.map(block => {
            switch (block.type) {
              case 'section_title': {
                const data = block.data as { title: string }
                return (
                  <p key={block.id} className={styles.sectionTitle}>
                    {data.title}
                  </p>
                )
              }

              case 'link': {
                const data = block.data as { title: string; url: string }
                return (
                  <a
                    key={block.id}
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.linkButton} ${buttonShape} ${buttonColor}`}
                    onClick={() => handleLinkClick(block.id)}
                  >
                    {data.title}
                  </a>
                )
              }

              case 'text': {
                const data = block.data as { text: string }
                return (
                  <p key={block.id} className={styles.textBlock}>
                    {data.text}
                  </p>
                )
              }

              case 'embed': {
                const data = block.data as { platform: string; url: string; title?: string }
                if (data.platform === 'youtube') {
                  const videoId = extractYouTubeId(data.url)
                  if (!videoId) return null
                  return (
                    <div key={block.id} className={styles.embedWrap}>
                      <div className={styles.embedYoutube}>
                        <iframe
                          className={styles.embedYoutubeIframe}
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={data.title ?? 'YouTube'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )
                }
                if (data.platform === 'soundcloud') {
                  return (
                    <div key={block.id} className={`${styles.embedWrap} ${styles.embedSoundcloud}`}>
                      <iframe
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(data.url)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                        title={data.title ?? 'SoundCloud'}
                      />
                    </div>
                  )
                }
                if (data.platform === 'spotify') {
                  const spotifyEmbedUrl = data.url.replace('open.spotify.com/', 'open.spotify.com/embed/')
                  return (
                    <div key={block.id} className={styles.embedWrap}>
                      <iframe
                        src={spotifyEmbedUrl}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        title={data.title ?? 'Spotify'}
                        style={{ borderRadius: '12px' }}
                      />
                    </div>
                  )
                }
                return null
              }

              default:
                return null
            }
          })}
        </div>

        {/* Social Icons */}
        {visibleLinks.length > 0 && (
          <div className={styles.socialIcons}>
            {visibleLinks.map(link => {
              const platform = getPlatform(link.platform)
              const IconComponent = socialIconMap[link.platform]
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={platform?.name ?? link.platform}
                  className={styles.socialIcon}
                  onClick={() => trackEvent(profile.id, 'click', link.id, 'social_link')}
                >
                  {IconComponent ? <IconComponent size={28} /> : (platform?.icon ?? '🔗')}
                </a>
              )
            })}
          </div>
        )}

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

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/)
  return match?.[1] ?? null
}
