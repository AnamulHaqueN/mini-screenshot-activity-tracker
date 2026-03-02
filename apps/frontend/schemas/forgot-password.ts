import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    email: z.email("Invalid email address"),
    otp: z.string().length(6, "OTP must be exactly 6 digits"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
