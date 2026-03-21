import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminSettingsPage() {
  const supabase = await createClient()

  const { count: userCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: onlineCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'online')

  const { count: onboardingComplete } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('onboarding_complete', true)

  const { count: adminCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'admin')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Einstellungen</h1>

      <div className="space-y-6">
        {/* Site Info */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-100">Site-Konfiguration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Site Name</p>
                <p className="text-white">BioKarte</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Domain</p>
                <p className="text-white">bio.colognebeats.com</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Vercel URL</p>
                <p className="text-white">biokarte.vercel.app</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Supabase Projekt</p>
                <p className="text-white font-mono text-sm">pfvcojknyqtulhilzyde</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-100">Statistiken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-zinc-800 p-4">
                <p className="text-xs text-zinc-400 mb-1">User gesamt</p>
                <p className="text-2xl font-bold">{userCount ?? 0}</p>
              </div>
              <div className="rounded-lg bg-zinc-800 p-4">
                <p className="text-xs text-zinc-400 mb-1">Profile online</p>
                <p className="text-2xl font-bold text-green-400">{onlineCount ?? 0}</p>
              </div>
              <div className="rounded-lg bg-zinc-800 p-4">
                <p className="text-xs text-zinc-400 mb-1">Onboarding fertig</p>
                <p className="text-2xl font-bold text-blue-400">{onboardingComplete ?? 0}</p>
              </div>
              <div className="rounded-lg bg-zinc-800 p-4">
                <p className="text-xs text-zinc-400 mb-1">Admins</p>
                <p className="text-2xl font-bold text-red-400">{adminCount ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-100">Externe Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="https://supabase.com/dashboard/project/pfvcojknyqtulhilzyde"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
            >
              → Supabase Dashboard
            </a>
            <a
              href="https://vercel.com/danielgruederichs-projects/biokarte"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
            >
              → Vercel Dashboard
            </a>
            <a
              href="https://github.com/danielgruederich/biokarte"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
            >
              → GitHub Repository
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
