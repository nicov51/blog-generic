/* Composant pour afficher des boutons personnaliés
en fonction des fournisseurs tiers
comme google, Linkedin ou facebook */

import React from 'react';
import { Button } from '@mui/material';

type AuthButtonProps = {
  provider: string;
  label: string;
};

export default function AuthButton({ provider, label }: AuthButtonProps) {
  const handleAuth = () => {
    // Logique pour gérer l'authentification avec le fournisseur
    console.log(`Connecting with ${provider}`);
  };

  return (
    <Button variant="outlined" onClick={handleAuth}>
      {label}
    </Button>
  );
}
