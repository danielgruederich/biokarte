export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">BioKarte</h1>
        <p className="text-sm text-zinc-400 mt-1">Deine digitale Bio-Seite</p>
      </div>
      {children}
    </div>
  )
}
