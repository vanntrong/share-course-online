import * as z from "zod";

export const createCollectionValidation = z.object({
  name: z.string().min(3).max(255),
  thumb: z.instanceof(File).or(z.string()),
});

export type CreateCollectionPayload = z.infer<
  typeof createCollectionValidation
>;
