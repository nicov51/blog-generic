import { getAllUsers } from "@/lib/user/getAllUsers";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">👥 Liste des utilisateurs</h1>

      <div className="mb-6">
        <a
          href="/api/users/export"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition shadow"
          download
        >
          📄 Exporter les emails (.csv)
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="py-3 px-4 border-b">👤 Nom</th>
            <th className="py-3 px-4 border-b">📧 Email</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
            >
              <td className="py-3 px-4 border-b font-medium text-gray-800">
                {user.name || "—"}
              </td>
              <td className="py-3 px-4 border-b text-blue-700 font-medium">
                {user.email}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
