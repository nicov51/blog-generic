'use client'

import React, { useState } from 'react'
import { Box, Button, Rating, TextField}   from "@mui/material";

export default function ReviewForm({ articleId }: { articleId: string }) {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState<number | null>(3)

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
        label="Votre avis"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Rating
        name="note"
        value={rating}
        onChange={(_, value) => setRating(value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">Envoyer</Button>
    </Box>
  )
}