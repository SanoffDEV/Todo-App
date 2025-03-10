import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { session } from "../auth/getServerSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    const session = await getServerSession(req, res, authConfig);

    if (!session || !session.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Missing or invalid todoId" });
    }

    try {
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
  }
  if (req.method === "PUT") {
    try {
      const { name, description, date, hours } = req.body;
      const updateTodo = await prisma.todo.update({
        where: { id: req.query.id as string },
        data: { name, description, date, hours },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      return res.status(500).json({
        message: "Todo failed to update",
        error: error,
      });
    }

    return res.status(200).json({ message: "Todo updated successfully" });
  }
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authConfig);
      const { id } = req.query;

      if (!session || !session.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const getTodo = await prisma.todo.findUnique({
        where: { id: id as string },
      });

      if (!getTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.status(200).json(getTodo);
    } catch (error) {
      console.error("Error fetching todo:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
