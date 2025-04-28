"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Article } from "@prisma/client";

type LightArticle = Pick<Article, "id" | "title" | "slug" | "createdAt">;

export default function ManageArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<LightArticle[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      await fetchArticles();
    };
    load();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error("Erreur lors du chargement");
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Erreur lors du chargement des articles");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirmer la suppression de cet article ?")) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur lors de la suppression");

      setSuccessMessage("Article supprimé avec succès");
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error) {
      console.error(error);
      setErrorMessage("Erreur lors de la suppression");
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>Gérer les articles</Typography>

      {articles.length === 0 ? (
        <Typography>Aucun article trouvé.</Typography>
      ) : (
        articles.map((article) => (
          <Card key={article.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{article.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Créé le {new Date(article.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                onClick={() => router.push(`/adminDashboard/manage-articles/edit/${article.id}`)}
              >
                Modifier
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleDelete(article.id)}
              >
                Supprimer
              </Button>
            </CardActions>
          </Card>
        ))
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
