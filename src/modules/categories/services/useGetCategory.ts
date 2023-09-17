import { axiosInstance } from "@/utils/axios";
import { getQueryKey } from "@/utils/queryKey";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Response } from "@/types";
import { AxiosError } from "axios";
import { Category } from "../types";

const useGetCategory = (
  id?: number,
  options?: UseQueryOptions<Response<Category>, AxiosError>
) => {
  const queryKey = getQueryKey("categories", id);

  return useQuery<Response<Category>, AxiosError>(
    queryKey,
    () => axiosInstance.get<Category>(`/categories/${id}`),
    { ...options, enabled: !!id }
  );
};

export default useGetCategory;
