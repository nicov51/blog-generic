//import { getArticlePostBySlug } from "@/src/lib/api";
import { notFound } from "next/navigation";
import { Typography, Container, Chip, Box } from "@mui/material";
import Image from "next/image";
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import { getArticlePostBySlug } from '@/lib/article';

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const post = getArticlePostBySlug(params.slug);

  if (!post) return notFound();

  const url = `/articles/${post.slug}`;

  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>

      <Box className="text-gray-500 mb-4">
        Publié le {new Date(post.createdAt).toLocaleDateString()} par {post.author}
      </Box>

      <Box className="flex gap-2 mb-6">
        {post.categories.map((category: string) => (
          <Chip key={category} label={category} color="primary" />
        ))}
      </Box>

      <Box className="mb-6 relative w-full h-[300px] rounded-xl overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
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

    </Container>
  );
}
