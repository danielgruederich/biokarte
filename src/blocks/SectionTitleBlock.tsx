'use client'

import type { SectionTitleData } from '@/lib/types'
import styles from '@/layouts/komi/komi.module.css'

interface Props {
  data: SectionTitleData
  blockId: string
  profileId: string
}

export function SectionTitleBlock({ data, blockId }: Props) {
  return (
    <div>
      <hr className={styles.sectionDivider} />
      <h2
        id={`section-${blockId}`}
        className={styles.sectionTitle}
      >
        {data.title}
      </h2>
    </div>
  )
}
