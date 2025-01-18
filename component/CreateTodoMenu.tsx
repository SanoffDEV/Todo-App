import * as React from "react";

// Composants et Store
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useMenuStore } from "./menu.store";

// Icônes
import { CalendarIcon, X } from "lucide-react";

// Utilitaires
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function CreateTodoMenu() {
  const { isMenuOpen, setIsMenuOpen } = useMenuStore();
  const [date, setDate] = React.useState<Date>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Create Todo</CardTitle>
        <CardDescription>Create a new todo quickly .</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your Todo" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Textarea
                id="totoDescription"
                placeholder="Description of your Todo"
                className=" overflow-y-scroll scrollbar-none"
              />
            </div>
            <Popover>
              <Label htmlFor="name">Date</Label>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal ",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span>Pick a date for your todo</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    const currentDate = new Date();

                    if (!selectedDate) {
                      alert("No date selected");
                      return;
                    }

                    const parsedDate = new Date(selectedDate); // Convert `selectedDate` to a Date object

                    if (parsedDate > currentDate) {
                      setDate(parsedDate);
                    } else {
                      alert("Date must be in the future");
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="totoHours" className="text-sm font-medium ">
                Hours
              </Label>
              <Input
                type="time"
                id="totoHours"
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <Button className="w-full mt-4">Create Todo</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
