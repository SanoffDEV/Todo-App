import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth"; // Import correct de getSession
import { authConfig } from "../auth/[...nextauth]";
import { prisma } from "@/src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Parse the request body
    const { name, description, date, hours } = req.body;

    // Vérifiez si la session est active et si l'utilisateur est connecté
    const session = await getServerSession(req, res, authConfig);

    if (!session || !session.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Assurez-vous que les champs requis sont présents
    if (!name || !description || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Process and save the todo (e.g., save to a database)
    // Ici, tu peux appeler Prisma ou un autre ORM pour enregistrer la tâche
    try {
      // Exemple d'ajout d'un Todo avec Prisma (ou autre ORM)
      // Remplace cette partie par la logique de sauvegarde dans ta base de données

      const newTodo = await prisma.todo.create({
        data: {
          name,
          description,
          date: new Date(date),
          hours,
          userId: session.user.id, // Utilisateur connecté
        },
      });

      return res.status(200).json({ message: "Todo created successfully" });
    } catch (error) {
      console.error("Error creating todo:", error);
      return res.status(500).json({ message: "Failed to create Todo" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
