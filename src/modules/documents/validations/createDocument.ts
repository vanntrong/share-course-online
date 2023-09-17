import * as z from "zod";

export const createDocumentValidation = z.object({
  title: z.string().min(3).max(255),
  summary: z.string().min(3).max(255),
  filePath: z.instanceof(File).or(z.string().min(3).max(255)),
  type: z.string().min(3).max(255).optional(),
  content: z.string().min(3).max(255).optional(),
  thumb: z.instanceof(File).or(z.string().min(3).max(255)),
  isApproved: z.number().optional(),
});

export type CreateDocumentPayload = z.infer<typeof createDocumentValidation>;
