import { DropDownMenu } from "@/src/utils/components/TodoComp/DropDownMenu";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { LoginButton } from "@/src/auth/LoginButton";
import { getServerSession } from "next-auth";
import { TodoDisplay } from "@/src/utils/components/TodoComp/TodoDisplay";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { Sidebar } from "@/src/utils/components/TodoComp/Sidebar";

export default async function Home() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/landing");
  }
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: { todos: true },
  });
  const finishedTodos = user?.todos.filter(
    (todo: any) => todo.isDone === false
  );
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
      <header className="fixed top-5 right-5">
        <div>{session ? <DropDownMenu /> : <LoginButton />}</div>
      </header>
      <div className="fixed left-5 top-1">
        <Sidebar />
      </div>

      <main className="w-full max-w-4xl ">
        <section>
          <TodoDisplay />
        </section>
      </main>
    </div>
  );
}
