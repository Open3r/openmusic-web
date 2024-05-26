import { useState } from 'react';
import axios from 'axios';

function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (name:string, email:string, password:string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://openmusic.kro.kr:8080/auth/signup', { name, email, password });
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
