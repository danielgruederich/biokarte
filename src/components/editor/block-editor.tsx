'use client'

import { useState } from 'react'
import type { ContentBlockType, ContentBlock, LinkBlockData, EmbedBlockData, TextBlockData, SectionTitleData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

// Embed platform options
const embedPlatforms = [
  { id: 'youtube', name: 'YouTube', icon: '\u25B6\uFE0F' },
  { id: 'soundcloud', name: 'SoundCloud', icon: '\uD83C\uDFB5' },
  { id: 'spotify', name: 'Spotify', icon: '\uD83C\uDFA7' },
  { id: 'tiktok', name: 'TikTok', icon: '\uD83C\uDFAC' },
]

// Layout options for link blocks
const layoutOptions: { value: LinkBlockData['layout']; label: string }[] = [
  { value: 'text', label: 'Nur Text' },
  { value: 'thumbnail_left', label: 'Mit Thumbnail' },
  { value: 'thumbnail_large', label: 'Gross' },
  { value: 'full_width', label: 'Volle Breite' },
]

interface BlockEditorProps {
  /** The block type for new blocks, or undefined when editing existing */
  blockType: ContentBlockType
  /** Existing block to edit, or null when creating new */
  existingBlock: ContentBlock | null
  open: boolean
  onClose: () => void
  onSave: (type: ContentBlockType, data: Record<string, unknown>, isVisible: boolean, blockId?: string) => void
  onDelete?: (blockId: string) => void
}

/**
 * Sheet (slide-in panel) for creating or editing a content block.
 */
export function BlockEditor({
  blockType,
  existingBlock,
  open,
  onClose,
  onSave,
  onDelete,
}: BlockEditorProps) {
  const isEditing = !!existingBlock

  // Link block state
  const existingLinkData = existingBlock?.data as LinkBlockData | undefined
  const [linkTitle, setLinkTitle] = useState(existingLinkData?.title ?? '')
  const [linkUrl, setLinkUrl] = useState(existingLinkData?.url ?? '')
  const [linkLayout, setLinkLayout] = useState<LinkBlockData['layout']>(existingLinkData?.layout ?? 'text')
  const [linkThumbnail, setLinkThumbnail] = useState(existingLinkData?.thumbnail_url ?? '')

  // Embed block state
  const existingEmbedData = existingBlock?.data as EmbedBlockData | undefined
  const [embedPlatform, setEmbedPlatform] = useState(existingEmbedData?.platform ?? 'youtube')
  const [embedUrl, setEmbedUrl] = useState(existingEmbedData?.url ?? '')
  const [embedTitle, setEmbedTitle] = useState(existingEmbedData?.title ?? '')

  // Text block state
  const existingTextData = existingBlock?.data as TextBlockData | undefined
  const [textContent, setTextContent] = useState(existingTextData?.text ?? '')

  // Section title state
  const existingSectionData = existingBlock?.data as SectionTitleData | undefined
  const [sectionTitle, setSectionTitle] = useState(existingSectionData?.title ?? '')

  function buildData(): Record<string, unknown> {
    switch (blockType) {
      case 'link':
        return {
          title: linkTitle,
          url: linkUrl,
          layout: linkLayout,
          ...(linkThumbnail ? { thumbnail_url: linkThumbnail } : {}),
        }
      case 'embed':
        return {
          platform: embedPlatform,
          url: embedUrl,
          ...(embedTitle ? { title: embedTitle } : {}),
        }
      case 'text':
        return { text: textContent }
      case 'section_title':
        return { title: sectionTitle }
      default:
        return {}
    }
  }

  function handleSave(isVisible: boolean) {
    const data = buildData()
    onSave(blockType, data, isVisible, existingBlock?.id)
    onClose()
  }

  function handleDelete() {
    if (existingBlock && onDelete) {
      onDelete(existingBlock.id)
      onClose()
    }
  }

  const typeLabels: Record<string, string> = {
    link: 'Link',
    embed: 'Social Embed',
    text: 'Textblock',
    section_title: 'Abschnittstitel',
  }

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <SheetContent side="right" className="bg-zinc-950 border-zinc-800 text-white w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-white">
            {isEditing ? `${typeLabels[blockType]} bearbeiten` : `${typeLabels[blockType]} hinzufuegen`}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-5 px-1">
          {/* Link block form */}
          {blockType === 'link' && (
            <>
              <div className="space-y-2">
                <Label className="text-zinc-300">Titel</Label>
                <Input
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  placeholder="Mein Link"
                  className="bg-zinc-900 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">URL</Label>
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="bg-zinc-900 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">Layout</Label>
                <select
                  value={linkLayout}
                  onChange={(e) => setLinkLayout(e.target.value as LinkBlockData['layout'])}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
                >
                  {layoutOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">Thumbnail URL (optional)</Label>
                <Input
                  value={linkThumbnail}
                  onChange={(e) => setLinkThumbnail(e.target.value)}
                  placeholder="https://..."
                  className="bg-zinc-900 border-zinc-700 text-white"
                />
              </div>
            </>
          )}

          {/* Embed block form */}
          {blockType === 'embed' && (
            <>
              <div className="space-y-2">
                <Label className="text-zinc-300">Plattform</Label>
                <div className="grid grid-cols-4 gap-2">
                  {embedPlatforms.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setEmbedPlatform(p.id)}
                      className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-xs transition-colors ${
                        embedPlatform === p.id
                          ? 'border-white bg-zinc-800 text-white'
                          : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500'
                      }`}
                    >
                      <span className="text-xl">{p.icon}</span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">URL</Label>
                <Input
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  placeholder="https://..."
                  className="bg-zinc-900 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">Titel (optional)</Label>
                <Input
                  value={embedTitle}
                  onChange={(e) => setEmbedTitle(e.target.value)}
                  placeholder="Mein Video"
                  className="bg-zinc-900 border-zinc-700 text-white"
                />
              </div>
            </>
          )}

          {/* Text block form */}
          {blockType === 'text' && (
            <div className="space-y-2">
              <Label className="text-zinc-300">Text</Label>
              <Textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                maxLength={1024}
                rows={6}
                placeholder="Dein Text..."
                className="bg-zinc-900 border-zinc-700 text-white resize-none"
              />
              <p className="text-xs text-zinc-500 text-right">{textContent.length}/1024</p>
            </div>
          )}

          {/* Section title form */}
          {blockType === 'section_title' && (
            <div className="space-y-2">
              <Label className="text-zinc-300">Titel</Label>
              <Input
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="Abschnitt"
                className="bg-zinc-900 border-zinc-700 text-white"
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2 pt-4">
            {isEditing ? (
              <>
                <Button onClick={() => handleSave(existingBlock!.is_visible)} className="w-full">
                  Speichern
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="w-full"
                >
                  Loeschen
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleSave(true)} className="w-full">
                  Hinzufuegen
                </Button>
                <Button variant="outline" onClick={() => handleSave(false)} className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  Entwurf
                </Button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-zinc-500 hover:text-zinc-300 mt-1"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
