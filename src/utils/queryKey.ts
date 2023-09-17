export const getQueryKey = (key: string, params: string | number | unknown) => {
  return [key, params];
};
