'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const MAX_BIO = 150

interface ProfileStepProps {
  userId: string
  displayName: string
  bio: string
  avatarUrl: string | null
  onDisplayNameChange: (v: string) => void
  onBioChange: (v: string) => void
  onAvatarUrlChange: (url: string) => void
}

export function ProfileStep({
  userId,
  displayName,
  bio,
  avatarUrl,
  onDisplayNameChange,
  onBioChange,
  onAvatarUrlChange,
}: ProfileStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError(null)

    const ext = file.name.split('.').pop()
    const path = `avatars/${userId}.${ext}`
    const supabase = createClient()

    const { error } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true })

    if (error) {
      setUploadError('Upload fehlgeschlagen. Versuche es erneut.')
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    onAvatarUrlChange(data.publicUrl)
    setUploading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Profil-Details</h2>
        <p className="text-zinc-400 mt-1">Wie soll dein Profil aussehen?</p>
      </div>

      {/* Avatar upload */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden hover:border-teal-500 transition-colors"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-1">
              <svg className="w-7 h-7 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-zinc-500 text-xs">Foto</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>
        <span className="text-xs text-zinc-500">Tippe, um ein Bild hochzuladen</span>
        {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Display name */}
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-zinc-300">Anzeigename</Label>
        <Input
          id="displayName"
          type="text"
          placeholder="Dein Name"
          value={displayName}
          onChange={(e) => onDisplayNameChange(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Kurze Beschreibung über dich…"
          value={bio}
          onChange={(e) => onBioChange(e.target.value.slice(0, MAX_BIO))}
          rows={4}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
        />
        <p className={`text-xs text-right ${bio.length >= MAX_BIO ? 'text-orange-400' : 'text-zinc-500'}`}>
          {bio.length}/{MAX_BIO}
        </p>
      </div>
    </div>
  )
}
