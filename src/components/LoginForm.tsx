import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import {signIn} from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logique de soumission du formulaire
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        console.error("Erreur:", res.error);
      } else {
        console.log("Connexion réussie !");
        // Rediriger l'utilisateur après une connexion réussie
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Mot de passe"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Se connecter
      </Button>
    </Box>
  );
}
