//import { getArticlePostBySlug } from "@/src/lib/api";
import { notFound } from "next/navigation";
import { Typography, Container, Chip, Box } from "@mui/material";
import Image from "next/image";
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import { getArticleBySlug } from '@/lib/article';
import { getReviewsByArticleId} from "@/lib/reviews";


export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {

  //todo corriger pb async
  const post = await getArticleBySlug(params.slug);
  if (!post) return notFound();
  const url = `/articles/${post.slug}`;

  const reviews = await getReviewsByArticleId(post.id)

  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>

      <Box className="text-gray-500 mb-4">
        Publié le {new Date(post.createdAt).toLocaleDateString()} par {post.author}
      </Box>

      {post.category && (
      <Box className="flex gap-2 mb-6">
        <Chip label={post.category} color="primary" />
      </Box>
      )}

      <Box className="mb-6 relative w-full h-[300px] rounded-xl overflow-hidden">
        <Image
          src={post.imageUrl ?? "/placeholder.jpg"}
          alt={post.imageUrl ? post.title : "Image non disponible"}
          fill
          className="object-cover"
          priority
        />
      </Box>

      <Box className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <LikeButton initialLikes={post.likes} />
        <ShareButton url={url} />
      </Box>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>Avis des lecteurs</Typography>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Box key={review.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {review.user.name} - {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">{review.content}</Typography>
              <Typography variant="caption">Note : {review.rating}/5</Typography>
            </Box>
          ))
        ) : (
          <Typography>Aucun avis pour cet article.</Typography>
        )}
      </Box>

    </Container>
  );
}
