import { Box, Typography, Rating, Paper } from '@mui/material';

type ReviewCardProps = {
  content: string;
  rating: number;
  userName?: string | null;
  createdAt: string | Date;
};

export default function ReviewCard({ content, rating, userName, createdAt }: ReviewCardProps) {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {userName || 'Utilisateur anonyme'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Rating value={rating} readOnly size="small" sx={{ mb: 1 }} />
      <Typography variant="body2">{content}</Typography>
    </Paper>
  );
}