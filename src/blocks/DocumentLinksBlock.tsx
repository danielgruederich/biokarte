'use client'

import Image from 'next/image'
import type { DocumentLinksBlockData } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'

interface Props {
  data: DocumentLinksBlockData
  blockId: string
  profileId: string
}

export function DocumentLinksBlock({ data, blockId, profileId }: Props) {
  if (!data.items || data.items.length === 0) return null

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface, #1a1a1a)',
        border: '1px solid var(--color-border, #333)',
      }}
    >
      {data.title && (
        <div className="px-4 pt-3 pb-1">
          <p className="text-xs uppercase tracking-wider font-medium opacity-50">{data.title}</p>
        </div>
      )}
      <div className="divide-y" style={{ borderColor: 'var(--color-border, #333)' }}>
        {data.items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(profileId, 'click', blockId, 'document')}
            className="flex items-center gap-3 px-4 py-3 transition-opacity hover:opacity-80"
          >
            {item.thumbnail_url ? (
              <Image
                src={item.thumbnail_url}
                alt=""
                width={40}
                height={40}
                className="rounded object-cover"
              />
            ) : (
              <span className="w-10 h-10 rounded flex items-center justify-center text-lg"
                style={{ backgroundColor: 'var(--color-background, #0a0a0a)' }}
              >
                📄
              </span>
            )}
            <span className="flex-1 text-sm font-medium" style={{ color: 'var(--color-text, #fff)' }}>
              {item.label}
            </span>
            <span className="text-sm opacity-40">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}
