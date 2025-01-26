import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { todoSchema, TodoType } from "@/pages/api/post/todo.shema";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export type TodoFormProps = {
  defaultValues?: TodoType;
  TodoId?: string;
};

export function CreateTodoMenu(props: TodoFormProps) {
  const form = useZodForm({
    schema: todoSchema,
    defaultValues: props.defaultValues,
  });

  const [date, setDate] = React.useState<Date | null>(null);

  const mutation = useMutation({
    mutationFn: async (values: TodoType) => {
      console.log("Sending values:", values); // Log des valeurs envoyées
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, date }),
      });

      console.log("Response status:", response.status); // Log du statut de la réponse

      if (!response.ok) {
        throw new Error("Failed to create Todo");
      }

      return await response.json();
    },
    onError: (error) => {
      console.error("Error during mutation:", error);
      toast.error("Failed to create Todo.");
    },
    onSuccess: () => {
      toast.success("Todo created successfully!");
      form.reset();
      setDate(null);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Create Todo</CardTitle>
        <CardDescription>Create a new todo quickly.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          form={form}
          onSubmit={async (values) => {
            await mutation.mutateAsync({
              ...values,
              date, // Assurez-vous d'ajouter la date sélectionnée
            });
          }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Name of your Todo"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Description of your Todo"
                  className="overflow-y-scroll scrollbar-none"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <Popover>
                  <FormLabel htmlFor="date" className="text-black">
                    Date
                  </FormLabel>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[280px] justify-start text-left font-normal"
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date || undefined}
                      onSelect={(selectedDate) => {
                        const currentDate = new Date();
                        if (!selectedDate) {
                          alert("No date selected");
                          return;
                        }
                        if (selectedDate > currentDate) {
                          setDate(selectedDate);
                          field.onChange(selectedDate);
                        } else {
                          alert("Date must be in the future");
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel htmlFor="hours" className="text-sm font-medium">
                  Hours
                </FormLabel>
                <Input
                  type="time"
                  id="hours"
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  {...field}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <Button className="w-full mt-4" type="submit">
            Create Todo
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
