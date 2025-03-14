"use client";

import { useMutation } from "@tanstack/react-query";
import { LucideRotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { motion } from "framer-motion";

interface FinshedCrudProps {
  todoId: string;
}

export const FinshedCrud = ({ todoId }: FinshedCrudProps) => {
  const [isClickedDelete, setIsClickedDelete] = useState(false);
  const [isClickedFinished, setIsClickedFinished] = useState(false);

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
    <div className="-translate-y-3">
      {isClickedDelete && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          style={{ zIndex: 100 }}
        >
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
                Restore this todo ?
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

      <div className="flex items-center gap-4  md:mt-0 md:ml-auto">
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
          <LucideRotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
