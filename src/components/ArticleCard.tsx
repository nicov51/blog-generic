'use client'

import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material'
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import { Article } from '@/lib/article';

export default function ArticleCard({
                                      title,
                                      content,
                                      imageUrl,
                                      categories,
                                      slug,
                                      likes,
                                    }: Article) {

  const url = `/articles/${slug}`;

  return (
    <div className="card">
    <Card component="a" href={`/articles/${slug}`} className="card" sx={{ mb: 2, textDecoration: 'none' }}>
      <CardMedia component="img" height="180" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{content}</Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <Chip key={cat} label={cat} size="small" />
          ))}
        </Box>
      </CardContent>
    </Card>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <LikeButton initialLikes={likes} />
          <ShareButton url={url} />
        </Box>
    </div>
  )
}
