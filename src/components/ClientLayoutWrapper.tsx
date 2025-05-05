"use client"

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SessionWrapper from '@/lib/SessionWrapper';
import React from "react";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
      <Navbar />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      <Footer />
    </SessionWrapper>
  );
}
