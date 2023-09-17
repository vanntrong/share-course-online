import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteCategory = (
  options?: UseMutationOptions<unknown, AxiosError, { id: number }>
) => {
  return useMutation(
    ["categories", "delete"],
    (data: { id: number }) => axiosInstance.delete(`/categories/${data.id}`),
    options
  );
};

export default useDeleteCategory;
