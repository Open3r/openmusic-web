import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../libs/cookies/cookie";
import instance from "../libs/axios/customAxios";
import { paging } from "../libs/axios/paging";
function useGetRank() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");

  const getRank = async (size:number) => {
    setLoading(true);
    setError(null);
    if (refreshToken == undefined) {
      navigate("/intro");
      return;
    }
    try {
      const res = await instance.get(`/songs/ranking`,{params:{...paging, size}});
      return res.data.data.content;
    } catch (err: any) {
      setError(err.response ? err.response.data : "Network error");
      navigate("/login");
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
