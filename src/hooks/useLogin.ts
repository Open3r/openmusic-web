import { useState } from 'react';
import axios from 'axios';

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email:string, password:string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });

      return response.data;
    } catch (err:any) {
      setError(err.response ? err.response.data : 'Network error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
}

export default useLogin;
