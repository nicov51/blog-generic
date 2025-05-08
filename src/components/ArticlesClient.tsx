'use client'

import { useState, useMemo } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import ArticleCard from "./ArticleCard";
import type { Article } from "@/lib/article";

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('recent');

  const filtered = useMemo(() => {
    return articles
      .filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) &&
        (category ? a.category === category : true)
      )
      .sort((a, b) => {
        if (sort === "views") return b.views - a.views;
        if (sort === "recent") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
  }, [search, category, sort, articles]);

  return (
    <>
      <div className="flex gap-4 flex-wrap mb-4 items-center">
        <TextField
          size="small"
          label="Rechercher"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormControl size="small" style={{ minWidth: 150 }}>
          <InputLabel id="category-label">Catégorie</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Catégorie"
           variant="outlined">
            <MenuItem value="">Toutes</MenuItem>
            <MenuItem value="TECHNIQUE">Technique</MenuItem>
            <MenuItem value="PLAFOND">Plafond</MenuItem>
            <MenuItem value="CONFORT">Confort</MenuItem>
            <MenuItem value="ESTHETIQUE">Esthétique</MenuItem>
            <MenuItem value="INNOVATION">Innovation</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" style={{ minWidth: 150 }}>
          <InputLabel id="sort-label">Tri</InputLabel>
          <Select
            labelId="sort-label"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Tri"
            variant="outlined">
            <MenuItem value="recent">Le + récent</MenuItem>
            <MenuItem value="views">Le + vu</MenuItem>
          </Select>
        </FormControl>
      </div>

      {filtered.length > 0 ? (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
          {filtered.map((article) => (
            <div key={article.slug} className="h-full">
              <ArticleCard {...article} />
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun article trouvé.</p>
      )}
    </>
  );
}
