"use client"

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SessionWrapper from '@/lib/SessionWrapper';
import React from "react";
import { Container} from '@mui/material';
import { usePathname } from 'next/navigation';
import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import("@/components/AdminLayout"), {
  ssr: false, // Désactive le rendu SSR pour AdminLayout
});

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin =pathname.startsWith("/adminDashboard");

  if (isAdmin) {
    return (
     <AdminLayout>{children}</AdminLayout>
    );
  }


  return (
    <SessionWrapper>
      <Navbar />
      <Header />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </SessionWrapper>
  );
}
