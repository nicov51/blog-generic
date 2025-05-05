import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import React from "react";



export const metadata = {
  title: "Nom de ton site",
  description: "Description ici",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (

    <html lang="fr">
    <body className="bg-white text-black p-0 m-0">
    <ClientLayoutWrapper>
      {children}
    </ClientLayoutWrapper>
    </body>
    </html>

  );
}
