import * as z from "zod";

export const createDocumentValidation = z.object({
  title: z.string().min(3).max(255),
  summary: z.string().min(3).max(255),
  filePath: z.instanceof(File).or(z.string()),
  type: z.string().optional(),
  content: z.string().min(3),
  thumb: z.instanceof(File).or(z.string()),
  isApproved: z.number().or(z.string()).optional(),
  category_id: z.number().or(z.string()).optional(),
});

export type CreateDocumentPayload = z.infer<typeof createDocumentValidation>;
