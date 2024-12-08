import { useState, useCallback } from "react";

const useApi = (baseURL) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (endpoint, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseURL}${endpoint}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        setData(responseData);
        return responseData;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [baseURL]
  );

  const fetchData = useCallback(
    (endpoint, headers) => request(endpoint, "GET", null, headers),
    [request]
  );

  const createData = useCallback(
    (endpoint, body, headers) => request(endpoint, "POST", body, headers),
    [request]
  );

  const updateData = useCallback(
    (endpoint, body, headers) => request(endpoint, "PUT", body, headers),
    [request]
  );

  const deleteData = useCallback(
    (endpoint, headers) => request(endpoint, "DELETE", null, headers),
    [request]
  );

  return {
    data,
    error,
    loading,
    fetchData,
    createData,
    updateData,
    deleteData,
  };
};

export default useApi;
