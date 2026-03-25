'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AdminNavProps {
  displayName: string
}

const navLinks = [
  { href: '/admin', label: 'Übersicht' },
  { href: '/admin/users', label: 'User' },
  { href: '/admin/profiles', label: 'Profile' },
  { href: '/admin/banners', label: 'Banner' },
  { href: '/admin/settings', label: 'Einstellungen' },
]

export function AdminNav({ displayName }: AdminNavProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-red-900/50 bg-zinc-950/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-lg font-bold tracking-tight text-white">
            BioKarte
          </Link>
          <span className="rounded bg-red-900/50 px-2 py-0.5 text-xs font-semibold text-red-400 border border-red-800/50">
            Admin
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Zurück zur App
          </Link>
          <div className="size-7 rounded-full bg-red-900/50 flex items-center justify-center text-red-400 text-xs font-medium border border-red-800/50">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-3 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300"
          >
            ← Zurück zur App
          </Link>
        </div>
      )}
    </header>
  )
}
