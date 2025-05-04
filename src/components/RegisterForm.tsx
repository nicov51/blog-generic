"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {signIn} from "next-auth/react";

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const isPasswordSecure = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const isEmailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email || !password || !name) {
      setError("Tous les champs sont requis.");
      return;
    }

    if (!isEmailValid(email)) {
      setError("L'adresse email est invalide.");
      return;
    }

    if (!isPasswordSecure(password)) {
      setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un caractère spécial.");
      return;
    }

    // Logique pour créer un compte avec email et mot de passe
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name}),
      });

      if (res.ok) {
        //On connecte l'utilisateur
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.ok) {
          //On redirige
          router.push('/articles');
        }

      }
      else {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue.");
      }
    }
    catch (error) {
      setError("Erreur inconnue:");
    }
  };

  const handleProviderSignIn = async (provider: string) => {
    try {
      const result = await signIn(provider, { callbackUrl: '/articles' });
      console.log(`Signed in with ${provider}`, result);
    } catch (error) {
      console.error(`Erreur lors de la connexion avec ${provider}:`, error);
    }
  };

  return (
    <Box component="form" onSubmit={handleEmailSignUp} sx={{ width: '100%', mt: 1 }}>
      <Typography variant="body1" gutterBottom>
        Créez votre compte avec un email valide et choisissez un mot de passe
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Nom"
        type="text"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
        required
      />

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
        type="email"
        required
        error={!!error && error.toLowerCase().includes("email")}
        helperText={!!error && error.toLowerCase().includes("email") ? error : ''}
      />

      <TextField
        fullWidth
        label="Mot de passe"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
        required
        helperText={
          !!error && error.toLowerCase().includes("mot de passe")
            ? error
            : 'Au moins 8 caractères, une majuscule, une minuscule et un caractère spécial'
        }
      />

      <Button type="submit" variant="contained" color="primary">
        Créer un compte
      </Button>
      <Typography variant="body1" mt={2} gutterBottom>
        ou connectez-vous avec un compte existant en choisissant l'icône correspondante
      </Typography>
      <Box mt={2} display="flex" gap={2} justifyContent="center">
        <GoogleIcon
          style={{ fontSize: 40, cursor: 'pointer' }}
          onClick={() => handleProviderSignIn('google')}
        />
        <FacebookIcon
          style={{ fontSize: 40, cursor: 'pointer' }}
          onClick={() => handleProviderSignIn('facebook')}
        />
        <LinkedInIcon
          style={{ fontSize: 40, cursor: 'pointer' }}
          onClick={() => handleProviderSignIn('linkedin')}
        />
      </Box>
    </Box>
  );
}

