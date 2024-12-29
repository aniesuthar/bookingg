import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1, "Doctor name is required").trim(),
    email:z.string().email()

  });
  
  
  // TypeScript type for createHospitalSchema
  export type CreateUserInput = z.infer<typeof createUserSchema>;