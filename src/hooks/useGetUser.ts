import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../libs/cookies/cookie";
import instance from "../libs/axios/customAxios";
function useGetUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");

  const getUser = async () => {
    setLoading(true);
    setError(null);
    if (refreshToken == undefined) {
      navigate("/intro");
      return;
    }
    try {
      const res = await instance.get(`/users/me`);
      return res.data;
    } catch (err: any) {
      setError(err.response ? err.response.data : "Network error");
      navigate("/login");
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
