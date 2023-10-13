import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Collection } from "../types";

const useGetCollection = (
  id?: number,
  options?: UseQueryOptions<Response<Collection>, AxiosError>
) => {
  const key = ["collection", id];

  return useQuery<Response<Collection>, AxiosError>(
    key,
    () => axiosInstance.get(`/collection/${id}`),
    options
  );
};

export default useGetCollection;
