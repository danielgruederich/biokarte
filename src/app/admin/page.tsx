import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Users, FileText, BarChart3, Settings } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { count: userCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: onlineCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'online')

  const { count: eventCount } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })

  const cards = [
    {
      title: 'User gesamt',
      value: userCount ?? 0,
      icon: Users,
      href: '/admin/users',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Profile online',
      value: onlineCount ?? 0,
      icon: FileText,
      href: '/admin/profiles',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Analytics Events',
      value: eventCount ?? 0,
      icon: BarChart3,
      href: '/admin',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Admin Übersicht</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {cards.map(card => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-400">{card.title}</span>
              <div className={`rounded-lg p-2 ${card.bg}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/users"
          className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition-colors"
        >
          <div className="rounded-lg p-3 bg-blue-500/10">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="font-semibold">User-Verwaltung</p>
            <p className="text-sm text-zinc-400">User ansehen, bestätigen, löschen</p>
          </div>
        </Link>

        <Link
          href="/admin/profiles"
          className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition-colors"
        >
          <div className="rounded-lg p-3 bg-green-500/10">
            <FileText className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="font-semibold">Profil-Verwaltung</p>
            <p className="text-sm text-zinc-400">Profile ansehen, bearbeiten, freigeben</p>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition-colors"
        >
          <div className="rounded-lg p-3 bg-violet-500/10">
            <Settings className="h-6 w-6 text-violet-400" />
          </div>
          <div>
            <p className="font-semibold">Einstellungen</p>
            <p className="text-sm text-zinc-400">Site-Konfiguration</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
