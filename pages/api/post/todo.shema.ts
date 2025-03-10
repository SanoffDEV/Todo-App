import { finished } from "stream";
import { z } from "zod";

export const todoSchema = z.object({
  name: z.string().min(1, "Name is required").max(40, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description is too long"),
  hours: z.string().nullable().optional().default(""),
  date: z.date(),
});
export type TodoType = z.infer<typeof todoSchema>;
