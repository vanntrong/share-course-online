export type Document = {
  id: number;
  title: string;
  summary: string;
  filePath: string;
  viewCount: number;
  downloadCount: number;
  type: string;
  created_at: number;
  thumb: string;
  isApproved: number;
  content: string;
  user_id: number;
  category_id: number;
  reviews?: Array<Review>;
};

export type Review = {
  id: number;
  document_id: number;
  name: string;
  email: string;
  content: string;
  created_at: number;
};
