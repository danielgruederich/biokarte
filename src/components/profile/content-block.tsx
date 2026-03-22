'use client'

import Image from 'next/image'
import type { ContentBlock, LinkBlockData, TextBlockData, SectionTitleData, EmbedBlockData, SocialLinkBlockData } from '@/lib/types'
import { getPlatform } from '@/lib/platforms'
import { trackEvent } from '@/lib/analytics'

interface ContentBlockProps {
  block: ContentBlock
  profileId: string
}

function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return `https://www.youtube.com/embed/${match[1]}`
  }
  return null
}

function getSoundCloudEmbedUrl(url: string): string {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23c8ff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`
}

function getSpotifyEmbedUrl(url: string): string | null {
  // Convert open.spotify.com/artist/xxx to embed URL
  const match = url.match(/spotify\.com\/(artist|track|album|playlist)\/([^?]+)/)
  if (match) return `https://open.spotify.com/embed/${match[1]}/${match[2]}`
  return null
}

export function ContentBlockRenderer({ block, profileId }: ContentBlockProps) {
  if (!block.is_visible) return null

  const handleClick = async (targetId: string, targetType: string) => {
    await trackEvent(profileId, 'click', targetId, targetType)
  }

  switch (block.type) {
    case 'link': {
      const data = block.data as LinkBlockData
      return (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick(block.id, 'link')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
            flexDirection: data.layout === 'thumbnail_large' ? 'column' : 'row',
            padding: data.layout === 'thumbnail_large' ? 0 : '0.625rem',
            borderRadius: 'var(--card-radius, 0.875rem)',
            background: 'var(--surface)',
            border: 'none',
            color: 'var(--text)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.15s, transform 0.15s',
            overflow: 'hidden',
            marginBottom: '0.75rem',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.85'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {/* KOMI-style: square thumbnail left, 72px */}
          {data.thumbnail_url && data.layout === 'thumbnail_left' && (
            <div style={{ width: '72px', height: '72px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
              <Image src={data.thumbnail_url} alt="" width={72} height={72} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
          )}
          {/* Full-width thumbnail on top */}
          {data.thumbnail_url && data.layout === 'thumbnail_large' && (
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
              <Image src={data.thumbnail_url} alt="" width={600} height={200} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
          )}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text)',
              flex: 1,
              textAlign: data.layout === 'thumbnail_large' ? 'center' : 'left',
              padding: data.layout === 'thumbnail_large' ? '0.75rem' : 0,
            }}
          >
            {data.title}
          </span>
          {data.layout !== 'thumbnail_large' && (
            <span style={{ color: 'var(--muted)', fontSize: '0.875rem', flexShrink: 0, paddingRight: '0.25rem' }}>›</span>
          )}
        </a>
      )
    }

    case 'social_link': {
      const data = block.data as SocialLinkBlockData
      const platform = getPlatform(data.platform)
      return (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick(block.id, 'social_link')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: 'var(--card-radius, 0.875rem)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.15s',
            marginBottom: '0.75rem',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <span style={{ fontSize: '1.25rem' }}>{platform?.icon ?? '🔗'}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 500 }}>
            {platform?.name ?? data.platform}
          </span>
          <span style={{ color: 'var(--muted)', fontSize: '0.875rem', marginLeft: 'auto' }}>
            {data.username}
          </span>
        </a>
      )
    }

    case 'text': {
      const data = block.data as TextBlockData
      return (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--muted)',
            lineHeight: 1.65,
            marginBottom: '1rem',
            whiteSpace: 'pre-wrap',
          }}
        >
          {data.text}
        </p>
      )
    }

    case 'section_title': {
      const data = block.data as SectionTitleData
      return (
        <h2
          id={`section-${block.id}`}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginTop: '2rem',
            marginBottom: '0.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border)',
            letterSpacing: '-0.01em',
            scrollMarginTop: '1rem',
          }}
        >
          {data.title}
        </h2>
      )
    }

    case 'embed': {
      const data = block.data as EmbedBlockData

      if (data.platform === 'youtube') {
        const embedUrl = getYouTubeEmbedUrl(data.url)
        if (!embedUrl) return null
        return (
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: 'var(--card-radius, 0.875rem)',
              marginBottom: '0.75rem',
              border: '1px solid var(--border)',
            }}
          >
            <iframe
              src={embedUrl}
              title={data.title ?? 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            />
          </div>
        )
      }

      if (data.platform === 'soundcloud') {
        return (
          <div style={{ marginBottom: '0.75rem', borderRadius: 'var(--card-radius, 0.875rem)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <iframe
              width="100%"
              height="166"
              src={getSoundCloudEmbedUrl(data.url)}
              title={data.title ?? 'SoundCloud'}
              allow="autoplay"
              style={{ border: 0, display: 'block' }}
            />
          </div>
        )
      }

      if (data.platform === 'spotify') {
        const embedUrl = getSpotifyEmbedUrl(data.url)
        if (!embedUrl) return null
        return (
          <div style={{ marginBottom: '0.75rem', borderRadius: 'var(--card-radius, 0.875rem)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <iframe
              src={embedUrl}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={data.title ?? 'Spotify'}
              style={{ border: 0, display: 'block' }}
            />
          </div>
        )
      }

      return null
    }

    default:
      return null
  }
}
