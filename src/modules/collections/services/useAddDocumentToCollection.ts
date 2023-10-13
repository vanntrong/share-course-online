import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type AddDocumentToCollectionData = {
  id: number;
  data: {
    document_id: number;
  };
};

const useAddDocumentToCollection = (
  options?: UseMutationOptions<unknown, AxiosError, AddDocumentToCollectionData>
) => {
  const key = ["collections", "add-document-to-collection"];

  return useMutation<unknown, AxiosError, AddDocumentToCollectionData>(
    key,
    ({ id, data }: AddDocumentToCollectionData) =>
      axiosInstance.post(`/detail/${id}`, data),
    options
  );
};

export default useAddDocumentToCollection;
