"use client"
import { useState } from 'react';
import { IconButton, Typography, Box, Snackbar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useSession } from 'next-auth/react';

type LikeButtonProps = {
  articleSlug: string;
  initialLikes: number;

};

export default function LikeButton({ articleSlug, initialLikes}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  const handleLike = async () => {
    if (!session?.user?.email) {
      setError('Connectez-vous pour liker');
      return;
    }

    try {
      const response = await fetch('/api/articles/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleSlug,
          userEmail: session.user.email
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur de like");}

      setLikes(likes + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap="0.5rem">
        <IconButton onClick={handleLike} >
          <ThumbUpIcon />
        </IconButton>
        <Typography>{likes}</Typography>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </>
  );
}