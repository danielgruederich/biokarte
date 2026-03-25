'use client'

import type { ProfileTagsBlockData, Profile } from '@/lib/types'
import { profileLabels } from '@/lib/profile-labels'

interface Props {
  data: ProfileTagsBlockData
  blockId: string
  profileId: string
  profile?: Profile
}

export function ProfileTagsBlock({ data, profile }: Props) {
  if (!profile) return null

  const labels = profileLabels[profile.profile_type] ?? profileLabels.musician
  const showGenres = data.showGenres !== false
  const showLocations = data.showLocations !== false

  const hasGenres = showGenres && profile.genres && profile.genres.length > 0
  const hasLocations = showLocations && profile.locations && profile.locations.length > 0

  if (!hasGenres && !hasLocations) return null

  return (
    <div className="space-y-3">
      {hasGenres && (
        <div>
          <p className="text-xs uppercase tracking-wider opacity-50 mb-1.5">{labels.genres}</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.genres.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: 'var(--color-accent, #14b8a6)',
                  color: 'var(--color-background, #000)',
                  opacity: 0.9,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      {hasLocations && (
        <div>
          <p className="text-xs uppercase tracking-wider opacity-50 mb-1.5">{labels.locations}</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.locations.map((loc) => (
              <span
                key={loc}
                className="px-3 py-1 text-xs rounded-full border"
                style={{
                  borderColor: 'var(--color-border, #333)',
                  color: 'var(--color-text, #fff)',
                }}
              >
                {loc}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
