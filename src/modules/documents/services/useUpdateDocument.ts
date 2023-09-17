import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateDocumentPayload } from "../validations/updateDocument";

const useUpdateDocument = (
  options?: UseMutationOptions<
    unknown,
    AxiosError,
    { id: number; data: UpdateDocumentPayload }
  >
) => {
  return useMutation(
    ["documents", "update"],
    ({ id, data }: { id: number; data: UpdateDocumentPayload }) =>
      axiosInstance.put(`/document/${id}`, data),
    options
  );
};

export default useUpdateDocument;
