'use client'

import Image from 'next/image'
import type { LinkBlockData } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'
import styles from '@/layouts/komi/komi.module.css'

interface Props {
  data: LinkBlockData
  blockId: string
  profileId: string
}

export function LinkBlock({ data, blockId, profileId }: Props) {
  const handleClick = () => {
    trackEvent(profileId, 'click', blockId, 'link')
  }

  // thumbnail_large: 16:9 card with play button
  if (data.layout === 'thumbnail_large') {
    return (
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={styles.linkLarge}
      >
        {data.thumbnail_url && (
          <Image src={data.thumbnail_url} alt="" fill className={styles.heroImage} />
        )}
        <div className={styles.linkLargeGradient} />
        <span className={styles.linkLargeTitle}>{data.title}</span>
        <div className={styles.playButton}>
          <svg width="20" height="22" viewBox="0 0 18 20" fill="none">
            <path d="M2 1.5L16 10L2 18.5V1.5Z" fill="rgba(255,255,255,0.9)" />
          </svg>
        </div>
      </a>
    )
  }

  // Default: text or thumbnail_left card
  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={styles.linkCard}
    >
      {data.thumbnail_url && data.layout === 'thumbnail_left' && (
        <div className={styles.linkThumb}>
          <Image
            src={data.thumbnail_url}
            alt=""
            width={120}
            height={120}
            className={styles.linkThumbImg}
          />
        </div>
      )}
      <span className={styles.linkTitle}>{data.title}</span>
      <span className={styles.linkChevron}>›</span>
    </a>
  )
}
