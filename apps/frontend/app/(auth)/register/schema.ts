import { z } from "zod";

// register data validation

export const registerSchema = z.object({
  ownerName: z.string().min(2, "Owner name is required"),
  ownerEmail: z.email(),
  companyName: z.string().min(2, "Company name is required"),
  password: z.string().min(4),
  planId: z.number(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
