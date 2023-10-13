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

const FILE_TYPE_MAP: Record<string, string | undefined> = {
  bmp: "image/bmp",
  csv: "text/csv",
  odt: "application/vnd.oasis.opendocument.text",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  gif: "image/gif",
  htm: "text/htm",
  html: "text/html",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  pdf: "application/pdf",
  png: "image/png",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  tiff: "image/tiff",
  txt: "text/plain",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const getFileExtension = (filename: string) => {
  return filename.split(".").pop();
};

export const getFileType = (filename: string): string | undefined => {
  const fileExtension = getFileExtension(filename);
  if (!fileExtension) return undefined;

  return FILE_TYPE_MAP[fileExtension];
};
