import { axiosInstance } from "@/utils/axios";
import { getQueryKey } from "@/utils/queryKey";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Document } from "../types";
import { Response } from "@/types";
import { AxiosError } from "axios";
import { queryClient } from "@/configs/appConfig";

export const useGetDocuments = (
  options?: UseQueryOptions<Response<Array<Document>>, AxiosError>
) => {
  const queryKey = getQueryKey("documents", "all");

  return useQuery<Response<Array<Document>>, AxiosError>(
    queryKey,
    () => axiosInstance.get<Array<Document>>("/document/"),
    options
  );
};

export const useInValidDocuments = () => {
  const func = () => {
    queryClient.invalidateQueries(["documents", "all"]);
  };

  return func;
};

export default useGetDocuments;
