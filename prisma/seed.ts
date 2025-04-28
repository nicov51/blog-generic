// prisma/seed.ts

import { PrismaClient, Category } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
  // Création de deux users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice1@example.com',
      password: 'hashedpassword123', // tu hashes normalement
      name: 'Alice',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'bob1@example.com',
      password: 'hashedpassword456',
      name: 'Bob',
    },
  })

  // Création d'articles
  const article1 = await prisma.article.create({
    data: {
      title: 'Bien choisir son plafond tendu',
      content: '<p>Découvrez les critères techniques à prendre en compte.</p>',
      imageUrl: '/images/plafond1.jpg',
      category: Category.TECHNIQUE,
      author: 'Admin',
      slug: 'bien-choisir-son-plafond',
    },
  })

  const article2 = await prisma.article.create({
    data: {
      title: 'Isolation acoustique et esthétique',
      content: '<p>Alliez confort sonore et design intérieur.</p>',
      imageUrl: '/images/acoustique.jpg',
      category: Category.CONFORT,
      author: 'Admin',
      slug: 'isolation-acoustique-esthetique',
    },
  })

  const article3 = await prisma.article.create({
    data: {
      title: 'Plafond lumineux : avantages et inspirations',
      content: '<p>Intégrez des solutions LED pour transformer vos pièces.</p>',
      imageUrl: '/images/lumineux.jpg',
      category: Category.INNOVATION,
      author: 'Admin',
      slug: 'plafond-lumineux-avantages',
    },
  })

  const article4 = await prisma.article.create({
    data: {
      title: 'Entretenir son plafond tendu',
      content: '<p>Conseils pratiques pour garder un plafond impeccable.</p>',
      imageUrl: '/images/entretien.jpg',
      category: Category.TECHNIQUE,
      author: 'Admin',
      slug: 'entretenir-son-plafond',
    },
  })

  // Quelques reviews
  await prisma.review.createMany({
    data: [
      {
        content: "Super article, très utile !",
        rating: 5,
        userId: user1.id,
        articleId: article1.id,
      },
      {
        content: "Article intéressant mais un peu court",
        rating: 4,
        userId: user2.id,
        articleId: article2.id,
      },
      {
        content: "J'adore les idées lumineuses proposées",
        rating: 5,
        userId: user1.id,
        articleId: article3.id,
      },
    ],
  })
}

main()
  .then(() => {
    console.log('🌱 Database seeded!')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
