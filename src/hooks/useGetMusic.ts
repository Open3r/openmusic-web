import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../libs/cookies/cookie";
import instance from "../libs/axios/customAxios";
import { paging } from "../libs/axios/paging";
function useGetMusic() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");

  const getMusic = async (size:number) => {
    setLoading(true);
    setError(null);
    if (refreshToken == undefined) {
      navigate("/login");
      return;
    }
    try {
      const res = await instance.get(`/songs`,{params:{...paging, size}});
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
    getMusic,
    loading,
    error,
  };
}

export default useGetMusic;
