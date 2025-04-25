'use client';

import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import LoginForm from '@/components/LoginForm';
import NextLink from 'next/link';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 3,
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Connexion
        </Typography>
        <LoginForm />
        <Box mt={2}>
          <Typography variant="body1">
            Pas encore inscrit ?{' '}
            <NextLink href="/register" passHref>
              <Link>Créez un compte</Link>
            </NextLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

