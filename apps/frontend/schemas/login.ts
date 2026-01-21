import { z } from "zod";

// login data validation

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
