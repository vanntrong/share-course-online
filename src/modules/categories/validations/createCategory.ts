import * as z from "zod";

export const createCategoryValidation = z.object({
  name: z.string().min(3).max(255),
  summary: z.string().min(3).max(255),
  icon: z.string().min(0).max(255).optional(),
});

export type CreateCategoryPayload = z.infer<typeof createCategoryValidation>;
