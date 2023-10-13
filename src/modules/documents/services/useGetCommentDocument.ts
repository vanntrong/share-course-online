import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Review } from "../types";

const useGetCommentDocument = (
  id: number,
  options: UseQueryOptions<Response<Array<Review>>, AxiosError>
) => {
  const key = ["documents", "comment", id];

  return useQuery<Response<Array<Review>>, AxiosError>(
    key,
    () => axiosInstance.get(`/review/`, { params: { doc: id } }),
    options
  );
};

export default useGetCommentDocument;
