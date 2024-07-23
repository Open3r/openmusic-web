import instance from "../libs/customAxios";

const useMusicUpload = () => {

  const musicUpload = (file:File) => {
    try {
      const res = await instance.post('/files/upload',{file},{headers:{
        
      }});
      return res.data.data[0]
    }
  }

}

export default useMusicUpload;