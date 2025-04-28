import { prisma } from "@/lib/prisma";
import { NextResponse} from "next/server";

export async function DELETE(_: Request, { params }: {params: { id: string} }) {
  try {
    await prisma.review.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Avis supprimé" });

  } catch (error) {
    console.error("l'avis n'a pas pu etre supprimé :",error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}