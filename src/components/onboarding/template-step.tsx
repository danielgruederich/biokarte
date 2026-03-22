'use client'

import { templates } from '@/lib/templates'
import { TemplatePreview } from '@/components/profile/template-preview'

interface TemplateStepProps {
  selectedId: string
  onSelect: (id: string) => void
}

export function TemplateStep({ selectedId, onSelect }: TemplateStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl font-bold text-white italic"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Select a template
        </h2>
        <p className="text-zinc-400 mt-1 text-sm">
          Pick the style that feels right — you can change and customize anytime.
        </p>
      </div>

      {/* 4x4 Grid like hoo.be */}
      <div className="grid grid-cols-4 gap-3">
        {templates.map(template => (
          <TemplatePreview
            key={template.id}
            template={template}
            selected={selectedId === template.id}
            onClick={() => onSelect(template.id)}
          />
        ))}
      </div>
    </div>
  )
}
