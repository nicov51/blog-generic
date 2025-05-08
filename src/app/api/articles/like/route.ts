import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Lecture unique du body
    const { articleSlug, userEmail } = await req.json();

    // Trouver l'utilisateur et l'article en parallèle
    const [user, article] = await Promise.all([
      prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true }
      }),
      prisma.article.findUnique({
        where: { slug: articleSlug },
        select: { id: true }
      })
    ]);

    if (!user || !article) {
      return NextResponse.json(
        { error: "Utilisateur ou article non trouvé" },
        { status: 404 }
      );
    }

    // Création du like
    try {
      await prisma.like.create({
        data: {
          userId: user.id,
          articleId: article.id
        }
      });
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        return NextResponse.json(
          { error: "Vous avez déjà liké cet article" },
          { status: 409 }
        );
      }
      throw error;
    }

    // Retour simple
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement" },
      { status: 500 }
    );
  }
}

