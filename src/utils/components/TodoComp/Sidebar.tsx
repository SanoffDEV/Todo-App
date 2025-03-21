"use client";

import { CheckCircle, ClipboardList } from "lucide-react";
import { CreateTodo } from "./CreateTodoBtn";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const handleClick = () => {
    router.push("/");
    setTimeout(() => {
      console.clear();
    }, 200);
  };
  const router = useRouter();
  return (
    <div className="relative w-80 h-screen flex flex-col items-center text-white py-10 mb-14">
      <div className="flex flex-col items-center flex-grow justify-center">
        <div className="text-black cursor-pointer hover:transition-all duration-300 ">
          <CreateTodo />
        </div>
      </div>

      <div className="xl:absolute xl:top-[35%] xl:left-1/2 xl:-translate-x-1/2 xl:w-[80%] xl:border-t xl:border-gray-300"></div>

      <div
        className="flex flex-col items-center flex-grow justify-center text-black cursor-pointer gap-2 hover:text-blue-500 hover:transition-all duration-300"
        onClick={() => handleClick()}
      >
        <ClipboardList className="w-6 h-6" />
        <span className="hidden xl:inline">My Tasks</span>
      </div>

      <div className="xl: xl:absolute xl:top-[65%] xl:left-1/2 xl:-translate-x-1/2 xl:w-[80%] xl:border-t xl:border-gray-300"></div>

      <div
        className="flex flex-col items-center flex-grow justify-center text-black cursor-pointer gap-2 hover:text-green-500 hover:transition-all duration-300"
        onClick={() => router.push("/finishedTodos")}
      >
        <CheckCircle className="w-6 h-6" />
        <span className="hidden xl:inline">Finished Tasks</span>
      </div>
    </div>
  );
};
