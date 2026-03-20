'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getTemplate, templates } from '@/lib/templates'
import type { Profile, SocialLink, ContentBlock, ContentBlockType } from '@/lib/types'
import { PhonePreview } from '@/components/editor/phone-preview'
import { AddPanel } from '@/components/editor/add-panel'
import { BlockEditor } from '@/components/editor/block-editor'
import { BlockList } from '@/components/editor/block-list'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

export default function EditPage() {
  const supabase = createClient()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // Block editor state
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorBlockType, setEditorBlockType] = useState<ContentBlockType>('link')
  const [editorBlock, setEditorBlock] = useState<ContentBlock | null>(null)

  // Fetch all data on mount
  const fetchData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setUserId(user.id)

    const [{ data: profileRaw }, { data: linksRaw }, { data: blocksRaw }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('social_links').select('*').eq('user_id', user.id).order('position', { ascending: true }),
      supabase.from('content_blocks').select('*').eq('user_id', user.id).order('position', { ascending: true }),
    ])

    if (profileRaw) setProfile(profileRaw as unknown as Profile)
    setSocialLinks((linksRaw ?? []) as unknown as SocialLink[])
    setContentBlocks((blocksRaw ?? []) as unknown as ContentBlock[])
    setLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Open block editor for a new block
  function handleAddBlock(type: ContentBlockType) {
    setEditorBlockType(type)
    setEditorBlock(null)
    setEditorOpen(true)
  }

  // Open block editor for an existing block
  function handleEditBlock(block: ContentBlock) {
    setEditorBlockType(block.type)
    setEditorBlock(block)
    setEditorOpen(true)
  }

  // Save (create or update) a block
  async function handleSaveBlock(
    type: ContentBlockType,
    data: Record<string, unknown>,
    isVisible: boolean,
    blockId?: string,
  ) {
    if (!userId) return

    if (blockId) {
      // Update existing
      const { error } = await supabase
        .from('content_blocks')
        .update({ data, is_visible: isVisible })
        .eq('id', blockId)

      if (error) {
        toast.error('Fehler beim Speichern')
        return
      }

      setContentBlocks(prev =>
        prev.map(b => b.id === blockId ? { ...b, data: data as unknown as ContentBlock['data'], is_visible: isVisible } : b)
      )
      toast.success('Block gespeichert')
    } else {
      // Calculate next position
      const maxPos = contentBlocks.length > 0
        ? Math.max(...contentBlocks.map(b => b.position))
        : -1
      const nextPosition = maxPos + 1

      const { data: newBlock, error } = await supabase
        .from('content_blocks')
        .insert({
          user_id: userId,
          type,
          position: nextPosition,
          is_visible: isVisible,
          data,
        })
        .select()
        .single()

      if (error || !newBlock) {
        toast.error('Fehler beim Hinzufuegen')
        return
      }

      setContentBlocks(prev => [...prev, newBlock as unknown as ContentBlock])
      toast.success(isVisible ? 'Block hinzugefuegt' : 'Entwurf gespeichert')
    }
  }

  // Delete a block
  async function handleDeleteBlock(blockId: string) {
    const confirmed = window.confirm('Block wirklich loeschen?')
    if (!confirmed) return

    const { error } = await supabase
      .from('content_blocks')
      .delete()
      .eq('id', blockId)

    if (error) {
      toast.error('Fehler beim Loeschen')
      return
    }

    setContentBlocks(prev => prev.filter(b => b.id !== blockId))
    toast.success('Block geloescht')
  }

  // Toggle visibility
  async function handleToggleVisibility(block: ContentBlock) {
    const newVisible = !block.is_visible

    const { error } = await supabase
      .from('content_blocks')
      .update({ is_visible: newVisible })
      .eq('id', block.id)

    if (error) {
      toast.error('Fehler beim Aktualisieren')
      return
    }

    setContentBlocks(prev =>
      prev.map(b => b.id === block.id ? { ...b, is_visible: newVisible } : b)
    )
  }

  // Move block up
  async function handleMoveUp(block: ContentBlock) {
    const sorted = [...contentBlocks].sort((a, b) => a.position - b.position)
    const idx = sorted.findIndex(b => b.id === block.id)
    if (idx <= 0) return

    const above = sorted[idx - 1]
    const posA = block.position
    const posB = above.position

    await Promise.all([
      supabase.from('content_blocks').update({ position: posB }).eq('id', block.id),
      supabase.from('content_blocks').update({ position: posA }).eq('id', above.id),
    ])

    setContentBlocks(prev =>
      prev.map(b => {
        if (b.id === block.id) return { ...b, position: posB }
        if (b.id === above.id) return { ...b, position: posA }
        return b
      })
    )
  }

  // Move block down
  async function handleMoveDown(block: ContentBlock) {
    const sorted = [...contentBlocks].sort((a, b) => a.position - b.position)
    const idx = sorted.findIndex(b => b.id === block.id)
    if (idx >= sorted.length - 1) return

    const below = sorted[idx + 1]
    const posA = block.position
    const posB = below.position

    await Promise.all([
      supabase.from('content_blocks').update({ position: posB }).eq('id', block.id),
      supabase.from('content_blocks').update({ position: posA }).eq('id', below.id),
    ])

    setContentBlocks(prev =>
      prev.map(b => {
        if (b.id === block.id) return { ...b, position: posB }
        if (b.id === below.id) return { ...b, position: posA }
        return b
      })
    )
  }

  // Switch template
  async function handleTemplateChange(templateId: string) {
    if (!profile) return

    const { error } = await supabase
      .from('profiles')
      .update({ template_id: templateId })
      .eq('id', profile.id)

    if (error) {
      toast.error('Fehler beim Template-Wechsel')
      return
    }

    setProfile(prev => prev ? { ...prev, template_id: templateId } : prev)
    toast.success('Template gewechselt')
  }

  // Copy profile URL to clipboard
  function handleShare() {
    if (!profile) return
    const url = `https://biokarte.vercel.app/${profile.username}`
    navigator.clipboard.writeText(url)
    toast.success('Link kopiert!')
  }

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="size-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  const template = getTemplate(profile.template_id)

  // Edit panel content (shared between mobile tab and desktop right side)
  const editContent = (
    <div className="space-y-6">
      {/* Template switcher */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400">Template</label>
        <select
          value={profile.template_id}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
        >
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* Add panel */}
      <AddPanel onAdd={handleAddBlock} />

      {/* Block list */}
      <BlockList
        blocks={contentBlocks}
        onEdit={handleEditBlock}
        onToggleVisibility={handleToggleVisibility}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onDelete={handleDeleteBlock}
      />
    </div>
  )

  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      {/* Header with action buttons */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Seite bearbeiten</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            onClick={() => {
              if (profile) window.open(`/${profile.username}`, '_blank')
            }}
          >
            Vorschau
          </Button>
          <Button size="sm" onClick={handleShare}>
            Teilen
          </Button>
        </div>
      </div>

      {/* Mobile: Tabs between preview and edit */}
      <div className="md:hidden">
        <Tabs defaultValue="edit">
          <TabsList className="w-full bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="preview" className="flex-1">Vorschau</TabsTrigger>
            <TabsTrigger value="edit" className="flex-1">Bearbeiten</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <div className="flex justify-center" style={{ transform: 'scale(0.75)', transformOrigin: 'top center' }}>
              <PhonePreview
                profile={profile}
                socialLinks={socialLinks}
                contentBlocks={contentBlocks}
                template={template}
              />
            </div>
          </TabsContent>
          <TabsContent value="edit" className="mt-4">
            {editContent}
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop: Split view */}
      <div className="hidden md:flex gap-6">
        {/* Left: Phone preview (50%) */}
        <div className="w-1/2 flex justify-center sticky top-20 self-start">
          <PhonePreview
            profile={profile}
            socialLinks={socialLinks}
            contentBlocks={contentBlocks}
            template={template}
          />
        </div>

        {/* Right: Edit panel (50%) */}
        <div className="w-1/2">
          {editContent}
        </div>
      </div>

      {/* Block editor sheet */}
      <BlockEditor
        blockType={editorBlockType}
        existingBlock={editorBlock}
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={handleSaveBlock}
        onDelete={handleDeleteBlock}
      />
    </div>
  )
}
