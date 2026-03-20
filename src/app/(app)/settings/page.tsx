'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getTemplate, templates } from '@/lib/templates'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import type { Profile } from '@/lib/types'

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  // Inline edit state for username
  const [editingUsername, setEditingUsername] = useState(false)
  const [usernameValue, setUsernameValue] = useState('')
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [savingUsername, setSavingUsername] = useState(false)

  // Inline edit state for display name
  const [editingDisplayName, setEditingDisplayName] = useState(false)
  const [displayNameValue, setDisplayNameValue] = useState('')
  const [savingDisplayName, setSavingDisplayName] = useState(false)

  // Status toggle state
  const [statusLoading, setStatusLoading] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error || !data) {
        toast.error('Profil konnte nicht geladen werden.')
        setLoading(false)
        return
      }

      setProfile(data)
      setUsernameValue(data.username)
      setDisplayNameValue(data.display_name)
      setLoading(false)
    }

    loadProfile()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Validate username: lowercase, alphanumeric + hyphens, 3-30 chars
  function validateUsername(value: string): string | null {
    if (value.length < 3) return 'Mindestens 3 Zeichen erforderlich.'
    if (value.length > 30) return 'Maximal 30 Zeichen erlaubt.'
    if (!/^[a-z0-9-]+$/.test(value)) return 'Nur Kleinbuchstaben, Zahlen und Bindestriche erlaubt.'
    return null
  }

  async function saveUsername() {
    if (!profile) return
    const err = validateUsername(usernameValue)
    if (err) {
      setUsernameError(err)
      return
    }
    setUsernameError(null)
    setSavingUsername(true)

    const { error } = await supabase
      .from('profiles')
      .update({ username: usernameValue })
      .eq('id', profile.id)

    setSavingUsername(false)

    if (error) {
      if (error.code === '23505') {
        setUsernameError('Dieser Benutzername ist bereits vergeben.')
      } else {
        toast.error('Fehler beim Speichern des Benutzernamens.')
      }
      return
    }

    setProfile({ ...profile, username: usernameValue })
    setEditingUsername(false)
    toast.success('Benutzername gespeichert.')
  }

  async function saveDisplayName() {
    if (!profile) return
    setSavingDisplayName(true)

    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayNameValue })
      .eq('id', profile.id)

    setSavingDisplayName(false)

    if (error) {
      toast.error('Fehler beim Speichern des Anzeigenamens.')
      return
    }

    setProfile({ ...profile, display_name: displayNameValue })
    setEditingDisplayName(false)
    toast.success('Anzeigename gespeichert.')
  }

  async function toggleStatus() {
    if (!profile) return
    setStatusLoading(true)
    const newStatus: 'online' | 'offline' = profile.status === 'online' ? 'offline' : 'online'

    const { error } = await supabase
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', profile.id)

    setStatusLoading(false)

    if (error) {
      toast.error('Status konnte nicht geändert werden.')
      return
    }

    setProfile({ ...profile, status: newStatus })
    toast.success(newStatus === 'online' ? 'Profil ist jetzt online.' : 'Profil ist jetzt offline.')
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400 text-sm">Laden…</p>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  const currentTemplate = getTemplate(profile.template_id)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <h1 className="text-xl font-semibold">Einstellungen</h1>

        {/* Section 1: Profil-Details */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-100">Profil-Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Username */}
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs uppercase tracking-wide">Benutzername</Label>
              {editingUsername ? (
                <div className="space-y-2">
                  <Input
                    value={usernameValue}
                    onChange={(e) => {
                      setUsernameValue(e.target.value)
                      setUsernameError(null)
                    }}
                    placeholder="dein-name"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                  {usernameError && (
                    <p className="text-xs text-red-400">{usernameError}</p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={saveUsername}
                      disabled={savingUsername}
                      className="bg-white text-black hover:bg-zinc-200"
                    >
                      {savingUsername ? 'Speichern…' : 'Speichern'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingUsername(false)
                        setUsernameValue(profile.username)
                        setUsernameError(null)
                      }}
                      className="text-zinc-400 hover:text-white"
                    >
                      Abbrechen
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-white">{profile.username}</span>
                  <button
                    onClick={() => setEditingUsername(true)}
                    className="text-xs text-zinc-400 hover:text-white underline underline-offset-2"
                  >
                    Bearbeiten
                  </button>
                </div>
              )}
            </div>

            <Separator className="bg-zinc-800" />

            {/* Display Name */}
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs uppercase tracking-wide">Anzeigename</Label>
              {editingDisplayName ? (
                <div className="space-y-2">
                  <Input
                    value={displayNameValue}
                    onChange={(e) => setDisplayNameValue(e.target.value)}
                    placeholder="Dein Name"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={saveDisplayName}
                      disabled={savingDisplayName}
                      className="bg-white text-black hover:bg-zinc-200"
                    >
                      {savingDisplayName ? 'Speichern…' : 'Speichern'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingDisplayName(false)
                        setDisplayNameValue(profile.display_name)
                      }}
                      className="text-zinc-400 hover:text-white"
                    >
                      Abbrechen
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-white">{profile.display_name}</span>
                  <button
                    onClick={() => setEditingDisplayName(true)}
                    className="text-xs text-zinc-400 hover:text-white underline underline-offset-2"
                  >
                    Bearbeiten
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Profilstatus */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-100">Profilstatus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">
                  {profile.status === 'online' ? 'Online' : 'Offline'}
                </p>
                <p className="text-zinc-400 text-xs mt-0.5">
                  {profile.status === 'online'
                    ? 'Dein Profil ist öffentlich sichtbar.'
                    : 'Dein Profil gibt 404 zurück.'}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={toggleStatus}
                disabled={statusLoading}
                className={
                  profile.status === 'online'
                    ? 'border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700'
                    : 'border-green-700 bg-green-900/30 text-green-400 hover:bg-green-900/50'
                }
              >
                {statusLoading
                  ? '…'
                  : profile.status === 'online'
                    ? 'Offline schalten'
                    : 'Online schalten'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Template */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-100">Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Color swatch showing template accent color */}
                <div
                  className="w-8 h-8 rounded-md border border-zinc-700 flex-shrink-0"
                  style={{ backgroundColor: currentTemplate.colors.accent }}
                  title={currentTemplate.name}
                />
                <div>
                  <p className="text-white text-sm">{currentTemplate.name}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">{currentTemplate.description}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled
                className="border-zinc-700 bg-zinc-800 text-zinc-400 cursor-not-allowed"
              >
                Template wechseln
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Abmelden */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-100">Abmelden</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleSignOut}
            >
              Abmelden
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
