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
    if (!/^[a-z0-9][a-z0-9_-]{1,28}[a-z0-9]$/.test(username)) {
      setError('Benutzername: 3-30 Zeichen, nur Kleinbuchstaben, Zahlen, - und _')
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
      console.error('Registration error:', error)
      setError(error.message === 'User already registered'
        ? 'Diese E-Mail ist bereits registriert.'
        : `Fehler: ${error.message}`)
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
        redirectTo: `${window.location.origin}/callback`,
      },
    })
    if (error) {
      setError('Google-Registrierung fehlgeschlagen.')
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-display text-lg font-bold">Registrieren</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username">Benutzername</Label>
            <Input
              id="username"
              type="text"
              placeholder="deinname"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
              className="h-11 bg-muted"
            />
            <p className="text-xs text-muted-foreground">3-30 Zeichen: Kleinbuchstaben, Zahlen, - und _</p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="deine@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 bg-muted"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              placeholder="Mindestens 6 Zeichen"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="h-11 bg-muted"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" disabled={loading} className="h-11 w-full rounded-full font-semibold hover:bg-cb-amber-l">
            {loading ? 'Wird registriert…' : 'Registrieren'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs text-muted-foreground">
            <span className="bg-card px-2">oder</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-full font-semibold hover:border-foreground"
          onClick={handleGoogleRegister}
        >
          Mit Google registrieren
        </Button>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Bereits ein Konto?{' '}
          <Link href="/login" className="font-semibold text-cb-amber-l underline-offset-4 hover:underline">
            Anmelden
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
