import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookies/cookie";
import instance from "../libs/customAxios";

function useGetUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");

  const getUser = async () => {
    setLoading(true);
    setError(null);
    if (refreshToken == undefined) {
      navigate("/login");
    }
    
    try {
      await instance.get("/auth/me");
    } catch (err: any) {
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
