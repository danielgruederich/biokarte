'use client'

import type { ContentBlock, Profile } from '@/lib/types'
import { renderBlock } from '@/blocks/registry'
import styles from './komi.module.css'

interface KomiBlocksProps {
  contentBlocks: ContentBlock[]
  profileId: string
  profile?: Profile
}

export function KomiBlocks({ contentBlocks, profileId, profile }: KomiBlocksProps) {
  const visibleBlocks = contentBlocks
    .filter(b => b.is_visible)
    .sort((a, b) => a.position - b.position)

  if (visibleBlocks.length === 0) return null

  return (
    <div className={styles.blocks}>
      {visibleBlocks.map(block => (
        <div key={block.id}>
          {renderBlock(block.type, block.data, block.id, profileId, profile)}
        </div>
      ))}
    </div>
  )
}
