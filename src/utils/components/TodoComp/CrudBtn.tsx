"use client";

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { motion } from "framer-motion";
import { UpdateTodoMenu } from "./UpdateTodo";

interface CrudProps {
  todoId: string;
}

export function Crud({ todoId }: CrudProps) {
  const [isClickedDelete, setIsClickedDelete] = React.useState(false);
  const [isClickedFinished, setIsClickedFinished] = React.useState(false);
  const [isClickedUpdate, setIsClickedUpdate] = React.useState<false | true>(
    false
  );

  const mutationUpdateStatus = useMutation({
    mutationFn: async (todoId: string) => {
      const response = await fetch("/api/post/updateStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId }),
      });
      console.log(response);
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  const mutation = useMutation({
    mutationFn: async (todoId: string) => {
      const response = await fetch(`/api/post/${todoId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId }),
      });
      console.log(response);
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  return (
    <div>
      {isClickedDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="w-96 px-6 py-4 shadow-lg rounded-2xl bg-white ">
              <CardTitle className="text-lg font-semibold translate-y-3">
                Are you sure you want to delete this todo ?
              </CardTitle>
              <CardContent className="mt-4 flex justify-center gap-4 translate-y-3">
                <Button
                  variant="destructive"
                  onClick={async () => {
                    await mutation.mutateAsync(todoId);
                    setIsClickedDelete(false);
                  }}
                >
                  Yes , delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsClickedDelete(false)}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
      {isClickedFinished && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="w-96 px-6 py-4 shadow-lg rounded-2xl bg-white ">
              <CardTitle className="text-lg font-semibold translate-y-3">
                Mark this todo as done ?
              </CardTitle>
              <CardContent className="mt-4 flex justify-center gap-4 translate-y-3">
                <Button
                  variant="outline"
                  className="bg-green-400 hover:bg-green-500"
                  onClick={async () => {
                    await mutationUpdateStatus.mutateAsync(todoId);
                    setIsClickedFinished(false);
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsClickedFinished(false)}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
      {isClickedUpdate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <UpdateTodoMenu todoId={todoId} />
          </motion.div>
        </div>
      )}

      {/* Boutons d'actions */}
      <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-auto">
        <Button
          variant="ghost"
          className="text-blue-500 hover:text-blue-600 transition"
          onClick={() => setIsClickedUpdate(true)}
        >
          <Pencil className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          className="text-red-500 hover:text-red-600 transition"
          onClick={() => setIsClickedDelete(true)}
        >
          <Trash2 className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          className="text-green-500 hover:text-green-600 transition"
          onClick={() => setIsClickedFinished(true)}
        >
          <CheckCircle className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
