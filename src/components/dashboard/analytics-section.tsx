'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type TimeRange = 'today' | '7d' | '30d'

interface AnalyticsSectionProps {
  userId: string
}

interface TopLink {
  target_id: string
  target_type: string
  count: number
}

export function AnalyticsSection({ userId }: AnalyticsSectionProps) {
  const [range, setRange] = useState<TimeRange>('7d')
  const [views, setViews] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [topLinks, setTopLinks] = useState<TopLink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      const supabase = createClient()

      const now = new Date()
      let since: string
      if (range === 'today') {
        since = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
      } else if (range === '7d') {
        since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      } else {
        since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }

      // Count views in range
      const { count: viewCount } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', userId)
        .eq('event_type', 'view')
        .gte('created_at', since)

      // Count clicks in range
      const { count: clickCount } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', userId)
        .eq('event_type', 'click')
        .gte('created_at', since)

      // Top clicked targets (fetch raw click events and aggregate client-side)
      const { data: clickEvents } = await supabase
        .from('analytics_events')
        .select('target_id, target_type')
        .eq('profile_id', userId)
        .eq('event_type', 'click')
        .gte('created_at', since)
        .not('target_id', 'is', null)
        .limit(500)

      // Aggregate top links
      const counts = new Map<string, { target_type: string; count: number }>()
      for (const evt of clickEvents ?? []) {
        if (!evt.target_id) continue
        const existing = counts.get(evt.target_id)
        if (existing) {
          existing.count++
        } else {
          counts.set(evt.target_id, { target_type: evt.target_type ?? '', count: 1 })
        }
      }
      const sorted = [...counts.entries()]
        .map(([id, val]) => ({ target_id: id, target_type: val.target_type, count: val.count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)

      setViews(viewCount ?? 0)
      setClicks(clickCount ?? 0)
      setTopLinks(sorted)
      setLoading(false)
    }

    fetchStats()
  }, [range, userId])

  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : null
  const rangeLabel = range === 'today' ? 'Heute' : range === '7d' ? '7 Tage' : '30 Tage'

  const ranges: { key: TimeRange; label: string }[] = [
    { key: 'today', label: 'Heute' },
    { key: '7d', label: '7 Tage' },
    { key: '30d', label: '30 Tage' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-300">Statistiken</h2>
        <div className="flex gap-1 bg-zinc-800 rounded-lg p-0.5">
          {ranges.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                range === r.key
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Aufrufe', value: views, desc: `${rangeLabel}` },
          { label: 'Klicks', value: clicks, desc: `${rangeLabel}` },
          { label: 'Klickrate', value: ctr !== null ? `${ctr} %` : '—', desc: 'Klicks / Aufrufe' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium text-zinc-400">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 w-16 bg-zinc-800 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold tracking-tight">
                  {typeof stat.value === 'number'
                    ? stat.value > 0 ? stat.value.toLocaleString('de-DE') : '—'
                    : stat.value}
                </p>
              )}
              <p className="text-xs text-zinc-500 mt-0.5">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top 3 clicked links */}
      {!loading && topLinks.length > 0 && (
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Top Klicks ({rangeLabel})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {topLinks.map((link, i) => (
              <div key={link.target_id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-zinc-500 text-xs w-4">{i + 1}.</span>
                  <span className="truncate text-zinc-300">
                    {link.target_type || 'Link'}
                  </span>
                </div>
                <span className="text-teal-400 font-medium shrink-0">{link.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
