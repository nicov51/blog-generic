import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Petite fonction utilitaire pour slugifier
//on demande pas a l'utilisateur de l'ecrire coté front
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Enlève les caractères spéciaux
    .replace(/\s+/g, "-"); // Remplace les espaces par des tirets
}

export async function POST(req: Request) {
  const {title, content, imageUrl, category, author} = await req.json();

  if (!title || !content) {
    return NextResponse.json({error: "Titre et contenu requis"},{ status: 400});
  }

  const slug = generateSlug(title);

  try {
    const article = await prisma.article.create({
      data: {
        title,
        content,
        imageUrl: imageUrl || null,
        category: category || null,
        author: author || null,
        slug,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error("Erreur lors de la création",error);
    return NextResponse.json({error: "Erreur interne"}, {status: 500});
  }
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Erreur récupération articles :", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}