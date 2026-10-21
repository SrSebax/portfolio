import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { themeScript } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sebastian Londoño — Desarrollador de Software",
  description:
    "Desarrollador de software en Medellín, Colombia. Construyo aplicaciones web y móviles con React, Next.js y Flutter, enfocadas en rendimiento y experiencia de usuario.",
  keywords: ["Sebastian Londoño", "desarrollador frontend", "React", "Next.js", "Flutter", "Medellín", "portafolio"],
  authors: [{ name: "Sebastian Londoño", url: "https://github.com/SrSebax" }],
  openGraph: {
    title: "Sebastian Londoño — Desarrollador de Software",
    description: "Aplicaciones web y móviles rápidas, claras y bien hechas.",
    type: "website",
    locale: "es_CO",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
