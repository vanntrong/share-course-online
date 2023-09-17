import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { UpdateCategoriesPayload } from "../validations/updateCategories";
import { AxiosError } from "axios";

const useUpdateCategory = (
  options?: UseMutationOptions<unknown, AxiosError, UpdateCategoriesPayload>
) => {
  return useMutation(
    ["categories", "update"],
    (data: UpdateCategoriesPayload) =>
      axiosInstance.put(`/categories/${data.id}`, data),
    options
  );
};

export default useUpdateCategory;
