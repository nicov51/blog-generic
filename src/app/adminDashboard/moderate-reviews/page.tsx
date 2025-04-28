
import { prisma } from "@/lib/prisma";
import { Button } from "@mui/material";

export default async function ModerateReviewsPage() {
const reviews = await prisma.review.findMany({
  include: { user: true, article: true },
  orderBy: { createdAt: "desc" },
})

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Modération des avis</h1>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="border p-4 rounded-lg shadow-sm">
            <p className="font-semibold">{review.user.name || "Anonyme"} sur "{review.article.title}" :</p>
            <p className="my-2">{review.content}</p>
            <p>Note : {review.rating}/5</p>
            <form action={`/api/reviews/${review.id}`} method="POST">
              <input type="hidden" name="_method" value="DELETE"/>
              <Button variant="contained" color="error" type="submit">
                Supprimer
              </Button>
            </form>
          </li>
        ))}
      </ul>
    </div>

  );
}