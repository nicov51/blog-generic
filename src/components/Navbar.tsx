'use client';

import Link from 'next/link';
import {useSession, signOut} from "next-auth/react";
import { Container, Box } from "@mui/material";

export default function Navbar() {
  const { data : session } =useSession();

  return (
    <header className="sticky top-0 bg-white shadow z-50 w-full" style={{ backgroundColor: "var(--bg-header)", color: "white" }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
          <div className="text-xl font-bold">
            <Link href="/">LOGO</Link>
          </div>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/articles">Articles</Link></li>
            <li>
              <a href="https://ton-lien-externe.com" target="_blank" rel="noopener noreferrer">
                Lien
              </a>
            </li>
            {!session?.user ? (
              <li><Link href="/login">Connexion</Link></li>
            ) : (
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="text-red-400 hover:underline"
                >
                  Se déconnecter
                </a>
              </li>
            )}
          </ul>
        </Box>
      </Container>
    </header>
  );
}
