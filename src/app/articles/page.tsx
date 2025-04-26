'use client'

import { useState, useEffect } from 'react'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import {Article} from "@/lib/article";

export default function ArticlesPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortOption, setSortOption] = useState('recent')
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    // Récupérer les articles dynamiquement
    const fetchArticles = async () => {
      const articlesData: Article[] = [
        // Vous pouvez remplacer cela par un appel API ou une fonction qui récupère les articles
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
        // Ajoutez d'autres articles ici
      ];
      setArticles(articlesData);
    };

    fetchArticles();
  }, []);

  const filtered = articles
    .filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? a.categories.includes(categoryFilter) : true)
    )
    .sort((a, b) => {
      if (sortOption === 'views') return b.views - a.views
      if (sortOption === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
              <ArticleCard {...article} />
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun article trouvé.</p>
      )}
    </div>
  )
}

