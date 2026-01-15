import { z } from "zod";

// register data validation

export const registerSchema = z
  .object({
    ownerName: z.string().min(2, "Owner name is required"),
    ownerEmail: z.string().email(),
    companyName: z.string().min(2, "Comapany name is required"),
    password: z.string().min(4),
    confirmPassword: z.string(),
    planId: z.number(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
