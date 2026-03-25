'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { ProfileTypeStep } from './profile-type-step'
import { TemplateStep } from './template-step'
import { PlatformsStep } from './platforms-step'
import { ProfileStep } from './profile-step'
import { DoneStep } from './done-step'
import { getPlatform, buildPlatformUrl } from '@/lib/platforms'
import type { ProfileType } from '@/lib/profile-labels'

const TOTAL_STEPS = 5 // steps 2-6 (registration is step 1 and already done)

interface WizardShellProps {
  userId: string
  username: string
}

export function WizardShell({ userId, username }: WizardShellProps) {
  const router = useRouter()

  // Step index: 0 = template, 1 = platforms, 2 = profile, 3 = done
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Wizard state
  const [profileType, setProfileType] = useState<ProfileType>('musician')
  const [templateId, setTemplateId] = useState('dark-komi')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [links, setLinks] = useState<Record<string, string>>({})
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const progressPercent = ((step + 1) / TOTAL_STEPS) * 100

  function handleTogglePlatform(id: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  function handleLinkChange(platformId: string, value: string) {
    setLinks((prev) => ({ ...prev, [platformId]: value }))
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1)
  }

  function handleNext() {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1)
  }

  async function handleFinish() {
    setSaving(true)
    setSaveError(null)

    const supabase = createClient()

    // 1. Update profile row
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        profile_type: profileType,
        template_id: templateId,
        display_name: displayName || username,
        bio: bio || null,
        avatar_url: avatarUrl,
        onboarding_complete: true,
      })
      .eq('id', userId)

    if (profileError) {
      setSaveError('Fehler beim Speichern. Bitte versuche es erneut.')
      setSaving(false)
      return
    }

    // 2. Insert social links for each filled platform
    const filledLinks = Object.entries(links).filter(([, v]) => v.trim().length > 0)

    if (filledLinks.length > 0) {
      const rows = filledLinks.map(([platformId, value], index) => {
        const platform = getPlatform(platformId)
        const url = platform ? buildPlatformUrl(platform, value) : value
        return {
          user_id: userId,
          platform: platformId,
          username: value,
          url,
          position: index,
          is_visible: true,
        }
      })

      const { error: linksError } = await supabase.from('social_links').insert(rows)
      if (linksError) {
        setSaveError('Links konnten nicht gespeichert werden.')
        setSaving(false)
        return
      }
    }

    // 3. Redirect to dashboard
    router.push('/dashboard')
  }

  const stepLabels = ['Profiltyp', 'Template', 'Plattformen', 'Profil', 'Fertig']
  const isLastStep = step === TOTAL_STEPS - 1

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-zinc-800">
        <div
          className="h-full bg-teal-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step counter */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
          Schritt {step + 2} von {TOTAL_STEPS + 1}
        </span>
        <span className="text-xs text-zinc-500">{stepLabels[step]}</span>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 pb-6 overflow-y-auto">
        {step === 0 && (
          <ProfileTypeStep selectedType={profileType} onSelect={setProfileType} />
        )}
        {step === 1 && (
          <TemplateStep selectedId={templateId} onSelect={setTemplateId} />
        )}
        {step === 2 && (
          <PlatformsStep
            selectedPlatforms={selectedPlatforms}
            links={links}
            onTogglePlatform={handleTogglePlatform}
            onLinkChange={handleLinkChange}
          />
        )}
        {step === 3 && (
          <ProfileStep
            userId={userId}
            displayName={displayName}
            bio={bio}
            avatarUrl={avatarUrl}
            onDisplayNameChange={setDisplayName}
            onBioChange={setBio}
            onAvatarUrlChange={setAvatarUrl}
          />
        )}
        {step === 4 && (
          <DoneStep
            userId={userId}
            username={username}
            displayName={displayName}
            bio={bio}
            avatarUrl={avatarUrl}
            templateId={templateId}
            profileType={profileType}
            links={links}
          />
        )}
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur border-t border-zinc-800 px-5 py-4 space-y-3">
        {saveError && (
          <p className="text-sm text-red-400 text-center">{saveError}</p>
        )}

        {isLastStep ? (
          <Button
            onClick={handleFinish}
            disabled={saving}
            className="w-full bg-teal-500 hover:bg-teal-400 text-black font-semibold h-12 rounded-xl"
          >
            {saving ? 'Wird gespeichert…' : 'Weiter bauen'}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="w-full bg-teal-500 hover:bg-teal-400 text-black font-semibold h-12 rounded-xl"
          >
            Weiter
          </Button>
        )}

        {step > 0 && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="w-full text-zinc-400 hover:text-white h-10"
          >
            Zurück
          </Button>
        )}
      </div>
    </div>
  )
}
