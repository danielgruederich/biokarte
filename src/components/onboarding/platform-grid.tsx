'use client'

import { platforms, type Platform } from '@/lib/platforms'

interface PlatformGridProps {
  selected: string[]
  onToggle: (platformId: string) => void
}

export function PlatformGrid({ selected, onToggle }: PlatformGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {platforms.map((platform: Platform) => {
        const isSelected = selected.includes(platform.id)
        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => onToggle(platform.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium ${
              isSelected
                ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500'
            }`}
          >
            <span className="text-2xl">{platform.icon}</span>
            <span className="text-xs leading-tight text-center">{platform.name}</span>
          </button>
        )
      })}
    </div>
  )
}
