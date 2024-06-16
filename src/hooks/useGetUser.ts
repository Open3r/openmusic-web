import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useReissue from './useReissue';
import { setCookie, getCookie } from '../cookies/cookie';


function useGetUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { reissue } = useReissue();

  const getUser = async (accessToken:string, refreshToken:string) => {
    setLoading(true);
    setError(null);
    if(refreshToken == undefined){
      // navigate('/login');
    }else{
      if(accessToken == undefined) {
        const reissueReq = await reissue(refreshToken);
        setCookie('accessToken',reissueReq.data.accessToken,{path:'/'});
        setCookie('refreshToken',reissueReq.data.refreshToken,{path:'/',maxAge:'2600000'});
      }
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { headers:{ Authorization: `Bearer ${getCookie('accessToken')}` } });

      return response.data;
    } catch (err:any) {
      setError(err.response ? err.response.data : 'Network error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getUser,
    loading,
    error,
  };
}

export default useGetUser;
