import { useState } from "react";

const useApi = (apiFunc) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const request = async (...args) => {
    setIsLoading(true);
    try {
      const response = await apiFunc(...args);
      setMsg(response.msg);
      setError(null);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      setError(error.msg);
      throw error;
    }
  };
  return [request, isLoading, error, msg];
};

export default useApi;
