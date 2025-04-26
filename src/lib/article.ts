export type Article = {
  title: string;
  content: string;
  imageUrl: string;
  categories: string[];
  author: string;
  createdAt: string; // ISO date string
  slug: string;
  likes: number;
  views: number;
};

// ✅ Mock temporaire
const articles: Article[] = [
  {
    title: 'Bien choisir son plafond tendu',
    content: '<p>Découvrez les critères techniques à prendre en compte.</p>',
    imageUrl: '/images/plafond1.jpg',
    categories: ['Technique', 'Plafond'],
    author: 'Admin',
    createdAt: '2024-05-01T12:00:00Z',
    slug: 'bien-choisir-son-plafond',
    likes: 10,
    views: 12
  },
  {
    title: 'Isolation acoustique et esthétique',
    content: '<p>Alliez confort sonore et design intérieur.</p>',
    imageUrl: '/images/acoustique.jpg',
    categories: ['Confort', 'Esthétique'],
    author: 'Admin',
    createdAt: '2024-06-01T12:00:00Z',
    slug: 'isolation-acoustique-esthetique',
    likes: 25,
    views: 28
  },
  {
    title: 'Plafond lumineux : avantages et inspirations',
    content: '<p>Intégrez des solutions LED pour transformer vos pièces.</p>',
    imageUrl: '/images/lumineux.jpg',
    categories: ['Esthétique', 'Innovation'],
    author: 'Admin',
    createdAt: '2024-06-15T12:00:00Z',
    slug: 'plafond-lumineux-avantages',
    likes: 18,
    views: 20
  },
  {
    title: 'Entretenir son plafond tendu',
    content: '<p>Conseils pratiques pour garder un plafond impeccable.</p>',
    imageUrl: '/images/entretien.jpg',
    categories: ['Technique'],
    author: 'Admin',
    createdAt: '2024-05-15T12:00:00Z',
    slug: 'entretenir-son-plafond',
    likes: 9,
    views: 17
  },
]

export function getArticlePostBySlug(slug: string): Article | null {
  return articles.find((a) => a.slug === slug) || null;
}

export function getAllArticles(): Article[] {
  return articles;
}