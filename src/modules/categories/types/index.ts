import { Document } from "@/modules/documents/types";

export type Category = {
  id: number;
  name: string;
  summary: string;
  icon: string;
  documents?: Array<Document>;
};
