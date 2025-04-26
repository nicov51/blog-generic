"use client";

import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{  color: "#ffffff", py: 6, mt: 6 }}>
      <Container maxWidth="lg">
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
          gap={4}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          {/* Informations légales */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Informations légales
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link href="/footer/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link href="/footer/cgv">CGV</Link>
              </li>
              <li>
                <Link href="/footer/conditions-utilisation">Conditions d'utilisation</Link>
              </li>
              <li>
                <Link href="/footer/politique-confidentialite">Politique de confidentialité</Link>
              </li>
            </ul>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>contact@monartisan.fr</li>
              <li>06 00 00 00 00</li>
              <li>123 rue de l'Artisanat, 75000 Paris</li>
            </ul>
          </Box>

          {/* À propos */}
          <Box>
            <Typography variant="h6" gutterBottom>
              À propos
            </Typography>
            <Typography variant="body2">
              Spécialiste des plafonds tendus sur mesure, notre entreprise accompagne les particuliers et professionnels
              dans tous leurs projets d’aménagement intérieur.
            </Typography>
          </Box>
        </Box>

        {/* Copyright */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            &copy; 2025 MonArtisan. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}



