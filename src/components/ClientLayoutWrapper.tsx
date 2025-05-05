"use client"

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SessionWrapper from '@/lib/SessionWrapper';
import SidebarAdmin from '@/components/SidebarAdmin';
import React from "react";
import { Container, Box } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin =pathname.startsWith("/adminDashboard");

  if (isAdmin) {
    return (
      <SessionWrapper>
        <Box sx={{ display: "flex", minHeight: '100vh' }}>
          <SidebarAdmin />
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
        </Box>
      </SessionWrapper>
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
