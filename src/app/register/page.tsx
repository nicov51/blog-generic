'use client';

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
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
          Inscription
        </Typography>
        <RegisterForm />
      </Box>
    </Container>
  );
}

