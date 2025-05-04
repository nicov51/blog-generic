// app/api/auth/register/route.ts
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
  }

  // Vérifie si l'email est déjà utilisé
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  if (!passwordRegex.test(password)) {
    return NextResponse.json({
      error: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un caractère spécial.",
    }, { status: 400 });
  }

  if (existingUser) {
    return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
  }

  // Hash le mot de passe
  const hashedPassword = await hash(password, 12);

  // Crée l'utilisateur
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
