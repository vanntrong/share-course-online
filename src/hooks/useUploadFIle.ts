import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UploadFileResponse {
  url: string;
}

const useUploadFile = (
  options?: UseMutationOptions<
    Response<UploadFileResponse>,
    AxiosError,
    FormData
  >
) => {
  return useMutation<Response<UploadFileResponse>, AxiosError, FormData>(
    ["uploadFile"],
    (data: FormData) => {
      return axiosInstance.post<UploadFileResponse>("/upload", data, {
        baseURL: import.meta.env.VITE_UPLOAD_URL,
      });
    },
    options
  );
};

export default useUploadFile;
