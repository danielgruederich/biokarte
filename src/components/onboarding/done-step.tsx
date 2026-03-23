'use client'

import { ProfileRenderer } from '@/components/profile/profile-renderer'
import { getTemplate } from '@/lib/templates'
import { getPlatform, buildPlatformUrl } from '@/lib/platforms'
import type { Profile, SocialLink } from '@/lib/types'

interface DoneStepProps {
  userId: string
  username: string
  displayName: string
  bio: string
  avatarUrl: string | null
  templateId: string
  links: Record<string, string>
}

export function DoneStep({
  userId,
  username,
  displayName,
  bio,
  avatarUrl,
  templateId,
  links,
}: DoneStepProps) {
  const template = getTemplate(templateId)

  // Build a preview profile object
  const previewProfile: Profile = {
    id: userId,
    username,
    display_name: displayName || username,
    bio: bio || null,
    avatar_url: avatarUrl,
    logo_url: null,
    template_id: templateId,
    status: 'online',
    role: 'user',
    onboarding_complete: false,
    created_at: new Date().toISOString(),
  }

  // Build social links from entered links
  const previewSocialLinks: SocialLink[] = Object.entries(links)
    .filter(([, value]) => value.trim().length > 0)
    .map(([platformId, value], index) => {
      const platform = getPlatform(platformId)
      const url = platform ? buildPlatformUrl(platform, value) : value
      return {
        id: `preview-${platformId}`,
        user_id: userId,
        platform: platformId,
        username: value,
        url,
        position: index,
        is_visible: true,
      }
    })

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Sieht gut aus!</h2>
        <p className="text-zinc-400 mt-1">Deine Seite ist bereit.</p>
      </div>

      {/* Phone mockup preview */}
      <div className="flex justify-center">
        <div className="relative w-[220px]">
          {/* Phone frame */}
          <div className="border-4 border-zinc-600 rounded-[2.5rem] overflow-hidden shadow-2xl bg-black">
            {/* Notch */}
            <div className="bg-black flex justify-center pt-2 pb-1">
              <div className="w-16 h-4 bg-zinc-800 rounded-full" />
            </div>
            {/* Screen content — scrollable preview */}
            <div className="overflow-hidden" style={{ height: '420px' }}>
              <div
                style={{
                  transform: 'scale(0.55)',
                  transformOrigin: 'top left',
                  width: '181.8%',
                  pointerEvents: 'none',
                }}
              >
                <ProfileRenderer
                  profile={previewProfile}
                  socialLinks={previewSocialLinks}
                  contentBlocks={[]}
                  template={template}
                  previewMode
                />
              </div>
            </div>
            {/* Home bar */}
            <div className="bg-black flex justify-center py-2">
              <div className="w-20 h-1 bg-zinc-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
