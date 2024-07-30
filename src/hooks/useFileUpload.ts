import { useState } from "react";
import instance from "../libs/axios/customAxios";
import NotificationService from "../libs/notification/NotificationService";

const useFileUpload = () => {

  const [loading,setLoading] = useState(false);
  const [error, setError] = useState();

  const fileUpload = async (file:File) : Promise<string | undefined> => {
    const formData = new FormData();
    setLoading(true);
    formData.append("files",file)
    try {
      const res = await instance.post('/files/upload',formData);
      return res.data.data[0].url;
    }catch(err:any){
      NotificationService.error('네트워크 에러');
      if(err&&err.response){
        setError(err);
      }
    }finally{
      setLoading(false);
      if(error){
        return Promise.reject(error);
      }
    }
  }

  return {
    fileUpload,
    loading
  }

}

export default useFileUpload;