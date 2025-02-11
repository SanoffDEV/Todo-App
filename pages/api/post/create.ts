import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth"; // Import correct de getSession
import { authConfig } from "../auth/[...nextauth]";
import { prisma } from "@/src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, description, date, hours } = req.body;

    const session = await getServerSession(req, res, authConfig);

    if (!session || !session.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!name || !description || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const newTodo = await prisma.todo.create({
        data: {
          name,
          description,
          date: new Date(date),
          hours,
          userId: session.user.id,
        },
      });

      return res.status(200).json({ message: "Todo created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create Todo" });
    }
  }
}
