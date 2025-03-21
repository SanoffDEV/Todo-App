import * as React from "react";
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

export type TodoFormProps = {
  defaultValues?: TodoType;
  TodoId?: string;
};

export function CreateTodoMenu(props: TodoFormProps) {
  const { toast } = useToast();
  const form = useZodForm({
    schema: todoSchema,
    defaultValues: props.defaultValues,
  });

  const [date, setDate] = React.useState<Date | null>(null);

  const mutation = useMutation({
    mutationFn: async (values: TodoType) => {
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, date }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to create Todo");
      }

      return await response.json();
    },
    onError: (error) => {
      console.error("Error during mutation:", error);
    },
    onSuccess: () => {
      form.reset();
      setDate(null);
      toast({
        title: "Todo Created!",
        description: "Your todo has been successfully created.",
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
              date: date || new Date(),
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
                  maxLength={30}
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
                <FormLabel htmlFor="description" className="mt-4">
                  Description
                </FormLabel>
                <Textarea
                  maxLength={70}
                  id="description"
                  placeholder="Description of your Todo"
                  className="overflow-y-scroll scrollbar-none"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);
                  }}
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
                        const currentDate = new Date();
                        if (!selectedDate) {
                          toast({
                            title: "Error",
                            description: "Date must be selected",
                            duration: 1000,
                            action: (
                              <ToastAction altText="Close">Close</ToastAction>
                            ),
                          });
                          return;
                        }
                        if (selectedDate > currentDate) {
                          setDate(selectedDate);
                          field.onChange(selectedDate);
                        } else {
                          toast({
                            title: "Error",
                            description: "Date must be in the future",
                            duration: 1000,
                            action: (
                              <ToastAction altText="Close">Close</ToastAction>
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
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 w-full" variant={"outline"}>
            Create Todo
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
