import { getArticlesPerformance } from "@/lib/getArticlesPerformance";

export default async function ArticlePerformancePage() {
  const performances = await getArticlesPerformance();

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Suivi des performances</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="py-3 px-4 border-b">Titre</th>
            <th className="py-3 px-4 border-b">👁️ Vues</th>
            <th className="py-3 px-4 border-b">❤️ Likes</th>
            <th className="py-3 px-4 border-b">💬 Avis</th>
          </tr>
          </thead>
          <tbody>
          {performances.map((article, index) => (
            <tr
              key={article.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
            >
              <td className="py-3 px-4 border-b font-medium text-gray-800">
                {article.title}
              </td>
              <td className="py-3 px-4 border-b text-blue-600 font-semibold">
                {article.views}
              </td>
              <td className="py-3 px-4 border-b text-pink-600 font-semibold">
                {article.likesCount}
              </td>
              <td className="py-3 px-4 border-b text-green-600 font-semibold">
                {article.reviewCount}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
