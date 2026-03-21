import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon, Palette, BarChart3 } from "lucide-react";

const profiles = [
  {
    name: "Monschi",
    subtitle: "Cologne / Fuerteventura",
    category: "DJ",
    image: "/images/profiles/monschi-1.jpeg",
    template: "dark" as const,
    links: ["SoundCloud", "Instagram"],
  },
  {
    name: "Monschi",
    subtitle: "Cologne / Fuerteventura",
    category: "DJ",
    image: "/images/profiles/monschi-2.jpeg",
    template: "sunset" as const,
    links: ["SoundCloud", "Instagram"],
  },
  {
    name: "Monschi",
    subtitle: "Cologne / Fuerteventura",
    category: "DJ",
    image: "/images/profiles/monschi-1.jpeg",
    template: "minimal" as const,
    links: ["SoundCloud", "Instagram"],
  },
  {
    name: "Monschi",
    subtitle: "Cologne / Fuerteventura",
    category: "DJ",
    image: "/images/profiles/monschi-2.jpeg",
    template: "neon" as const,
    links: ["SoundCloud", "Instagram"],
  },
  {
    name: "Monschi",
    subtitle: "Cologne / Fuerteventura",
    category: "DJ",
    image: "/images/profiles/monschi-1.jpeg",
    template: "ocean" as const,
    links: ["SoundCloud", "Instagram"],
  },
  {
    name: "Monschi",
    subtitle: "Cologne / Fuerteventura",
    category: "DJ",
    image: "/images/profiles/monschi-2.jpeg",
    template: "fire" as const,
    links: ["SoundCloud", "Instagram"],
  },
];

const templateStyles = {
  dark: {
    card: "bg-zinc-900 border-zinc-800",
    badge: "bg-amber-500/20 text-amber-500",
    name: "text-white",
    subtitle: "text-zinc-400",
  },
  sunset: {
    card: "bg-gradient-to-b from-orange-950 to-rose-950 border-orange-800/50",
    badge: "bg-orange-500/20 text-orange-400",
    name: "text-orange-100",
    subtitle: "text-orange-300/70",
  },
  minimal: {
    card: "bg-zinc-100 border-zinc-200",
    badge: "bg-zinc-800 text-zinc-100",
    name: "text-zinc-900",
    subtitle: "text-zinc-500",
  },
  neon: {
    card: "bg-gradient-to-b from-violet-950 to-fuchsia-950 border-violet-500/30",
    badge: "bg-violet-500/20 text-violet-300",
    name: "text-violet-100",
    subtitle: "text-violet-300/70",
  },
  ocean: {
    card: "bg-gradient-to-b from-cyan-950 to-blue-950 border-cyan-500/30",
    badge: "bg-cyan-500/20 text-cyan-300",
    name: "text-cyan-100",
    subtitle: "text-cyan-300/70",
  },
  fire: {
    card: "bg-gradient-to-b from-red-950 to-amber-950 border-red-500/30",
    badge: "bg-red-500/20 text-red-400",
    name: "text-red-100",
    subtitle: "text-red-300/70",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1C1108] text-white">
      {/* Navigation */}
      <nav
        aria-label="Hauptnavigation"
        className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white"
          >
            BioKarte
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
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
            <div className="absolute -inset-12 -z-10 rounded-full bg-amber-500/20 blur-3xl" />
            <h1
              className="text-5xl font-black uppercase leading-[1.1] tracking-tight md:text-7xl"
              style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
            >
              Die Biokarte für Kölner DJs, Produzenten, Künstler, Kreative &
              Kollektive
            </h1>
            <p className="mt-6 text-lg text-zinc-400 md:text-xl">
              Alle deine Links. Ein Profil. Dein Style.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-full bg-amber-500 px-8 py-4 font-bold text-black transition-colors hover:bg-amber-600"
              >
                Kostenlos Registrieren
              </Link>
              <a
                href="#karussell"
                className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
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
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-transform hover:-translate-y-1"
            >
              <Icon className="h-12 w-12 text-amber-500" />
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Karussell */}
      <section id="karussell" className="py-24 md:py-32">
        <h2
          className="mb-12 text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
        >
          Kölner Kreative auf BioKarte
        </h2>
        <div className="overflow-hidden">
          <div className="animate-scroll flex w-max gap-6">
            {[...profiles, ...profiles].map((profile, i) => {
              const style = templateStyles[profile.template];
              return (
                <div
                  key={`${profile.template}-${i}`}
                  className={`w-[280px] shrink-0 overflow-hidden rounded-2xl border ${style.card}`}
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                  </div>
                  <div className="p-4">
                    <p className={`font-bold ${style.name}`}>{profile.name}</p>
                    <p className={`text-xs ${style.subtitle}`}>
                      {profile.subtitle}
                    </p>
                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
                    >
                      {profile.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-[#050505]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
          <p className="font-bold">BioKarte</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
            <Link href="/register" className="hover:text-white">
              Registrieren
            </Link>
            <Link href="/impressum" className="hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
          </div>
        </div>
        <p className="pb-8 text-center text-sm text-zinc-500">
          Ein Projekt von Colognebeats
        </p>
      </footer>
    </div>
  );
}
