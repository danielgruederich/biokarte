'use client'

import type { BookingCtaBlockData, Profile } from '@/lib/types'
import { profileLabels } from '@/lib/profile-labels'
import { trackEvent } from '@/lib/analytics'

interface Props {
  data: BookingCtaBlockData
  blockId: string
  profileId: string
  profile?: Profile
}

export function BookingCtaBlock({ data, blockId, profileId, profile }: Props) {
  if (!profile) return null

  const labels = profileLabels[profile.profile_type] ?? profileLabels.musician
  const hasEmail = !!profile.booking_email
  const hasText = !!profile.booking_text

  // Nothing configured — hint only for owner (not rendered on public page)
  if (!hasEmail && !hasText) return null

  const handleClick = () => {
    trackEvent(profileId, 'click', blockId, 'booking_cta')
  }

  // Card style: show text prominently
  if (data.style === 'card') {
    return (
      <div
        className="rounded-xl p-4 space-y-3"
        style={{
          backgroundColor: 'var(--color-surface, #1a1a1a)',
          borderColor: 'var(--color-border, #333)',
          border: '1px solid var(--color-border, #333)',
        }}
      >
        {hasText && (
          <p className="text-sm" style={{ color: 'var(--color-text, #fff)' }}>
            {profile.booking_text}
          </p>
        )}
        {hasEmail && (
          <a
            href={`mailto:${profile.booking_email}`}
            onClick={handleClick}
            className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--color-accent, #14b8a6)',
              color: 'var(--color-background, #000)',
            }}
          >
            {labels.bookingCta}
          </a>
        )}
      </div>
    )
  }

  // Default: button style
  return (
    <div className="space-y-2">
      {hasEmail && (
        <a
          href={`mailto:${profile.booking_email}`}
          onClick={handleClick}
          className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: 'var(--color-accent, #14b8a6)',
            color: 'var(--color-background, #000)',
          }}
        >
          {labels.bookingCta}
        </a>
      )}
      {hasText && (
        <p className="text-xs text-center opacity-60" style={{ color: 'var(--color-muted, #aaa)' }}>
          {profile.booking_text}
        </p>
      )}
    </div>
  )
}
