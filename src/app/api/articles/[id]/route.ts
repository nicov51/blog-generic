import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Pour regénérer un slug si besoin
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, content, imageUrl, category, author } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Titre et contenu requis" }, { status: 400 });
  }

  try {
    const slug = generateSlug(title);

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl: imageUrl || null,
        category: category || null,
        author: author || null,
        slug,
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("Erreur modification article :", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Article supprimé" });
  } catch (error) {
    console.error("Erreur suppression article :", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
