import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Collection } from "../types";

const useGetCollections = (
  options?: UseQueryOptions<Response<Array<Collection>>, AxiosError>
) => {
  const key = ["collections", "all"];

  return useQuery<Response<Array<Collection>>, AxiosError>(
    key,
    () => axiosInstance.get("/collection/"),
    options
  );
};

export default useGetCollections;
