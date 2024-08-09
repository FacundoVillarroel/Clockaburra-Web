export const buildQueryParams = (params) => {
  return Object.entries(params)
    .filter(
      ([_, value]) =>
        value !== undefined && value !== null && value.length !== 0
    ) // Filter null or empty values
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(",")}`;
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");
};
