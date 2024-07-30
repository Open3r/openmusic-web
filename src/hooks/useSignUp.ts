import { useState } from 'react';
import axios from 'axios';

function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (nickname:string, email:string, password:string, emailCode:string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, { nickname, email, emailCode, password });
      setLoading(false);
      return response.data;
    } catch (err:any) {
      setLoading(false);
      setError(err.response ? err.response.data : 'Network error');
      throw err;
    }
  };

  return {
    signUp,
    loading,
    error,
  };
}

export default useSignUp;
