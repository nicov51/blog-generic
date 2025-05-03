'use client';

import Link from 'next/link';
import { Container } from "@mui/material";
export default function Navbar() {
  return (
    <header className="sticky top-0 bg-white shadow z-50 w-full">
      <Container maxWidth ="lg" disableGutters>
      <nav className= "flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold">
          <Link href="/">LOGO</Link>
        </div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/articles">Articles</Link></li>
          <li><Link href="/login">Connexion</Link></li>
          <li><a href="https://ton-lien-externe.com" target="_blank" rel="noopener noreferrer">Lien externe</a></li>
        </ul>
      </nav>
      </Container>
    </header>
  );
}
