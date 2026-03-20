'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-Mail oder Passwort falsch.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  async function handleGoogleLogin() {
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError('Google-Anmeldung fehlgeschlagen.')
    }
  }

  return (
    <Card className="w-full max-w-sm bg-zinc-900 border-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Anmelden</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-zinc-300">E-Mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="deine@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-zinc-300">Passwort</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Wird angemeldet…' : 'Anmelden'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-xs text-zinc-500">
            <span className="bg-zinc-900 px-2">oder</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
          onClick={handleGoogleLogin}
        >
          Mit Google anmelden
        </Button>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-zinc-400">
          Noch kein Konto?{' '}
          <Link href="/register" className="text-white underline underline-offset-4 hover:text-zinc-200">
            Registrieren
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
