"use client";

import { CheckCircle, ClipboardList } from "lucide-react";
import { CreateTodo } from "./CreateTodoBtn";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="relative w-80 h-screen flex flex-col items-center text-white py-10">
      {/* Bouton Create Todo */}
      <div className="flex flex-col items-center flex-grow justify-center">
        <div className="text-black cursor-pointer hover:transition-all duration-300 ">
          <CreateTodo />
        </div>
      </div>

      {/* Ligne de séparation */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[80%] border-t border-gray-300"></div>

      {/* My Todos */}
      <div
        className="flex flex-col items-center flex-grow justify-center text-black cursor-pointer gap-2 hover:text-blue-500 hover:transition-all duration-300"
        onClick={() => router.push("/")}
      >
        <ClipboardList className="w-6 h-6" />
        <span>My Tasks</span>
      </div>

      {/* Ligne de séparation */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[80%] border-t border-gray-300"></div>

      {/* Finished Todos */}
      <div
        className="flex flex-col items-center flex-grow justify-center text-black cursor-pointer gap-2 hover:text-green-500 hover:transition-all duration-300"
        onClick={() => router.push("/finishedTodos")}
      >
        <CheckCircle className="w-6 h-6" />
        <span>Finished Tasks</span>
      </div>
    </div>
  );
};
