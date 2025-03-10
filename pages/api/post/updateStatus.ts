import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { any, date } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const session = await getServerSession(req, res, authConfig);
  if (!session || !session.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { todoId } = req.body;

    if (!todoId) {
      return res.status(400).json({ message: "ID de la tâche requis" });
    }

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
      select: { isDone: true },
    });

    if (!todo) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { isDone: !todo.isDone, finishedAt: new Date() },
    });

    return res.status(200).json(updatedTodo);
  } catch (error) {
    return;
  }
}
