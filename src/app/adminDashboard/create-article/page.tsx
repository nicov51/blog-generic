"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Box, MenuItem, Select, TextField, Button, Typography} from "@mui/material";
import {Category} from "@prisma/client";


export default function CreateArticlePage() {
  const router = useRouter();

  const [title, setTitle] =useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [category, setCategory] = useState<Category | ''>('');
  const [author, setAuthor] = useState("");

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("api/articles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title, content, imageUrl, category, author}),
      }
      );

    if (res.ok) {
      router.push("/adminDashboard/manage-articles");
    } else {
      alert ("un probleme est survenu")
    }
  };

  return (
<Box component="form" onSubmit={handelSubmit}
sx={{ maxWidth: 800, mx: "auto", p: 2 }}>

  <Typography variant="h4" gutterBottom>
    Créer un nouvel article
  </Typography>

  <TextField
    label="Titre"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    fullWidth
    margin="normal"
    required>
  </TextField>

  <TextField
    label="Contenu"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    fullWidth
    multiline
    rows={6}
    margin="normal"
    required
  />

  <TextField
    label="URL de l'image (optionnel)"
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
    fullWidth
    margin="normal"
  />

  <Select
    value={category}
    onChange={(e) => setCategory(e.target.value as Category)}
    displayEmpty
    fullWidth
    sx={{ mt: 2 }}
    variant="outlined">

    <MenuItem value=""> Choisir une categorie</MenuItem>
    {Object.values(category).map((cat) => (
      <MenuItem key={cat} value={cat}>
        {cat}
      </MenuItem>
    ))}
  </Select>

  <TextField
    label="Auteur (optionnel)"
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
    fullWidth
    margin="normal"
  />

  <Button type="submit" color="primary" variant="contained"
          sx={{ mt: 2 }}>
    Publier article
  </Button>

</Box>
  );
}