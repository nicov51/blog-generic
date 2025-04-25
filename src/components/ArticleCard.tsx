'use client'

import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material'

type ArticleCardProps = {
  title: string
  description: string
  image: string
  categories: string[]
  slug: string
}

export default function ArticleCard({
                                      title,
                                      description,
                                      image,
                                      categories,
                                      slug,
                                    }: ArticleCardProps) {
  return (
    <div className="card">
    <Card component="a" href={`/articles/${slug}`} className="card" sx={{ mb: 2, textDecoration: 'none' }}>
      <CardMedia component="img" height="180" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <Chip key={cat} label={cat} size="small" />
          ))}
        </Box>
      </CardContent>
    </Card>
  </div>
  )
}
