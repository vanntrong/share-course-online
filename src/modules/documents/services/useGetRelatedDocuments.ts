import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { getQueryKey } from "@/utils/queryKey";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Document } from "../types";

export const useGetRelatedDocuments = (
  id?: string,
  options?: UseQueryOptions<Response<Array<Document>>, AxiosError>
) => {
  const queryKey = getQueryKey("documents-related", { id });

  return useQuery<Response<Array<Document>>, AxiosError>(
    queryKey,
    () => axiosInstance.get<Array<Document>>(`/document/${id}/related`),
    options
  );
};

export default useGetRelatedDocuments;
