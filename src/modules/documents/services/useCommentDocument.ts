import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type CommentDocumentPayload = {
  name: string;
  content: string;
};

const useCommentDocument = (
  options?: UseMutationOptions<
    unknown,
    AxiosError,
    CommentDocumentPayload & { id: number }
  >
) => {
  const key = ["documents", "comment"];

  return useMutation(
    key,
    ({ id, ...data }: CommentDocumentPayload & { id: number }) =>
      axiosInstance.post(`/review/${id}`, data),
    options
  );
};

export default useCommentDocument;
