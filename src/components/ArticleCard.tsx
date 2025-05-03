import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material'
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

  const url = `/articles/${slug}`;

  return (
    <div className="card">
      <Card component="a" href={url} className="card" sx={{ mb: 2, textDecoration: 'none' }}>
        <CardMedia component="img" height="180" image={imageUrl ?? '/placeholder.jpg'} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5">{title}</Typography>
          <Typography variant="body2" color="text.secondary">{content}</Typography>
          {category && (
            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label={category} size="small" />
            </Box>
          )}
        </CardContent>
      </Card>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">{likes} Likes</Typography>
        <Typography variant="body2" color="text.secondary">{views} Views</Typography>
      </Box>
    </div>
  )
}
