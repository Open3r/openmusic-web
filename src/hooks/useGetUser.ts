import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookies/cookie";
import instance from "../libs/customAxios";
import axios from "axios";

function useGetUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");

  const getUser = async () => {
    setLoading(true);
    setError(null);
    // if (refreshToken == undefined) {
    //   navigate("/login");
    //   return
    // }
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`,{headers:{
        Authorization:`Bearer ${getCookie('accessToken')}`
      }});
      console.log(res);
      return res.data
    } catch (err: any) {
      console.log(err);
      setError(err.response ? err.response.data : "Network error");
      navigate('/login');
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
