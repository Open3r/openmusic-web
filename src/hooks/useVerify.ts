import { useState } from 'react';
import axios from 'axios';

function useVerify() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verify = async (email:string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/email/send`, {email});
      setLoading(false);
      return response.data;
    } catch (err:any) {
      setLoading(false);
      setError(err.response ? err.response.data : 'Network error');
      throw err;
    }
  };

  return {
    verify,
    loading,
    error,
  };
}

export default useVerify;