import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

type ShareButtonProps = {
  url: string;
};

export default function ShareButton({ url }: ShareButtonProps) {
  const handleShare = (platform: string) => {
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="0.5rem">
      <Box display="flex" gap="0.5rem">
        <IconButton onClick={() => handleShare('facebook')}>
          <FacebookIcon />
        </IconButton>
        <IconButton onClick={() => handleShare('linkedin')}>
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Typography variant="caption" color="text.secondary">
        Partagez cet article
      </Typography>
    </Box>
  );
}
