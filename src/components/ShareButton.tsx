"use client"
import { IconButton, Box, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

type ShareButtonProps = {
  url: string;
  title: string;
};

export default function ShareButton({ url, title }: ShareButtonProps) {

  const getAbsoluteUrl = () => {
    if (typeof window === "undefined") return url;
    return url.startsWith("http") ? url : `${window.location.origin}${url}`;
  };
  const handleShare = (platform: string) => {
    const absoluteUrl = getAbsoluteUrl();
    const encodedUrl = encodeURIComponent(absoluteUrl);
    const text = encodeURIComponent(`Je vous partage cet article : ${title}`);

    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`
    };

    window.open(urls[platform as keyof typeof urls], '_blank', 'noopener,noreferrer');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Typography variant="caption" color="text.secondary">
        Partagez cet article
      </Typography>
      <Box display="flex" gap={1}>
        <IconButton onClick={() => handleShare('linkedin')} aria-label="Partager sur LinkedIn">
          <LinkedInIcon />
        </IconButton>
        <IconButton onClick={() => handleShare('facebook')} aria-label="Partager sur Facebook">
          <FacebookIcon />
        </IconButton>
        <IconButton onClick={() => handleShare('twitter')} aria-label="Partager sur Twitter">
          <TwitterIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
