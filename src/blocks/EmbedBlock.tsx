'use client'

import type { EmbedBlockData } from '@/lib/types'
import styles from '@/layouts/komi/komi.module.css'

interface Props {
  data: EmbedBlockData
  blockId: string
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
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23c8ff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`
}

function getSpotifyEmbedUrl(url: string): string | null {
  const match = url.match(/spotify\.com\/(artist|track|album|playlist)\/([^?]+)/)
  if (match) return `https://open.spotify.com/embed/${match[1]}/${match[2]}`
  return null
}

export function EmbedBlock({ data }: Props) {
  if (data.platform === 'youtube') {
    const embedUrl = getYouTubeEmbedUrl(data.url)
    if (!embedUrl) return null
    return (
      <div className={styles.embedYoutube}>
        <iframe
          src={embedUrl}
          title={data.title ?? 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.embedYoutubeIframe}
        />
      </div>
    )
  }

  if (data.platform === 'soundcloud') {
    return (
      <div className={styles.embedSoundcloud}>
        <iframe
          width="100%"
          height="300"
          src={getSoundCloudEmbedUrl(data.url)}
          title={data.title ?? 'SoundCloud'}
          allow="autoplay"
          style={{ border: 'none', display: 'block', width: '100%', height: '300px' }}
        />
      </div>
    )
  }

  if (data.platform === 'spotify') {
    const embedUrl = getSpotifyEmbedUrl(data.url)
    if (!embedUrl) return null
    return (
      <div className={styles.embedSpotify}>
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
