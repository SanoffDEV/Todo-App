import { authConfig } from "@/pages/api/auth/[...nextauth]";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/card";
import { prisma } from "@/src/lib/prisma";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Calendar, Clock } from "lucide-react";
import { getServerSession } from "next-auth";
import { Crud } from "./CrudBtn"; // Import Crud component

export async function TodoDisplay() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user) {
    return <p>Not authenticated</p>;
  }

  // Récupérer l'utilisateur et ses tâches
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { todos: true },
  });

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="text-center w-full max-w-2xl">
        <h1 className="text-xl font-bold mb-4">Your Todos</h1>
        <div className="space-y-4 w-full">
          {user?.todos.map((todo) => (
            <Card
              key={todo.id}
              className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 md:p-6 h-auto md:h-24 w-full"
            >
              {/* Titre + Description */}
              <div className="flex-1 text-center md:text-left">
                <CardTitle className="text-lg font-semibold">
                  {todo.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {todo.description}
                </CardDescription>
              </div>

              {/* Séparateur en mode desktop */}
              <Separator className="my-3 md:hidden" />
              <Separator className="hidden md:block h-full mx-4" />

              {/* Date & Heure */}
              <CardContent className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  {new Date(todo.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  {todo.hours}
                </div>
              </CardContent>

              {/* Pass todo.id to the Crud component */}
              <Crud todoId={todo.id} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
