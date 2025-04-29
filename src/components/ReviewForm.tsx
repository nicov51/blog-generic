'use client'

import React, { useState } from 'react'
import { Box, Button, Rating, TextField, Typography}   from "@mui/material";

export default function ReviewForm({ articleId }: { articleId: string }) {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState<number | null>(5)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await fetch('api/reviews', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content,rating,articleId}),
    })
    window.location.reload()
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
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