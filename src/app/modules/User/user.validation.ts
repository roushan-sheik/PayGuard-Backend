import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
