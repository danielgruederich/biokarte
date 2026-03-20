'use client'

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md text-center space-y-4">
        <h2 className="text-xl font-bold">Etwas ist schiefgelaufen</h2>
        <p className="text-sm text-red-400">{error.message}</p>
        {error.digest && (
          <p className="text-xs text-zinc-500">Digest: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-teal-500 text-black rounded-lg font-medium"
        >
          Nochmal versuchen
        </button>
      </div>
    </div>
  )
}
