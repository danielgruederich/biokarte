export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cb-theme min-h-screen flex flex-col items-center justify-center bg-background px-4 font-sans text-foreground">
      <div className="mb-8 text-center">
        <h1 className="font-logo text-2xl font-bold tracking-tight">BioKarte</h1>
        <p className="text-sm text-muted-foreground mt-1">Deine digitale Bio-Seite</p>
      </div>
      {children}
    </div>
  )
}
