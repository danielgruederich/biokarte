import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon, Palette, BarChart3 } from "lucide-react";
import { templates } from "@/lib/templates";
import { TemplatePreview } from "@/components/profile/template-preview";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cb-black to-cb-dark font-sans text-cb-white">
      {/* Navigation */}
      <nav
        aria-label="Hauptnavigation"
        className="sticky top-0 z-50 border-b border-cb-border bg-cb-black/80 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-logo text-xl font-bold tracking-tight text-cb-white"
          >
            BioKarte
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-cb-border px-5 py-2 text-sm font-semibold text-cb-white transition-colors hover:border-cb-white"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-in-up relative">
            {/* Gradient glow behind headline */}
            <div className="absolute -inset-12 -z-10 rounded-full bg-cb-amber/20 blur-3xl" />
            <h1
              className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-5xl"
            >
              Die Biokarte für Kölner DJs, Produzenten, Künstler, Kreative &
              Kollektive
            </h1>
            <p className="mt-6 text-lg text-cb-muted md:text-xl">
              Alle deine Links. Ein Profil. Dein Style.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-full bg-cb-amber px-8 py-4 font-semibold text-cb-black transition-colors hover:bg-cb-amber-l"
              >
                Kostenlos Registrieren
              </Link>
              <a
                href="#karussell"
                className="rounded-full border border-cb-border px-8 py-4 font-semibold text-cb-white transition-colors hover:border-cb-white"
              >
                Beispiele ansehen ↓
              </a>
            </div>
          </div>

          {/* Phone Mockup — hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex md:justify-center">
            <div className="relative h-[580px] w-[280px] rounded-[40px] border-4 border-zinc-700 bg-zinc-900 p-3 shadow-2xl">
              {/* Notch */}
              <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-zinc-800" />
              {/* Screen content */}
              <div className="flex h-full flex-col items-center rounded-[32px] bg-gradient-to-b from-zinc-800 to-zinc-900 px-4 pt-12">
                {/* Avatar */}
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src="/images/profiles/monschi-1.jpeg"
                    alt="Monschi"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <p
                  className="mt-3 text-lg font-black uppercase"
                  style={{
                    fontFamily: "'Big Shoulders Display', sans-serif",
                  }}
                >
                  Monschi
                </p>
                <p className="text-xs text-zinc-400">
                  Cologne / Fuerteventura
                </p>
                {/* Link buttons */}
                <div className="mt-6 flex w-full flex-col gap-3">
                  {["SoundCloud", "Instagram", "Booking"].map((label) => (
                    <div
                      key={label}
                      className="rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-center text-sm font-medium"
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: LinkIcon,
              title: "Alle Links an einem Ort",
              text: "Social Media, Musik, Booking — alles auf einer Seite",
            },
            {
              icon: Palette,
              title: "Eigenes Design wählen",
              text: "Wähle aus verschiedenen Templates und mach dein Profil einzigartig",
            },
            {
              icon: BarChart3,
              title: "Statistiken & Analytics",
              text: "Sieh wer dein Profil besucht und welche Links geklickt werden",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-cb-border bg-cb-card p-8 transition-transform hover:-translate-y-1"
            >
              <Icon className="h-12 w-12 text-cb-amber" />
              <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-cb-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Template Grid — hoo.be style */}
      <section id="karussell" className="py-24 md:py-32">
        <h2
          className="mb-4 text-center font-display text-3xl font-extrabold tracking-[-0.03em] md:text-5xl"
        >
          Wähle deinen Style
        </h2>
        <p className="mb-12 text-center text-cb-muted">
          16 Templates — von Dark bis Gradient. Du kannst jederzeit wechseln.
        </p>
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {templates.map(t => (
              <TemplatePreview key={t.id} template={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cb-border bg-cb-black">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
          <p className="font-logo font-bold">BioKarte</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-cb-muted">
            <Link href="/login" className="hover:text-cb-white">
              Login
            </Link>
            <Link href="/register" className="hover:text-cb-white">
              Registrieren
            </Link>
            <Link href="/impressum" className="hover:text-cb-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-cb-white">
              Datenschutz
            </Link>
          </div>
        </div>
        <p className="pb-8 text-center text-sm text-cb-muted">
          Ein Projekt von Colognebeats
        </p>
      </footer>
    </div>
  );
}
