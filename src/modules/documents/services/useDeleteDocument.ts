import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteDocument = (
  options?: UseMutationOptions<unknown, AxiosError, { id: string | number }>
) => {
  return useMutation(
    ["documents", "delete"],
    (data: { id: string | number }) =>
      axiosInstance.delete(`/document/${data.id}`),
    options
  );
};

export default useDeleteDocument;
