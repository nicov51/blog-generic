import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { name: true, email: true },
    orderBy: { id: "desc" },
  });

  const csvRows = [
    ["Nom", "Email"],
    ...users.map((user) => [
      user.name ?? "",
      user.email ?? "",
    ]),
  ];

  const csvContent = csvRows.map((row) => row.join(",")).join("\n");

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment, filename=utilisateurs.csv",
    },
  });
}