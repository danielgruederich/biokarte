import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatsCardsProps {
  userId: string
}

export async function StatsCards({ userId }: StatsCardsProps) {
  const supabase = await createClient()

  // Count views
  const { count: views } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('event_type', 'view')

  // Count clicks
  const { count: clicks } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('event_type', 'click')

  const viewCount = views ?? 0
  const clickCount = clicks ?? 0
  const ctr = viewCount > 0 ? ((clickCount / viewCount) * 100).toFixed(1) : null

  const stats = [
    {
      label: 'Aufrufe',
      value: viewCount > 0 ? viewCount.toLocaleString('de-DE') : '—',
      description: 'Seitenaufrufe gesamt',
    },
    {
      label: 'Klicks',
      value: clickCount > 0 ? clickCount.toLocaleString('de-DE') : '—',
      description: 'Link-Klicks gesamt',
    },
    {
      label: 'Klickrate',
      value: ctr !== null ? `${ctr} %` : '—',
      description: 'Klicks pro Aufruf',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(stat => (
        <Card key={stat.label} className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-zinc-400">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
