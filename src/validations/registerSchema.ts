import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Please Enter a Valid Email Adrress"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })
  .required();

export type RegisterSchema = z.infer<typeof registerSchema>;
