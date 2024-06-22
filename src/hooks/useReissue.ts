import { useState } from "react";
import axios from "axios";
import { getCookie } from "../cookies/cookie";

function useReissue() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reissue = async () => {
    setLoading(true);
    setError(null);
    const refreshToken = getCookie("refreshToken");
    // const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reissue`,
        { refreshToken }
      );
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      setError(err.response ? err.response.data : "Network error");
      throw err;
    }
  };

  return {
    reissue,
    loading,
    error,
  };
}

export default useReissue;
