"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useToast } from "@/src/components/hooks/use-toast";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/src/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { todoSchema, TodoType } from "@/pages/api/post/todo.shema";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/src/components/ui/popover";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect, useState } from "react";

export type TodoFormProps = {
  defaultValues?: TodoType;
  TodoId?: string;
};

export function UpdateTodoMenu({ todoId }: { todoId: string }) {
  const { toast } = useToast();
  const [todoData, setTodoData] = useState<TodoType | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const form = useZodForm({
    schema: todoSchema,
    defaultValues: {
      name: todoData?.name || "",
      description: todoData?.description || "",
      hours: todoData?.hours || "",
      date: todoData?.date || undefined,
    },
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`/api/post/${todoId}`, { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch todo");
        }
        const data = await response.json();
        setTodoData(data);
        form.setValue("name", data.name || "");
        form.setValue("description", data.description || "");
        form.setValue("hours", data.hours || "");
        form.setValue("date", data.date || null);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to fetch todo data",
          variant: "destructive",
          duration: 1000,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      }
    };

    fetchTodo();
  }, [todoId, form, toast]);

  useEffect(() => {
    if (todoData?.date) {
      const parsedDate = new Date(todoData.date);
      setDate(parsedDate);
      form.setValue("date", parsedDate); // Mettre à jour la valeur de la date dans le formulaire
    }
  }, [todoData, form]);

  const mutation = useMutation({
    mutationFn: async (values: TodoType) => {
      const response = await fetch(`/api/post/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Todo Updated!",
        description: "Your todo has been successfully updated.",
        duration: 1500,
        action: (
          <ToastAction
            onClick={() => {
              window.location.reload();
            }}
            altText="Close"
          >
            Close
          </ToastAction>
        ),
      });
    },
    onError: (error) => {
      console.error("Error updating todo:", error);
      toast({
        title: "Error",
        description: "Failed to update todo",
        variant: "destructive",
        duration: 1000,
        action: (
          <ToastAction
            altText="Close"
            onClick={() => {
              window.location.reload();
            }}
          >
            Close
          </ToastAction>
        ),
      });
    },
  });

  const handleSubmit = async (values: TodoType) => {
    // Ne pas réinitialiser la date si elle n'a pas été modifiée
    if (!values.date) {
      values.date = todoData?.date ? new Date(todoData.date) : new Date();
    }
    await mutation.mutateAsync(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Update Todo</CardTitle>
        <CardDescription>Update your todo details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} onSubmit={async (values) => handleSubmit(values)}>
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  maxLength={30}
                  id="name"
                  placeholder="Name of your Todo"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);
                    if (!value) {
                      // Ne pas réinitialiser si la valeur est vide
                      form.setValue("name", "");
                    }
                  }}
                />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel htmlFor="description" className="mt-4">
                  Description
                </FormLabel>
                <Textarea
                  maxLength={70}
                  id="description"
                  placeholder="Description of your Todo"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);
                    if (!value) {
                      // Ne pas réinitialiser si la valeur est vide
                      form.setValue("description", "");
                    }
                  }}
                />
              </FormItem>
            )}
          />

          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <Popover>
                  <FormLabel htmlFor="date" className="text-black mt-4">
                    Date
                  </FormLabel>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>Pick a date for your Todo</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date || undefined}
                      onSelect={(selectedDate) => {
                        if (!selectedDate) return;

                        const currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0); // Fixer à minuit pour éviter les erreurs

                        if (selectedDate >= currentDate) {
                          setDate(selectedDate);
                          field.onChange(selectedDate); // Mettre à jour le formulaire
                        } else {
                          toast({
                            title: "Erreur",
                            description: "La date doit être dans le futur",
                            duration: 2000,
                            action: (
                              <ToastAction altText="Fermer">Fermer</ToastAction>
                            ),
                          });
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {/* Hours Field */}
          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel htmlFor="hours" className="text-sm font-medium mt-4">
                  Hours
                </FormLabel>
                <Input
                  type="time"
                  id="hours"
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  {...field}
                  value={field.value || todoData?.hours || ""}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 w-full" variant={"outline"}>
            Update Todo
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
