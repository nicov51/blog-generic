import { prisma } from './prisma';

export async function getReviewsByArticleId(articleId: string) {
  return prisma.review.findMany({
    where: { articleId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  })
}