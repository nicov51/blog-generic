import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import Link from 'next/link';
import { Article } from '@/lib/article';

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
    <Box sx={{ mb: 4 }}>
      <Card
        component={Link}
        href={`/articles/${slug}`}
        sx={{
          mb: 2,
          textDecoration: 'none',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 3
          }
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={imageUrl ?? '/placeholder.jpg'}
          alt={title}
          sx={{ objectFit: 'cover' }}
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
              <Chip label={category} size="small" color="primary" />
            </Box>
          )}
        </CardContent>
      </Card>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 1
      }}>
        <Typography variant="caption" color="text.secondary">
          {likes} 👍
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {views} 👀
        </Typography>
      </Box>
    </Box>
  );
}