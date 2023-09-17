import * as z from "zod";

export const updateCategoriesValidation = z.object({
  id: z.number(),
  name: z.string().min(3).max(255),
  summary: z.string().min(3).max(255),
  icon: z.string().min(3).max(255),
});

export type UpdateCategoriesPayload = z.infer<
  typeof updateCategoriesValidation
>;
