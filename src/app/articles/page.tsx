'use client'

import { useState } from 'react'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'

// ✅ Mock temporaire
const articles = [
  {
    title: 'Bien choisir son plafond tendu',
    description: 'Découvrez les critères techniques à prendre en compte.',
    image: '/images/plafond1.jpg',
    categories: ['Technique', 'Plafond'],
    slug: 'bien-choisir-son-plafond',
    views: 150,
    createdAt: new Date('2024-05-01'),
  },
  {
    title: 'Isolation acoustique et esthétique',
    description: 'Alliez confort sonore et design intérieur.',
    image: '/images/acoustique.jpg',
    categories: ['Confort', 'Esthétique'],
    slug: 'isolation-acoustique-esthetique',
    views: 250,
    createdAt: new Date('2024-06-01'),
  },
  {
    title: 'Plafond lumineux : avantages et inspirations',
    description: 'Intégrez des solutions LED pour transformer vos pièces.',
    image: '/images/lumineux.jpg',
    categories: ['Esthétique', 'Innovation'],
    slug: 'plafond-lumineux-avantages',
    views: 180,
    createdAt: new Date('2024-06-15'),
  },
  {
    title: 'Entretenir son plafond tendu',
    description: 'Conseils pratiques pour garder un plafond impeccable.',
    image: '/images/entretien.jpg',
    categories: ['Technique'],
    slug: 'entretenir-son-plafond',
    views: 90,
    createdAt: new Date('2024-05-15'),
  },
]

export default function ArticlesPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortOption, setSortOption] = useState('recent')

  const filtered = articles
    .filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? a.categories.includes(categoryFilter) : true)
    )
    .sort((a, b) => {
      if (sortOption === 'views') return b.views - a.views
      if (sortOption === 'recent') return b.createdAt.getTime() - a.createdAt.getTime()
      return 0
    })

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <SearchBar value={search} onChange={setSearch} />
        <FormControl size="small" variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Catégorie</InputLabel>
          <Select
            value={categoryFilter}
            label="Catégorie"
            onChange={(e) => setCategoryFilter(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="">Toutes</MenuItem>
            <MenuItem value="Technique">Technique</MenuItem>
            <MenuItem value="Plafond">Plafond</MenuItem>
            <MenuItem value="Confort">Confort</MenuItem>
            <MenuItem value="Esthétique">Esthétique</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Tri</InputLabel>
          <Select
            value={sortOption}
            label="Tri"
            onChange={(e) => setSortOption(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="recent">Le + récent</MenuItem>
            <MenuItem value="views">Le + vu</MenuItem>
          </Select>
        </FormControl>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((article) => (
            <div key={article.slug}>
              <ArticleCard likes={0} {...article} />
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun article trouvé.</p>
      )}
    </div>
  )
}

