import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type DeleteDocumentToCollectionData = {
  id: number;
};

const useDeleteDocumentFromCollection = (
  options?: UseMutationOptions<
    unknown,
    AxiosError,
    DeleteDocumentToCollectionData
  >
) => {
  const key = ["collections", "delete-document-from-collection"];

  return useMutation<unknown, AxiosError, DeleteDocumentToCollectionData>(
    key,
    ({ id }: DeleteDocumentToCollectionData) =>
      axiosInstance.delete(`/detail/${id}`),
    options
  );
};

export default useDeleteDocumentFromCollection;
