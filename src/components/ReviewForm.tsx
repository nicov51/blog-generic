'use client'

import React, { useState } from 'react'
import { Box, Button, Rating, TextField, Typography}   from "@mui/material";
import { useSession } from 'next-auth/react';

export default function ReviewForm({ articleId }: { articleId: string }) {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState<number | null>(5)
  const [error, setError] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) {
      setError('Veuillez vous connecter pour poster un avis');
      return;
    }

    setError('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, rating, articleId }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setContent('');
      setRating(5);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>

      {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

      <TextField
        fullWidth
        multiline
        label="Votre avis nous intéresse..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Rating
          name="note"
          value={rating}
          onChange={(_, value) => setRating(value)}
          size="large"
        />
        <Typography variant="body2" color="text.secondary">
          {rating ?? 0} / 5
        </Typography>
      </Box>

      <Button type="submit" variant="contained" size="small">
        Envoyer
      </Button>
    </Box>
  );
}