import "./globals.css";

export const metadata = {
  title: "CLIMAX Refrigeração",
  description: "Instalação e manutenção de ar-condicionado em Jaboticabal, Matão e região.",
  icons: { icon: "/climax-logo.svg", shortcut: "/climax-logo.svg" },
  openGraph: {
    title: "CLIMAX Refrigeração — Seu ambiente no clima certo",
    description: "Instalação, manutenção e climatização em Jaboticabal, Matão e região.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "CLIMAX Refrigeração" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.svg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
