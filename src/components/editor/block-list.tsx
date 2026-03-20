'use client'

import type { ContentBlock } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface BlockListProps {
  blocks: ContentBlock[]
  onEdit: (block: ContentBlock) => void
  onToggleVisibility: (block: ContentBlock) => void
  onMoveUp: (block: ContentBlock) => void
  onMoveDown: (block: ContentBlock) => void
  onDelete: (blockId: string) => void
}

// Icons/labels for each block type
const typeInfo: Record<string, { icon: string; label: string }> = {
  link: { icon: '\uD83D\uDD17', label: 'Link' },
  embed: { icon: '\u25C7', label: 'Embed' },
  text: { icon: 'T', label: 'Text' },
  section_title: { icon: '#', label: 'Abschnitt' },
  social_link: { icon: '\uD83C\uDF10', label: 'Social' },
}

/** Extract a display title from a content block's data */
function getBlockTitle(block: ContentBlock): string {
  const data = block.data as unknown as Record<string, unknown>
  if (data.title && typeof data.title === 'string') return data.title
  if (data.text && typeof data.text === 'string') {
    const text = data.text as string
    return text.length > 40 ? text.slice(0, 40) + '...' : text
  }
  if (data.url && typeof data.url === 'string') return data.url as string
  return typeInfo[block.type]?.label ?? 'Block'
}

/**
 * List of all content blocks with controls for editing, reordering, and visibility.
 */
export function BlockList({
  blocks,
  onEdit,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  onDelete,
}: BlockListProps) {
  const sorted = [...blocks].sort((a, b) => a.position - b.position)

  if (sorted.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500 text-sm">
        Noch keine Bloecke vorhanden. Fuege oben einen hinzu.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-zinc-400 mb-3">Deine Bloecke</h3>
      {sorted.map((block, idx) => {
        const info = typeInfo[block.type] ?? { icon: '?', label: 'Block' }
        return (
          <div
            key={block.id}
            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition-colors hover:border-zinc-700"
          >
            {/* Type icon */}
            <span className="text-lg w-8 text-center shrink-0">{info.icon}</span>

            {/* Title + type label */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {getBlockTitle(block)}
              </p>
              <p className="text-xs text-zinc-500">{info.label}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Visibility toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white"
                onClick={() => onToggleVisibility(block)}
                title={block.is_visible ? 'Ausblenden' : 'Einblenden'}
              >
                {block.is_visible ? (
                  // Eye open
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Eye closed
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </Button>

              {/* Move up */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white disabled:opacity-30"
                disabled={idx === 0}
                onClick={() => onMoveUp(block)}
                title="Nach oben"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </Button>

              {/* Move down */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white disabled:opacity-30"
                disabled={idx === sorted.length - 1}
                onClick={() => onMoveDown(block)}
                title="Nach unten"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Button>

              {/* Edit */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white"
                onClick={() => onEdit(block)}
                title="Bearbeiten"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
