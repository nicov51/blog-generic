// components/AdminLayout.tsx
'use client';
import SessionWrapper from '@/lib/SessionWrapper';
import SidebarAdmin from '@/components/SidebarAdmin';
import React from "react";
import { Box } from '@mui/material';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
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