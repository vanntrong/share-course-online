import { axiosInstance } from "./axios";

export const downloadAsset = async (path: string, filename: string) => {
  const link = document.createElement("a");
  link.download = filename;
  link.setAttribute("href", path);

  link.click();
};

export const uploadFile = async (file: File | string) => {
  if (typeof file === "string") return file;

  return new Promise<string>((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    axiosInstance
      .post("/upload", formData, {
        baseURL: import.meta.env.VITE_UPLOAD_URL,
      })
      .then((res) => {
        resolve(res.data.url);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
