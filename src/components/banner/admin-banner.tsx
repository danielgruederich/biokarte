'use client'

import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

interface AdminBannerProps {
  banner: {
    id: string
    title: string
    description: string | null
    image_url: string | null
    link_url: string | null
    position: 'top' | 'bottom'
  }
  profileId: string
}

export function AdminBanner({ banner, profileId }: AdminBannerProps) {
  const handleClick = () => {
    trackEvent(profileId, 'click', banner.id, 'banner')
  }

  const content = (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {banner.image_url && (
        <Image
          src={banner.image_url}
          alt=""
          width={40}
          height={40}
          className="rounded-lg object-cover shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: 'var(--color-text, #fff)' }}>
          {banner.title}
        </p>
        {banner.description && (
          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-muted, #999)' }}>
            {banner.description}
          </p>
        )}
      </div>
      <span className="text-[10px] uppercase tracking-wider opacity-30 shrink-0">Anzeige</span>
    </div>
  )

  if (banner.link_url) {
    return (
      <a
        href={banner.link_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block transition-opacity hover:opacity-80"
      >
        {content}
      </a>
    )
  }

  return content
}
