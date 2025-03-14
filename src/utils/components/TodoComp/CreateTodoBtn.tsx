"use client";

import React, { useState } from "react";
import { CreateTodoMenu } from "@/src/utils/components/TodoComp/CreateTodoMenu";
import { CirclePlus, X } from "lucide-react";

export const CreateTodo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <span className="flex gap-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <CirclePlus className="text-base hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center" />
        <span className="hidden xl:inline">Create Task</span>
      </span>

      {isMenuOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
          <span
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white cursor-pointer hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close"
          >
            <X
              className="w-8 h-8 sm:w-10 sm:h-10"
              onClick={() => window.location.reload()}
            />
          </span>

          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg">
            <CreateTodoMenu />
          </div>
        </div>
      )}
    </div>
  );
};
