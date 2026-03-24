'use client'

import Image from 'next/image'
import type { MusicCardBlockData } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'
import styles from '@/layouts/komi/komi.module.css'

interface Props {
  data: MusicCardBlockData
  blockId: string
  profileId: string
}

export function MusicCardBlock({ data, blockId, profileId }: Props) {
  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(profileId, 'click', blockId, 'music_card')}
      className={styles.linkCard}
    >
      <div className={styles.linkThumb} style={{ width: '80px', height: '80px' }}>
        <Image
          src={data.cover_url}
          alt={data.title}
          width={80}
          height={80}
          className={styles.linkThumbImg}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--text)',
          margin: '0 0 0.25rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {data.title}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--muted)',
          margin: 0,
        }}>
          {data.artist}
        </p>
      </div>
    </a>
  )
}
