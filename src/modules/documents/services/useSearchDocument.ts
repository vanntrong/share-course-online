import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { getQueryKey } from "@/utils/queryKey";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Document } from "../types";

const useSearchDocument = (
  params: { s?: string },
  options: UseQueryOptions<Response<Array<Document>>, AxiosError>
) => {
  const queryKey = getQueryKey("documents", params);

  return useQuery<Response<Array<Document>>, AxiosError>(
    queryKey,
    () => axiosInstance.get<Array<Document>>("/document/search", { params }),
    options
  );
};

export default useSearchDocument;
