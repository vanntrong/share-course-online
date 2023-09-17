import * as z from "zod";

export const loginValidation = z.object({
  login: z.string().min(3).max(255),
  password: z.string().min(3).max(255),
  checkbox: z.boolean().refine((val) => {
    return val === true;
  }),
});

export type LoginPayload = z.infer<typeof loginValidation>;
