'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import type { Profile } from '@/lib/types'

export default function AdminUsersPage() {
  const supabase = createClient()
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function loadUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('User konnten nicht geladen werden.')
      setLoading(false)
      return
    }

    setUsers(data ?? [])
    setLoading(false)
  }

  async function toggleRole(user: Profile) {
    const newRole = user.role === 'admin' ? 'user' : 'admin'
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', user.id)

    if (error) {
      toast.error('Rolle konnte nicht geändert werden.')
      return
    }

    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u))
    toast.success(`${user.display_name || user.username} ist jetzt ${newRole}.`)
  }

  async function toggleStatus(user: Profile) {
    const newStatus = user.status === 'online' ? 'offline' : 'online'
    const { error } = await supabase
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', user.id)

    if (error) {
      toast.error('Status konnte nicht geändert werden.')
      return
    }

    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u))
    toast.success(`${user.username} ist jetzt ${newStatus}.`)
  }

  async function deleteUser(user: Profile) {
    if (!confirm(`User "${user.username}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`)) {
      return
    }

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id)

    if (error) {
      toast.error('User konnte nicht gelöscht werden.')
      return
    }

    setUsers(prev => prev.filter(u => u.id !== user.id))
    toast.success(`User "${user.username}" wurde gelöscht.`)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-zinc-400">Laden…</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User-Verwaltung</h1>
        <span className="text-sm text-zinc-400">{users.length} User</span>
      </div>

      <div className="space-y-3">
        {users.map(user => (
          <Card key={user.id} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-medium shrink-0">
                    {(user.display_name || user.username).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{user.display_name || user.username}</span>
                      {user.role === 'admin' && (
                        <Badge variant="outline" className="border-red-800 text-red-400 text-xs">
                          Admin
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm text-zinc-400">@{user.username}</span>
                      <span className="text-zinc-600">·</span>
                      <span className={`text-xs ${user.status === 'online' ? 'text-green-400' : 'text-zinc-500'}`}>
                        {user.status}
                      </span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-xs text-zinc-500">
                        {new Date(user.created_at).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStatus(user)}
                    className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
                  >
                    {user.status === 'online' ? 'Offline' : 'Online'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleRole(user)}
                    className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
                  >
                    {user.role === 'admin' ? '→ User' : '→ Admin'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteUser(user)}
                    className="border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-950/50 text-xs"
                  >
                    Löschen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
