import {z} from "zod"

// register data validation

export const registerSchema = z.object({
   firstName: z.string().min(2, "First name must be at least 2 characters"),
   lastName: z.string().min(2, "Last name must be at least 2 characters"),
   ownerEmail: z.email(),
   companyName: z.string().min(2, "Company name is required"),
   password: z.string().min(4, "Password must be at least 4 characters"),
   planId: z.number(),
})

export type RegisterInput = z.infer<typeof registerSchema>
