import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { WizardShell } from '@/components/onboarding/wizard-shell'

export default async function OnboardingPage() {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Not logged in → go to login
  if (!user) {
    redirect('/login')
  }

  // Fetch profile to check onboarding status
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_complete, username')
    .eq('id', user.id)
    .single()

  // Already completed onboarding → skip to dashboard
  if (profile?.onboarding_complete) {
    redirect('/dashboard')
  }

  return (
    <WizardShell
      userId={user.id}
      username={profile?.username ?? user.email ?? 'user'}
    />
  )
}
