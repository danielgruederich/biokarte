'use client'

import type { ContentBlockType } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'

interface AddPanelProps {
  onAdd: (type: ContentBlockType) => void
}

const blockOptions: { type: ContentBlockType; icon: string; label: string; desc: string }[] = [
  { type: 'link', icon: '\uD83D\uDD17', label: 'Link', desc: 'Beliebiger Link' },
  { type: 'embed', icon: '\u25C7', label: 'Embed', desc: 'Social Embed' },
  { type: 'text', icon: 'T', label: 'Text', desc: 'Textblock' },
  { type: 'section_title', icon: '#', label: 'Abschnittstitel', desc: 'Seite gliedern' },
]

/**
 * Panel showing the available block types to add.
 */
export function AddPanel({ onAdd }: AddPanelProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-zinc-400">Block hinzufuegen</h3>
      <div className="grid grid-cols-2 gap-3">
        {blockOptions.map(opt => (
          <Card
            key={opt.type}
            className="bg-zinc-900 border-zinc-800 text-white cursor-pointer hover:border-zinc-600 transition-colors"
            onClick={() => onAdd(opt.type)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <span className="text-2xl">{opt.icon}</span>
              <div>
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-xs text-zinc-500">{opt.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
