import { DropDownMenu } from "@/src/utils/components/TodoComp/DropDownMenu";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { LoginButton } from "@/src/auth/LoginButton";
import { CreateTodo } from "@/src/utils/components/TodoComp/CreateTodoBtn";
import { getServerSession } from "next-auth";
import { TodoDisplay } from "@/src/utils/components/TodoComp/TodoDisplay";

export default async function Home() {
  const session = await getServerSession(authConfig);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative">
      {/* Header avec Menu (à droite) et Bouton Créer (à gauche) */}
      <header className="absolute top-5 w-full flex justify-between px-7">
        <div>{session && <CreateTodo />}</div>
        <div>{session ? <DropDownMenu /> : <LoginButton />}</div>
      </header>

      {/* Contenu principal */}
      {session ? (
        <main className="w-full max-w-4xl ">
          {/* Affichage des Todos */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <TodoDisplay />
          </section>
        </main>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Your Best Todo App
          </h1>
          <p className="text-gray-500 mt-2">
            Organize your life with the best Todo App.
          </p>
        </div>
      )}
    </div>
  );
}
