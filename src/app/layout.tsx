import type { Metadata } from "next";
import { Geist_Mono, Overpass, Rubik, Syne } from "next/font/google";
import "./globals.css";

// Colognebeats brand fonts (same as colognebeats.com css/shared.css):
// Rubik body, Syne headings, Overpass wordmark
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
  weight: ["700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BioKarte — Deine Bio-Page für Köln",
  description:
    "Die kostenlose Bio-Page Plattform für Kölner DJs, Produzenten, Künstler und Kollektive. Alle Links an einem Ort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${rubik.variable} ${syne.variable} ${overpass.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
