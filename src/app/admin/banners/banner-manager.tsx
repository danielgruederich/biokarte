'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Banner {
  id: string
  title: string
  description: string | null
  image_url: string | null
  link_url: string | null
  is_active: boolean
  position: 'top' | 'bottom'
  created_at: string
}

interface BannerManagerProps {
  initialBanners: Banner[]
}

export function BannerManager({ initialBanners }: BannerManagerProps) {
  const router = useRouter()
  const [banners, setBanners] = useState<Banner[]>(initialBanners)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Banner | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom')

  function resetForm() {
    setTitle('')
    setDescription('')
    setImageUrl('')
    setLinkUrl('')
    setPosition('bottom')
    setEditing(null)
    setShowForm(false)
  }

  function startEdit(banner: Banner) {
    setTitle(banner.title)
    setDescription(banner.description ?? '')
    setImageUrl(banner.image_url ?? '')
    setLinkUrl(banner.link_url ?? '')
    setPosition(banner.position)
    setEditing(banner)
    setShowForm(true)
  }

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)
    const supabase = createClient()

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      image_url: imageUrl.trim() || null,
      link_url: linkUrl.trim() || null,
      position,
    }

    if (editing) {
      await supabase.from('admin_banners').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('admin_banners').insert(payload)
    }

    setSaving(false)
    resetForm()
    router.refresh()

    // Refetch
    const { data } = await supabase.from('admin_banners').select('*').order('created_at', { ascending: false })
    if (data) setBanners(data as Banner[])
  }

  async function handleToggleActive(banner: Banner) {
    const supabase = createClient()

    if (!banner.is_active) {
      // Deactivate all others first
      await supabase.from('admin_banners').update({ is_active: false }).neq('id', banner.id)
    }

    await supabase.from('admin_banners').update({ is_active: !banner.is_active }).eq('id', banner.id)
    router.refresh()

    const { data } = await supabase.from('admin_banners').select('*').order('created_at', { ascending: false })
    if (data) setBanners(data as Banner[])
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('admin_banners').delete().eq('id', id)
    setBanners((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div className="space-y-4">
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="bg-teal-500 hover:bg-teal-400 text-black">
          + Neues Banner
        </Button>
      )}

      {showForm && (
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle className="text-sm">{editing ? 'Banner bearbeiten' : 'Neues Banner'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400">Titel *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white"
                placeholder="Banner-Titel"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Beschreibung</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white resize-none"
                rows={2}
                placeholder="Optionale Beschreibung"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Bild-URL</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Link-URL</label>
              <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as 'top' | 'bottom')}
                className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white"
              >
                <option value="bottom">Unten</option>
                <option value="top">Oben</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving} className="bg-teal-500 hover:bg-teal-400 text-black">
                {saving ? 'Speichern…' : 'Speichern'}
              </Button>
              <Button variant="ghost" onClick={resetForm} className="text-zinc-400">
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Banner list */}
      {banners.length === 0 && !showForm && (
        <p className="text-sm text-zinc-500">Noch keine Banner erstellt.</p>
      )}

      {banners.map((banner) => (
        <Card key={banner.id} className="bg-zinc-900 border-zinc-800 text-white">
          <CardContent className="py-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm truncate">{banner.title}</p>
                {banner.is_active && (
                  <span className="shrink-0 px-2 py-0.5 text-xs rounded bg-teal-900/50 text-teal-400 border border-teal-800/50">
                    Aktiv
                  </span>
                )}
                <span className="shrink-0 px-2 py-0.5 text-xs rounded bg-zinc-800 text-zinc-400">
                  {banner.position === 'top' ? 'Oben' : 'Unten'}
                </span>
              </div>
              {banner.description && (
                <p className="text-xs text-zinc-500 mt-0.5 truncate">{banner.description}</p>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleActive(banner)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                {banner.is_active ? 'Deaktivieren' : 'Aktivieren'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => startEdit(banner)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Bearbeiten
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(banner.id)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Löschen
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
