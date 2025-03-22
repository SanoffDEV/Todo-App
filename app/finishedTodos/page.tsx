import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { LoginButton } from "@/src/auth/LoginButton";
import { DropDownMenu } from "@/src/utils/components/TodoComp/DropDownMenu";
import { FinishedTodo } from "@/src/utils/components/TodoComp/FinishedTodo";
import { Sidebar } from "@/src/utils/components/TodoComp/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function FinishedTodos() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/landing");
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
      <header className="fixed top-5 right-5">
        <div>{session ? <DropDownMenu /> : <LoginButton />}</div>
      </header>
      <header className="absolute top-5 right-5"></header>
      <div className="fixed xl:left-4  left-2 top-2">
        <Sidebar />
      </div>

      <main className="w-full max-w-4xl ">
        <section className="flex flex-col md:ml-0 ml-6  ">
          <FinishedTodo />
        </section>
      </main>
    </div>
  );
}
