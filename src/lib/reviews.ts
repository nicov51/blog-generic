import { prisma } from './prisma';

export async function getReviewsByArticleId(articleId: string) {
  const reviews = await prisma.review.findMany({
    where: { articleId },
    include: { user: true }, // Inclure les données utilisateur si elles existent
    orderBy: { createdAt: 'desc' },
  });

  // Filtrer les avis pour gérer les utilisateurs supprimés
  return reviews.map(review => {
    if (!review.user) {
      // Si l'utilisateur est supprimé
      return {
        ...review,
        user: null, // utilisateur par défaut
      };
    }
    return review;
  });
}
