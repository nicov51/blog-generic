
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json(
      { error: "Authentification requise" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }

  const { content, rating, articleId } = await req.json();

  // Validation des données
  if (!content || rating == null || !articleId) {
    return NextResponse.json(
      { error: "Tous les champs sont requis" },
      { status: 400 }
    );
  }

  try{
    const review = await prisma.review.create({
      data: {
        content,
        rating,
        articleId,
        userId: user.id,
      },
    });
    return NextResponse.json(review, { status: 201});

  }catch(error){
    console.error("erreur lors de la création de l'avis:",error);
    return NextResponse.json({ error: "Erreur interne"}, {status: 500});
  }

}