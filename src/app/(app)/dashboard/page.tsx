import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getTemplate } from '@/lib/templates'
import type { Profile, SocialLink, ContentBlock } from '@/lib/types'
import { ProfileRenderer } from '@/components/profile/profile-renderer'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { TopLinks } from '@/components/dashboard/top-links'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch profile
  const { data: profileRaw, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profileRaw) redirect('/onboarding')
  const profile = profileRaw as unknown as Profile

  // Fetch social links and content blocks for preview
  const { data: socialLinksRaw } = await supabase
    .from('social_links')
    .select('*')
    .eq('user_id', user.id)
    .order('position', { ascending: true })

  const { data: contentBlocksRaw } = await supabase
    .from('content_blocks')
    .select('*')
    .eq('user_id', user.id)
    .order('position', { ascending: true })

  const socialLinks = (socialLinksRaw ?? []) as unknown as SocialLink[]
  const contentBlocks = (contentBlocksRaw ?? []) as unknown as ContentBlock[]
  const template = getTemplate(profile.template_id)

  const liveUrl = `bio.colognebeats.com/${profile.username}`

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
      {/* Welcome */}
      <h1 className="text-xl font-semibold">
        Willkommen zurück, {profile.display_name}
      </h1>

      {/* Stats */}
      <Suspense fallback={<StatsSkeletonRow />}>
        <StatsCards userId={user.id} />
      </Suspense>

      {/* Main content: mobile stacked, desktop two-column */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: phone preview (60% on desktop) */}
        <div className="lg:w-[60%] space-y-4">
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Meine Seite</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              {/* Phone mockup frame */}
              <div
                className="relative mx-auto"
                style={{ width: 220, height: 440 }}
              >
                {/* Phone outer shell */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] border-[4px] border-zinc-700 bg-zinc-800 overflow-hidden shadow-xl"
                  style={{ borderRadius: '2.5rem' }}
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-zinc-800 rounded-b-xl z-10" />

                  {/* Scaled preview */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '390px',
                      height: '844px',
                      transform: 'scale(0.5641)',
                      transformOrigin: 'top left',
                      overflow: 'hidden',
                      borderRadius: '2.5rem',
                    }}
                  >
                    <ProfileRenderer
                      profile={profile}
                      socialLinks={socialLinks}
                      contentBlocks={contentBlocks}
                      template={template}
                      previewMode={true}
                    />
                  </div>
                </div>
              </div>

              {/* Live URL */}
              <p className="text-xs text-zinc-500 text-center">{liveUrl}</p>

              {/* Edit button */}
              <Link
                href="/edit"
                className={buttonVariants({ size: 'sm', className: 'w-full max-w-[220px]' })}
              >
                Bearbeiten
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right: settings + top links (40% on desktop) */}
        <div className="lg:w-[40%] space-y-4">
          {/* Page settings card */}
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Seiten-Einstellungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Weiterleitung</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Direkt zu einem Link weiterleiten</p>
                </div>
                {/* Toggle placeholder — no functionality yet */}
                <button
                  type="button"
                  role="switch"
                  aria-checked="false"
                  disabled
                  className="relative inline-flex h-5 w-9 items-center rounded-full bg-zinc-700 opacity-50 cursor-not-allowed transition-colors"
                >
                  <span className="inline-block size-3 translate-x-1 rounded-full bg-zinc-400 transition-transform" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Top links */}
          <Suspense fallback={<TopLinksSkeletonCard />}>
            <TopLinks userId={user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function StatsSkeletonRow() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[0, 1, 2].map(i => (
        <div key={i} className="rounded-xl bg-zinc-900 border border-zinc-800 h-24 animate-pulse" />
      ))}
    </div>
  )
}

function TopLinksSkeletonCard() {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 h-40 animate-pulse" />
  )
}
