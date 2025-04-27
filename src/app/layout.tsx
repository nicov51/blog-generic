import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React from "react";
import SessionWrapper from "@/lib/SessionWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
    <html lang="fr">
    <body className="bg-white text-black">
    <Navbar />
    <main className="max-w-6xl mx-auto px-4 py-6">
      {children}
    </main>
    <Footer />
    </body>
    </html>
    </SessionWrapper>
  );
}
