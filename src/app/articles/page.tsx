
import { getAllArticles } from "@/lib/article";
import ArticleCard from "@/components/ArticleCard";
import { TextField, Select, InputLabel, FormControl, MenuItem } from "@mui/material";


export default async function ArticlesPage({searchParams: rawSearchParams,}: {
  searchParams: Promise<{ search?: string; category?: string; sort?: string }>;
}) {
  const searchParams = await rawSearchParams;

  const search = searchParams?.search?.toLowerCase() || "";
  const categoryFilter = searchParams?.category || "";
  const sortOption = searchParams?.sort || "recent";

  const articles = await getAllArticles();

  const filtered = articles
    .filter(
      (a) =>
        a.title.toLowerCase().includes(search) &&
        (categoryFilter ? a.category === categoryFilter : true)
    )
    .sort((a, b) => {
      if (sortOption === "views") return b.views - a.views;
      if (sortOption === "recent")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      return 0;
    });

  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "1rem" }}>
      <form method="GET" className="flex gap-4 flex-wrap mb-4 items-center">
        {/* SearchBar remplacé par un TextField en mode formulaire GET */}
        <TextField
          size="small"
          name="search"
          label="Rechercher"
          defaultValue={searchParams?.search || ""}
        />

        <FormControl size="small" style={{ minWidth: 150 }}>
          <InputLabel id="category-label">Catégorie</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            defaultValue={categoryFilter}
            label="Catégorie"
            variant="outlined"
          >
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
            name="sort"
            defaultValue={sortOption}
            label="Tri"
            variant="outlined"
          >
            <MenuItem value="recent">Le + récent</MenuItem>
            <MenuItem value="views">Le + vu</MenuItem>
          </Select>
        </FormControl>


        <button type="submit" className="hidden" />
      </form>

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
  );
}


