'use client'

import Image from 'next/image'
import type { BannerLinkBlockData } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'
import styles from '@/layouts/komi/komi.module.css'

interface Props {
  data: BannerLinkBlockData
  blockId: string
  profileId: string
}

export function BannerLinkBlock({ data, blockId, profileId }: Props) {
  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(profileId, 'click', blockId, 'banner_link')}
      className={styles.linkLarge}
    >
      <Image
        src={data.image_url}
        alt={data.title}
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className={styles.linkLargeGradient} />
      <span className={styles.linkLargeTitle}>{data.title}</span>
      {data.subtitle && (
        <span style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '0.75rem',
          color: 'rgba(255,255,255,0.8)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          zIndex: 2,
        }}>
          {data.subtitle}
        </span>
      )}
    </a>
  )
}
