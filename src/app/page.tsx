import HeaderHero from "@/components/HeaderHero";

export const metadata = {
  title: "Plafonds tendus - Artisan expert depuis 2009",
  description: "Installation de plafonds tendus, qualité et finition professionnelle depuis plus de 15 ans.",
  openGraph: {
    title: "Plafonds tendus - Artisan expert depuis 2009",
    images: ["/images/header.jpg"],
  }
};

export default function Home() {
  return (
    <>
      <HeaderHero />
      <div>Contenu à venir</div>
    </>
  );
}
