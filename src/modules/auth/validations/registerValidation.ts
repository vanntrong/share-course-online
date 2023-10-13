import * as z from "zod";

export const registerValidation = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  login: z.string().min(3).max(255),
  password: z.string().min(3).max(255),
  checkbox: z.boolean().refine((val) => {
    return val === true;
  }),
});

export type RegisterPayload = z.infer<typeof registerValidation>;
