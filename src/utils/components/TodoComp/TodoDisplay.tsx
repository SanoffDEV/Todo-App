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
import { Crud } from "./CrudBtn";

export async function TodoDisplay() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user) {
    return <p>Not authenticated</p>;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { todos: true },
  });

  const finishedTodos = user?.todos.filter((todo) => todo.isDone === false);

  return (
    <div className=" flex flex-col items-center justify-center mr-6 max-w-screen-sm ">
      <div className="text-center lg:w-full lg:max-w-2xl">
        <div className="space-y-4 lg:w-full mt-24 flex flex-col items-center justify-center ">
          {finishedTodos?.length === 0 ? (
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-700">
                You have no todos for now
              </h2>
            </div>
          ) : (
            finishedTodos?.map((todo) => (
              <Card
                key={todo.id}
                className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-lg p-4 h-auto w-72 md:w-full"
              >
                <div className="flex-1 text-center md:text-left">
                  <CardTitle className="text-lg font-semibold">
                    {todo.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {todo.description}
                  </CardDescription>
                </div>

                <Separator className="my-3 md:hidden" />
                <Separator className="hidden md:block h-full mx-4" />

                <CardContent className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-4 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {new Date(todo.date).toLocaleDateString()}
                  </div>
                  {todo.hours && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      {todo.hours}
                    </div>
                  )}
                </CardContent>

                <Crud todoId={todo.id} />
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
