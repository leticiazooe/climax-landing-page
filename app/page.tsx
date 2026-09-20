import type { Metadata } from "next";
import NativeLanding from "./NativeLanding";

export const metadata: Metadata = {
  title: "CLIMAX Refrigeração | Ar-condicionado em Jaboticabal e Região",
  description: "Instalação, manutenção e climatização para lojas, igrejas e empresas em Jaboticabal, Matão e região.",
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: "CLIMAX Refrigeração",
    telephone: "+55 16 99707-8047",
    areaServed: ["Jaboticabal", "Matão", "Região de Jaboticabal"],
    url: "https://wa.me/5516997078047",
    sameAs: ["https://www.instagram.com/grupoclimaxrefrigeracao/"],
  };

  return (
    <>
      <NativeLanding />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
