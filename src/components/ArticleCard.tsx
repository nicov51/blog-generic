import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import Link from 'next/link';
import { Article } from '@/lib/article';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Stack } from '@mui/material';

export default function ArticleCard({
                                      title,
                                      content,
                                      imageUrl,
                                      category,
                                      slug,
                                      likes,
                                      views,
                                    }: Article) {
  return (
    <Box sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
      <Card
        component={Link}
        href={`/articles/${slug}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 2,
            transform: 'translateY(-2px)'
          }
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl ?? '/placeholder.jpg'}
          alt={title}
          sx={{
            height: 180,
            width: '100%',
            objectFit: 'cover'
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {content}
          </Typography>
          {category && (
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              <Chip label={category} size="small" color="secondary" />
            </Box>
          )}

        </CardContent>

      </Card>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 'auto', // Pousse vers le bas
          pt: 1,      // Petit padding top
          alignItems: 'center'
        }}
      >
        <Box display="flex" alignItems="center" gap={0.5}>
          <ThumbUpIcon fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {likes}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <VisibilityIcon fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {views}
          </Typography>
        </Box>
      </Stack>


    </Box>
  );
}