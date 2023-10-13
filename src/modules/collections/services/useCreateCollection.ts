import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateCollectionPayload } from "../validations/createCollection";

const useCreateCollection = (
  options?: UseMutationOptions<unknown, AxiosError, CreateCollectionPayload>
) => {
  return useMutation(
    ["collections", "create"],
    (data: CreateCollectionPayload) => axiosInstance.post(`/collection/`, data),
    options
  );
};

export default useCreateCollection;
