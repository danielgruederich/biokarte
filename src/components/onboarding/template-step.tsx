'use client'

import { templates } from '@/lib/templates'
import type { Template } from '@/lib/types'

interface TemplateStepProps {
  selectedId: string
  onSelect: (id: string) => void
}

export function TemplateStep({ selectedId, onSelect }: TemplateStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Wähle dein Template</h2>
        <p className="text-zinc-400 mt-1">Du kannst es jederzeit ändern.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates.map((template: Template) => {
          const isSelected = selectedId === template.id
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all ${
                isSelected ? 'border-teal-500' : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              {/* Color preview strip */}
              <div
                className="h-20 w-full flex items-center justify-center gap-2"
                style={{ background: template.colors.background }}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ background: template.colors.surface, border: `2px solid ${template.colors.border}` }}
                />
                <div className="space-y-1.5">
                  <div
                    className="h-2 w-20 rounded"
                    style={{ background: template.colors.text, opacity: 0.9 }}
                  />
                  <div
                    className="h-1.5 w-14 rounded"
                    style={{ background: template.colors.muted }}
                  />
                </div>
                <div
                  className="w-6 h-6 rounded"
                  style={{ background: template.colors.accent }}
                />
              </div>

              {/* Info row */}
              <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{template.name}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">{template.description}</p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
