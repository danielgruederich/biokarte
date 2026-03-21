'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import type { Profile } from '@/lib/types'
import { ExternalLink } from 'lucide-react'

export default function AdminProfilesPage() {
  const supabase = createClient()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<{ display_name: string; bio: string; template_id: string }>({
    display_name: '',
    bio: '',
    template_id: '',
  })

  useEffect(() => {
    loadProfiles()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function loadProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Profile konnten nicht geladen werden.')
      setLoading(false)
      return
    }

    setProfiles(data ?? [])
    setLoading(false)
  }

  function startEdit(profile: Profile) {
    setEditingId(profile.id)
    setEditValues({
      display_name: profile.display_name,
      bio: profile.bio ?? '',
      template_id: profile.template_id,
    })
  }

  async function saveEdit(profile: Profile) {
    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: editValues.display_name,
        bio: editValues.bio || null,
        template_id: editValues.template_id,
      })
      .eq('id', profile.id)

    if (error) {
      toast.error('Profil konnte nicht gespeichert werden.')
      return
    }

    setProfiles(prev =>
      prev.map(p =>
        p.id === profile.id
          ? { ...p, display_name: editValues.display_name, bio: editValues.bio || null, template_id: editValues.template_id }
          : p
      )
    )
    setEditingId(null)
    toast.success('Profil gespeichert.')
  }

  async function toggleOnboarding(profile: Profile) {
    const newValue = !profile.onboarding_complete
    const { error } = await supabase
      .from('profiles')
      .update({ onboarding_complete: newValue })
      .eq('id', profile.id)

    if (error) {
      toast.error('Onboarding-Status konnte nicht geändert werden.')
      return
    }

    setProfiles(prev => prev.map(p => p.id === profile.id ? { ...p, onboarding_complete: newValue } : p))
    toast.success(newValue ? 'Onboarding als abgeschlossen markiert.' : 'Onboarding zurückgesetzt.')
  }

  const filtered = profiles.filter(p =>
    p.username.toLowerCase().includes(search.toLowerCase()) ||
    p.display_name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-zinc-400">Laden…</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Profil-Verwaltung</h1>
        <Input
          placeholder="Suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 max-w-xs"
        />
      </div>

      <div className="space-y-3">
        {filtered.map(profile => (
          <Card key={profile.id} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              {editingId === profile.id ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">Anzeigename</label>
                      <Input
                        value={editValues.display_name}
                        onChange={e => setEditValues(v => ({ ...v, display_name: e.target.value }))}
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">Bio</label>
                      <Input
                        value={editValues.bio}
                        onChange={e => setEditValues(v => ({ ...v, bio: e.target.value }))}
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">Template ID</label>
                      <Input
                        value={editValues.template_id}
                        onChange={e => setEditValues(v => ({ ...v, template_id: e.target.value }))}
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => saveEdit(profile)}
                      className="bg-white text-black hover:bg-zinc-200"
                    >
                      Speichern
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingId(null)}
                      className="text-zinc-400 hover:text-white"
                    >
                      Abbrechen
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-medium shrink-0">
                      {(profile.display_name || profile.username).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-white">{profile.display_name || profile.username}</span>
                        <span className="text-sm text-zinc-500">@{profile.username}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <Badge
                          variant="outline"
                          className={profile.status === 'online'
                            ? 'border-green-800 text-green-400 text-xs'
                            : 'border-zinc-700 text-zinc-500 text-xs'}
                        >
                          {profile.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={profile.onboarding_complete
                            ? 'border-blue-800 text-blue-400 text-xs'
                            : 'border-amber-800 text-amber-400 text-xs'}
                        >
                          {profile.onboarding_complete ? 'Onboarding ✓' : 'Onboarding offen'}
                        </Badge>
                        <span className="text-xs text-zinc-500">
                          Template: {profile.template_id}
                        </span>
                        {profile.bio && (
                          <span className="text-xs text-zinc-500 truncate max-w-[200px]">
                            Bio: {profile.bio}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`/${profile.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Ansehen
                    </a>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(profile)}
                      className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
                    >
                      Bearbeiten
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleOnboarding(profile)}
                      className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
                    >
                      {profile.onboarding_complete ? 'Onboarding reset' : 'Onboarding ✓'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <p className="text-zinc-500 text-center py-8">Keine Profile gefunden.</p>
        )}
      </div>
    </div>
  )
}
