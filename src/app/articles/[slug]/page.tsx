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
  const fullUrl = `https://votredomaine.com/articles/${slug}`; // Ajoutez votre domaine réel

  return {
    title: `${post.title} - TonSite`,
    description,
    alternates: {
      canonical: fullUrl, // Important pour LinkedIn
    },
    openGraph: {
      title: post.title,
      description,
      url: fullUrl, // URL absolue requise
      images: [{
        url: post.imageUrl ?? 'https://votredomaine.com/placeholder.jpg', // URL absolue
        width: 1200, // Dimensions explicites
        height: 630,
        alt: `Image pour ${post.title}`,
      }],
      type: 'article',
      publishedTime: post.createdAt.toISOString(), // Important pour les articles
      siteName: "TonSite", // Nom de votre site
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.imageUrl ?? 'https://votredomaine.com/placeholder.jpg'], // URL absolue
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
        <LikeButton
          articleSlug={post.slug} // <-- Ajoutez cette prop
          initialLikes={post.likes || 26}
        />
        <ShareButton url={url}  title={post.title}/>
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
