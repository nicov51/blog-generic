import { Metadata } from 'next';
import { notFound } from "next/navigation";
import { Typography, Container, Chip, Box } from "@mui/material";
import Image from "next/image";
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import ReviewForm from '@/components/ReviewForm';
import ReviewCard from '@/components/ReviewCard';
import { getArticleBySlug } from '@/lib/article';
import { getReviewsByArticleId} from "@/lib/reviews";



// ✅ MÉTADONNÉES DYNAMIQUES POUR SEO & PARTAGE
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);

  if (!post) {
    return {
      title: "Article introuvable - TonSite",
      description: "Cet article n'existe pas ou a été supprimé.",
    };
  }

  const description = post.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...';

  return {
    title: `${post.title} - TonSite`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: [post.imageUrl ?? '/placeholder.jpg'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.imageUrl ?? '/placeholder.jpg'],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);
  if (!post) return notFound();

  const url = `/articles/${post.slug}`;
  const reviews = await getReviewsByArticleId(post.id);

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
            <ReviewCard
              key={review.id}
              content={review.content}
              rating={review.rating}
              userName={review.user?.name}
              createdAt={review.createdAt}
            />
          ))
        ) : (
          <Typography>Aucun avis pour cet article.</Typography>
        )}
      </Box>

      <ReviewForm articleId={post.id} />


    </Container>
  );
}
