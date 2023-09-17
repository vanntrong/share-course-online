import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { LoginPayload } from "../validations/loginValidation";
import { User } from "../types";
import { Response } from "@/types";
import { AxiosError } from "axios";
import { setCookie } from "@/utils/cookie";
import { useAuthContext } from "@/providers/authProvider";

const useLogin = (
  options?: UseMutationOptions<Response<User>, AxiosError, LoginPayload>
) => {
  const { setUser } = useAuthContext();

  return useMutation<Response<User>, AxiosError, LoginPayload>(
    ["login"],
    (data: LoginPayload) =>
      axiosInstance.post<User>("/login", data, {
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

export default useLogin;
