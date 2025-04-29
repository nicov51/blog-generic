
import { prisma } from "@/lib/prisma";

export async function getArticlesPerformance() {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      views: true,
      likes: true,
      reviews: {
        select: { id: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return articles.map(article => ({
    id: article.id,
    title: article.title,
    views: article.views,
    likesCount: article.likes.length,
    reviewCount: article.reviews.length,
  }));
}
