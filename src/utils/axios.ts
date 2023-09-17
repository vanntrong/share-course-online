import axios from "axios";
import { getCookie } from "./cookie";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("access-token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response.data.message || "Something went wrong";

    toast.error(message);

    return Promise.reject(message);
  }
);
