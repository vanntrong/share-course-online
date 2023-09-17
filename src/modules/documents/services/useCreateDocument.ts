import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useCreateDocument = (
  options?: UseMutationOptions<unknown, AxiosError, FormData>
) => {
  return useMutation(
    ["documents", "create"],
    (data: FormData) => axiosInstance.post(`/document/`, data),
    options
  );
};

export default useCreateDocument;
