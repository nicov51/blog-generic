import { prisma } from "@/lib/prisma";
import { Article as PrismaArticle } from "@prisma/client";

export type Article = PrismaArticle & {
  likes: number;
};

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { likes: true },
      },
    },
  });

  if (!article) return null;

  return {
    ...article,
    likes: article._count.likes,
  };
}

export async function getArticleById(id: string): Promise<Article | null> {
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      _count: {
        select: { likes: true },
      },
    },
  });

  if (!article) return null;

  return {
    ...article,
    likes: article._count.likes,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { likes: true },
      },
    },
  });

  return articles.map((article) => ({
    ...article,
    likes: article._count.likes,
  }));
}
