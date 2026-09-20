import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CLIMAX Refrigeração",
  description: "Instalação e manutenção de ar-condicionado em Jaboticabal, Matão e região.",
  icons: { icon: "/climax-logo.png", shortcut: "/climax-logo.png" },
  openGraph: {
    title: "CLIMAX Refrigeração — Seu ambiente no clima certo",
    description: "Instalação, manutenção e climatização em Jaboticabal, Matão e região.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CLIMAX Refrigeração" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
