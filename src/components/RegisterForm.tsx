import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import { signIn } from 'next-auth/react'; // Importer lorsque next-auth est installé

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    // Logique pour créer un compte avec email et mot de passe
    console.log('Email:', email, 'Password:', password);
  };

  const handleProviderSignIn = (provider: string) => {
    // Décommentez cette ligne lorsque next-auth est configuré
    // signIn(provider);
    console.log(`Signing in with ${provider}`);
  };

  return (
    <Box component="form" onSubmit={handleEmailSignUp} sx={{ width: '100%', mt: 1 }}>
      <Typography variant="body1" gutterBottom>
        Créez votre compte avec un email valide et choisissez un mot de passe
      </Typography>
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

