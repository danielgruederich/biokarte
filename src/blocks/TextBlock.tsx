'use client'

import type { TextBlockData } from '@/lib/types'
import styles from '@/layouts/komi/komi.module.css'

interface Props {
  data: TextBlockData
  blockId: string
  profileId: string
}

export function TextBlock({ data }: Props) {
  return (
    <p className={styles.textBlock}>{data.text}</p>
  )
}
