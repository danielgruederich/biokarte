'use client'

import type { Profile, SocialLink, ContentBlock, Template } from '@/lib/types'
import { ProfileRenderer } from '@/components/profile/profile-renderer'

interface PhonePreviewProps {
  profile: Profile
  socialLinks: SocialLink[]
  contentBlocks: ContentBlock[]
  template: Template
}

/**
 * iPhone-style phone frame with a scaled-down ProfileRenderer inside.
 * Used in the editor for live preview.
 */
export function PhonePreview({
  profile,
  socialLinks,
  contentBlocks,
  template,
}: PhonePreviewProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Phone frame container */}
      <div
        className="relative mx-auto"
        style={{ width: 280, height: 560 }}
      >
        {/* Phone outer shell */}
        <div
          className="absolute inset-0 rounded-[2.5rem] border-[4px] border-zinc-700 bg-zinc-800 overflow-hidden shadow-2xl"
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-zinc-800 rounded-b-xl z-10" />

          {/* Scaled preview: renders at 390x844 (iPhone 14), scaled down to fit frame */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '390px',
              height: '844px',
              transform: 'scale(0.7179)',
              transformOrigin: 'top left',
              overflow: 'auto',
              borderRadius: '2.5rem',
            }}
          >
            <ProfileRenderer
              profile={profile}
              socialLinks={socialLinks}
              contentBlocks={contentBlocks}
              template={template}
              previewMode
            />
          </div>
        </div>
      </div>
    </div>
  )
}
