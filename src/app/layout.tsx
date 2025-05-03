"use client"

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from "react";
import SessionWrapper from "@/lib/SessionWrapper";
import { usePathname }  from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/adminDashboard");

  return (
    <SessionWrapper>
    <html lang="fr">
    <body className="bg-white text-black">
    {/* Si ce n'est PAS une page Admin, on affiche Navbar */}
    {!isAdminRoute && <Navbar />}
    {!isAdminRoute && <Header />}


    {/* Main content */}
    <main className={`${!isAdminRoute ? "max-w-6xl mx-auto px-4 py-6" : ""}`}>
      {children}
    </main>

    {/* Si ce n'est PAS une page Admin, on affiche Footer */}
    {!isAdminRoute && <Footer />}
    </body>
    </html>
    </SessionWrapper>
  );
}
