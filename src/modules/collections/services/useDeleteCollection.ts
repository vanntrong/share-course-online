import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteCollection = (
  options: UseMutationOptions<unknown, AxiosError, { id: number | string }>
) => {
  const key = ["collections", "delete"];

  return useMutation<unknown, AxiosError, { id: number | string }>(
    key,
    ({ id }: { id: number | string }) =>
      axiosInstance.delete(`/collection/${id}`),
    options
  );
};

export default useDeleteCollection;
