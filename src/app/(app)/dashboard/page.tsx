import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/lib/types'
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

  const liveUrl = `bio.colognebeats.com/${profile.username}`

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
      {/* Welcome */}
      <h1 className="text-xl font-semibold">
        Willkommen zurück, {profile.display_name}
      </h1>

      {/* Stats */}
      <StatsCards userId={user.id} />

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: page link */}
        <div className="lg:w-[60%] space-y-4">
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Meine Seite</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-sm text-zinc-400">Deine Seite ist live unter:</p>
              <a
                href={`https://${liveUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 underline"
              >
                {liveUrl}
              </a>

              <Link
                href="/edit"
                className={buttonVariants({ className: 'w-full max-w-[280px]' })}
              >
                Bearbeiten
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right: top links */}
        <div className="lg:w-[40%] space-y-4">
          <TopLinks userId={user.id} />
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
