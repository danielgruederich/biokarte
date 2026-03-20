import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/lib/types'
import { AppNav } from '@/components/app-nav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch user profile
  const { data: profileRaw } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const profile = profileRaw as unknown as Profile | null

  // Redirect to onboarding if not complete
  if (!profile || !profile.onboarding_complete) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <AppNav displayName={profile.display_name} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
