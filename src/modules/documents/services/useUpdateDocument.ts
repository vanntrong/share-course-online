import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUpdateDocument = (
  options?: UseMutationOptions<
    unknown,
    AxiosError,
    { id: number; data: FormData }
  >
) => {
  return useMutation(
    ["documents", "update"],
    ({ id, data }: { id: number; data: FormData }) =>
      axiosInstance.put(`/document/${id}`, data),
    options
  );
};

export default useUpdateDocument;
