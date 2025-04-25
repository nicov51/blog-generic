//import { getArticlePostBySlug } from "@/src/lib/api";
import { notFound } from "next/navigation";
import { Typography, Container, Chip, Box } from "@mui/material";
import Image from "next/image";

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const post = await getArticlePostBySlug(params.slug);

  if (!post) return notFound();

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
    </Container>
  );
}
