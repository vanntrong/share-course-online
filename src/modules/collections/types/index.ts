import { Document } from "@/modules/documents/types";

export type Collection = {
  id: number;
  name: string;
  thumb: string;
  details: Array<{
    id: number;
    collection_id: number;
    document: Document;
  }>;
};
