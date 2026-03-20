'use client'

import { platforms, getPlatform } from '@/lib/platforms'
import { PlatformGrid } from './platform-grid'

interface PlatformsStepProps {
  selectedPlatforms: string[]
  links: Record<string, string>
  onTogglePlatform: (id: string) => void
  onLinkChange: (platformId: string, value: string) => void
}

export function PlatformsStep({
  selectedPlatforms,
  links,
  onTogglePlatform,
  onLinkChange,
}: PlatformsStepProps) {
  const hasSelection = selectedPlatforms.length > 0

  return (
    <div className="space-y-8">
      {/* Part A: Platform selection */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Auf welchen Plattformen bist du?</h2>
          <p className="text-zinc-400 mt-1">Wähle alle aus, die du nutzt.</p>
        </div>
        <PlatformGrid selected={selectedPlatforms} onToggle={onTogglePlatform} />
      </div>

      {/* Part B: Enter links (only shown after at least 1 platform selected) */}
      {hasSelection && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white">Füge deine Links hinzu</h2>
            <p className="text-zinc-400 mt-1 text-sm">Trage deine Nutzernamen ein.</p>
          </div>

          <div className="space-y-3">
            {selectedPlatforms.map((platformId) => {
              const platform = getPlatform(platformId)
              if (!platform) return null
              const value = links[platformId] ?? ''
              const isFilled = value.trim().length > 0

              return (
                <div key={platformId} className="flex items-center gap-3 bg-zinc-800 rounded-xl px-4 py-3">
                  <span className="text-xl shrink-0">{platform.icon}</span>
                  <input
                    type="text"
                    placeholder={platform.placeholder}
                    value={value}
                    onChange={(e) => onLinkChange(platformId, e.target.value)}
                    className="flex-1 bg-transparent text-white text-sm placeholder:text-zinc-500 outline-none"
                  />
                  {isFilled && (
                    <span className="text-teal-400 shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
