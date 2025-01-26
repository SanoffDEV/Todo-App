import { z } from "zod";

export const todoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  hours: z.string(),
  date: z.date(),
});
export type TodoType = z.infer<typeof todoSchema>;
