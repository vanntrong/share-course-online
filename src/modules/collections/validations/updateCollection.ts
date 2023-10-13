import * as z from "zod";

export const updateCollectionValidation = z.object({
  id: z.number(),
  name: z.string().min(3).max(255),
  thumb: z.instanceof(File).or(z.string()),
});

export type UpdateCollectionPayload = z.infer<
  typeof updateCollectionValidation
>;
