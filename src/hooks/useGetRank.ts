import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../libs/cookies/cookie";
import instance from "../libs/axios/customAxios";
function useGetRank() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");

  const getRank = async () => {
    setLoading(true);
    setError(null);
    if (refreshToken == undefined) {
      // navigate("/login");
      return;
    }
    try {
      const res = await instance.get(`/songs/ranking`);
      return res.data.data;
    } catch (err: any) {
      setError(err.response ? err.response.data : "Network error");
      // navigate("/login");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getRank,
    loading,
    error,
  };
}

export default useGetRank;
