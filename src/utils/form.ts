// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
};
