import { useState } from 'react';
import axios from 'axios';

function useReissue() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reissue = async (refreshToken:string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reissue`, { refreshToken });
      setLoading(false);
      return response.data;
    } catch (err:any) {
      setLoading(false);
      setError(err.response ? err.response.data : 'Network error');
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