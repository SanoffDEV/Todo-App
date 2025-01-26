"use client";

import React, { useState } from "react";
import { CreateTodoMenu } from "@/_component/CreateTodoMenu";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useMenuStore } from "@/_component/menu.store";

export const CreateTodo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant={"destructive"}
        className="h-16 w-44 text-sm bg-slate-400"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        Create Todo
      </Button>
      {isMenuOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
          {/* Bouton de fermeture */}
          <span
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white cursor-pointer hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close"
          >
            <X className="w-8 h-8 sm:w-10 sm:h-10" />
          </span>

          {/* Contenu de la modale */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg">
            <CreateTodoMenu />
          </div>
        </div>
      )}
    </div>
  );
};
