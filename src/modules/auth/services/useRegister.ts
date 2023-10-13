import { useAuthContext } from "@/providers/authProvider";
import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { setCookie } from "@/utils/cookie";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User } from "../types";
import { RegisterPayload } from "../validations/registerValidation";

const useRegister = (
  options?: UseMutationOptions<Response<User>, AxiosError, RegisterPayload>
) => {
  const { setUser } = useAuthContext();

  return useMutation<Response<User>, AxiosError, RegisterPayload>(
    ["register"],
    (data: RegisterPayload) =>
      axiosInstance.post<User>("/register", data, {
        baseURL: import.meta.env.VITE_API_URL,
      }),
    {
      ...options,
      onSuccess: (data) => {
        const token = data.data.token;
        setUser(data.data);

        setCookie("access-token", token);
      },
    }
  );
};

export default useRegister;
