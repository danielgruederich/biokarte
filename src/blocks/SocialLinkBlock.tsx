'use client'

import type { SocialLinkBlockData } from '@/lib/types'
import { getPlatform } from '@/lib/platforms'
import { trackEvent } from '@/lib/analytics'
import styles from '@/layouts/komi/komi.module.css'

interface Props {
  data: SocialLinkBlockData
  blockId: string
  profileId: string
}

export function SocialLinkBlock({ data, blockId, profileId }: Props) {
  const platform = getPlatform(data.platform)

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(profileId, 'click', blockId, 'social_link')}
      className={styles.linkCard}
    >
      <span style={{ fontSize: '1.25rem' }}>{platform?.icon ?? '🔗'}</span>
      <span className={styles.linkTitle}>
        {platform?.name ?? data.platform}
      </span>
      <span className={styles.linkChevron}>{data.username}</span>
    </a>
  )
}
