'use client';

import Link from 'next/link';
import {useSession, signOut} from "next-auth/react";
export default function Navbar() {
  const { data : session } =useSession();

  return (
    <header className="sticky top-0 bg-white shadow z-50 w-full">
      <nav className= "max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold">
          <Link href="/">LOGO</Link>
        </div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/articles">Articles</Link></li>
          <li><a href="https://ton-lien-externe.com" target="_blank" rel="noopener noreferrer">Lien externe</a></li>

          {!session?.user ? (
            <li><Link href="/login">Connexion</Link></li>
          ) :  (
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: "/login" });
                }}
                className="text-red-600 hover:underline"
              >
                Se déconnecter
              </a>
            </li>
          )

        }

      </ul>
      </nav>
</header>
)
  ;
}
