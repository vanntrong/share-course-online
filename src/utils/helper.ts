export const getAsset = (path: string) => {
  if (path.startsWith("http") || path.startsWith("https")) return path;
  return `${import.meta.env.VITE_API_URL}${path}`;
};
