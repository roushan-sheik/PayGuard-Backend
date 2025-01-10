import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    role: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
