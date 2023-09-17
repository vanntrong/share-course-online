import { axiosInstance } from "@/utils/axios";
import { getQueryKey } from "@/utils/queryKey";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Response } from "@/types";
import { AxiosError } from "axios";
import { queryClient } from "@/configs/appConfig";
import { Category } from "../types";

const useGetCategories = (
  options?: UseQueryOptions<Response<Array<Category>>, AxiosError>
) => {
  const queryKey = getQueryKey("categories", "all");

  return useQuery<Response<Array<Category>>, AxiosError>(
    queryKey,
    () => axiosInstance.get<Array<Category>>("/categories/"),
    options
  );
};

export const useInValidCategories = () => {
  const func = () => {
    queryClient.invalidateQueries(["categories"]);
  };

  return func;
};

export default useGetCategories;
