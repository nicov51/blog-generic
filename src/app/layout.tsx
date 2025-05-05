import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from "react";
import SessionWrapper from "@/lib/SessionWrapper";


export const metadata = {
  title: "Nom de ton site",
  description: "Description ici",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (

    <html lang="fr">
    <body className="bg-white text-black">
    <SessionWrapper>

      < Navbar />
      < Header />

    <main className= "max-w-6xl mx-auto px-4 py-6">
      {children}
    </main>

    <Footer />

    </SessionWrapper>
    </body>
    </html>

  );
}
