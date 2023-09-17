import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateDocumentPayload } from "../validations/createDocument";

const useCreateDocument = (
  options?: UseMutationOptions<unknown, AxiosError, CreateDocumentPayload>
) => {
  return useMutation(
    ["documents", "create"],
    (data: CreateDocumentPayload) => axiosInstance.post(`/document/`, data),
    options
  );
};

export default useCreateDocument;
