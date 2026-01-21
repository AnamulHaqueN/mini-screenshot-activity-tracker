import { z } from "zod";

export const addEmployeeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type AddEmployeeInput = z.infer<typeof addEmployeeSchema>;