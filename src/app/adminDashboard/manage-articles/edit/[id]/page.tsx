"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function EditArticlePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [article, setArticle] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "",
    author: "",
  });

  useEffect(() => {
    // Charger l'article existant pour le remplir dans le formulaire
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Erreur de chargement article", error);
      }
    }

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      });

      if (res.ok) {
        router.push("/adminDashboard/manage-articles"); // Retourner à la liste après édition
      } else {
        console.error("Erreur lors de la modification");
      }
    } catch (error) {
      console.error("Erreur modification article", error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>Modifier</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Titre"
          name="title"
          value={article.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contenu"
          name="content"
          value={article.content}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={6}
          required
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={article.imageUrl || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Catégorie"
          name="category"
          value={article.category || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Auteur"
          name="author"
          value={article.author || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Enregistrer
        </Button>
      </form>
    </Box>
  );
}
