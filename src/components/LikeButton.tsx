"use client"

import React, { useState } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" alignItems="center" gap="0.5rem">
        <IconButton onClick={handleLike} color={isLiked ? 'secondary' : 'default'}>
          <ThumbUpIcon />
        </IconButton>
        <Typography>{likes}</Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        Vous avez aimé cet article?
      </Typography>
    </Box>
  );
}
