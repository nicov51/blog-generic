import SidebarAdmin from "@/components/SidebarAdmin";
import { Box } from "@mui/material";
import React from "react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarAdmin />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}