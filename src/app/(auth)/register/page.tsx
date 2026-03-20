'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    // Validate username
    if (!/^[a-z0-9_]+$/.test(username)) {
      setError('Benutzername darf nur Kleinbuchstaben, Zahlen und _ enthalten.')
      return
    }

    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: username,
        },
      },
    })

    if (error) {
      setError(error.message === 'User already registered'
        ? 'Diese E-Mail ist bereits registriert.'
        : 'Registrierung fehlgeschlagen. Bitte versuche es erneut.')
      setLoading(false)
      return
    }

    router.push('/onboarding')
  }

  async function handleGoogleRegister() {
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError('Google-Registrierung fehlgeschlagen.')
    }
  }

  return (
    <Card className="w-full max-w-sm bg-zinc-900 border-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Registrieren</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username" className="text-zinc-300">Benutzername</Label>
            <Input
              id="username"
              type="text"
              placeholder="deinname"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
            <p className="text-xs text-zinc-500">Nur Kleinbuchstaben, Zahlen und _</p>
          </div>

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
              placeholder="Mindestens 6 Zeichen"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Wird registriert…' : 'Registrieren'}
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
          onClick={handleGoogleRegister}
        >
          Mit Google registrieren
        </Button>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-zinc-400">
          Bereits ein Konto?{' '}
          <Link href="/login" className="text-white underline underline-offset-4 hover:text-zinc-200">
            Anmelden
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
