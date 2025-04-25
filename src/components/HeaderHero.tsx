"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function HeaderHero() {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "400px" }}>
      <Image
        src="/images/header.jpg" // mets ton image ici
        alt="Plafond tendu"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0,0,0,0.4)",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h3" component="h1" fontWeight="bold">
          Spécialiste du plafond tendu depuis 2009
        </Typography>
      </Box>
    </Box>
  );
}
