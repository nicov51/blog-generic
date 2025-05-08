
import { getAllArticles } from "@/lib/article";
import ArticlesClient from "@/components/ArticlesClient";


export const metadata = {
  title: "Tous les articles - TonSite",
  description: "Découvrez tous nos articles techniques et esthétiques autour des plafonds tendus.",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "1rem" }}>
      <ArticlesClient articles={articles} />
    </div>
  );
}

