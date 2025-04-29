
import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

//todo recup l'utilisateur et sa session
export async function POST(req: Request) {
  const { content, rating, articleId } = await req.json();

  try{
    const review = await prisma.review.create({
      data: {
        content,
        rating,
        articleId,
        userId: "anonymous", //en attendant session.user.id
      },
    });
    return NextResponse.json(review);

  }catch(error){
    console.error("erreur lors de la création de l'avis:",error);
    return NextResponse.json({ error: "Erreur interne"}, {status: 500});
  }

}