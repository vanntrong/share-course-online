import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { getQueryKey } from "@/utils/queryKey";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Document } from "../types";

export const useGetDocument = (
  id?: string,
  options?: UseQueryOptions<Response<Document>, AxiosError>
) => {
  const queryKey = getQueryKey("documents", { id });

  return useQuery<Response<Document>, AxiosError>(
    queryKey,
    () => axiosInstance.get<Document>(`/document/${id}`),
    options
  );
};

export default useGetDocument;
