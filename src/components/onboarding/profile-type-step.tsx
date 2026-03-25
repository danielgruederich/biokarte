'use client'

import { profileLabels, type ProfileType } from '@/lib/profile-labels'

interface ProfileTypeStepProps {
  selectedType: ProfileType
  onSelect: (type: ProfileType) => void
}

const profileTypes: ProfileType[] = ['musician', 'business', 'collective']

export function ProfileTypeStep({ selectedType, onSelect }: ProfileTypeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl font-bold text-white italic"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Was beschreibt dich am besten?
        </h2>
        <p className="text-zinc-400 mt-1 text-sm">
          Dein Profiltyp bestimmt die passenden Labels und Plattformen.
        </p>
      </div>

      <div className="space-y-3">
        {profileTypes.map((type) => {
          const label = profileLabels[type]
          const isSelected = selectedType === type

          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'border-teal-500 bg-teal-500/10'
                  : 'border-zinc-700 bg-zinc-900 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{label.typeIcon}</span>
                <div>
                  <p className={`font-semibold ${isSelected ? 'text-teal-400' : 'text-white'}`}>
                    {label.typeName}
                  </p>
                  <p className="text-sm text-zinc-400">{label.typeDescription}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
