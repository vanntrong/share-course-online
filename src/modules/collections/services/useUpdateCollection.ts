import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateCollectionPayload } from "../validations/updateCollection";

const useUpdateCollection = (
  options?: UseMutationOptions<
    unknown,
    AxiosError,
    { id: number; data: UpdateCollectionPayload }
  >
) => {
  return useMutation(
    ["collections", "update"],
    ({ id, data }: { id: number; data: UpdateCollectionPayload }) =>
      axiosInstance.put(`/collection/${id}`, data),
    options
  );
};

export default useUpdateCollection;
