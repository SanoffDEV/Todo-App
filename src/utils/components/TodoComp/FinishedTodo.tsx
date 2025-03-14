import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Calendar, Clock } from "lucide-react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/src/lib/prisma";
import { FinshedCrud } from "./FinishedCrudBts";
import { log } from "console";

export async function FinishedTodo() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user) {
    return <p>Not authenticated</p>;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { todos: true },
  });

  const finishedTodos = user?.todos.filter((todo) => todo.isDone === true);

  const userInfo = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { todos: true },
  });

  return (
    <div className="flex flex-col items-center justify-center px-4 mt-24">
      <div className="hidden w-0 h-0">{userInfo?.todos.length}</div>
      {finishedTodos?.length === 0 ? (
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-700">
            You have no finished todos for now
          </h2>
        </div>
      ) : (
        <div className="text-center w-full max-w-2xl">
          <div className="space-y-4 w-full">
            {finishedTodos?.map((todo) => (
              <Card
                key={todo.id}
                className="flex flex-col md:flex-row max-w-80 md:max-w-full items-center bg-white shadow-md rounded-lg pt-4 md:p-6 h-auto  md:min-h-24  w-full max-h-80"
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
                <div className="flex flex-col ">
                  <CardContent
                    className={
                      "flex flex-row items-center gap-2 md:gap-4 text-gray-700 text-sm"
                    }
                  >
                    <div className="flex items-center gap-2 pt-6">
                      <span className="text-black ">To do the</span>
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {new Date(todo.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      {todo.hours ? (
                        <Clock className="w-4 h-4 text-gray-500" />
                      ) : (
                        ""
                      )}
                      {todo.hours}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {todo.finishedAt === null ? (
                      ""
                    ) : (
                      <div className="text-sm text-gray-500 flex items-center gap-2 ">
                        <span className="text-black ">Done at</span>
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {todo.finishedAt === null
                          ? ""
                          : todo.finishedAt.toLocaleDateString()}
                        <Clock className="w-4 h-4 text-gray-500 ml-2" />
                        {todo.finishedAt === null
                          ? ""
                          : todo.finishedAt.toLocaleTimeString().slice(0, 5)}
                      </div>
                    )}
                  </CardFooter>
                </div>

                <FinshedCrud todoId={todo.id} />
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
