export const fetchWrapper = async ({
  url,
  method = "GET",
  body = null,
  token = "",
}) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
