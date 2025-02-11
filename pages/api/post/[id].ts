import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth/next"; // ✅ Import correct
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.query; // ID depuis l'URL

    // ✅ Passer req et res à getServerSession
    const session = await getServerSession(req, res, authConfig);

    // Vérification de la session utilisateur
    if (!session || !session.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Missing or invalid todoId" });
    }

    try {
      // Suppression du todo
      await prisma.todo.delete({
        where: { id },
      });

      return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.error("Error deleting todo:", error);
      return res.status(500).json({
        message: "Todo failed to delete",
        error: error,
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
