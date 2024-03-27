import { z } from "zod";
export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
});

export const AddressSchema = z.object({
  // Create a schema for the address
  // When we get the error then the error will be of instacne of z.ZodError
});