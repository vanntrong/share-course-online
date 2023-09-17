import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateCategoryPayload } from "../validations/createCategory";

const useCreateCategory = (
  options?: UseMutationOptions<unknown, AxiosError, CreateCategoryPayload>
) => {
  return useMutation(
    ["categories", "create"],
    (data: CreateCategoryPayload) => axiosInstance.post(`/categories/`, data),
    options
  );
};

export default useCreateCategory;
