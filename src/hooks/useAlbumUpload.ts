import { useState } from "react";
import NotificationService from "../libs/notification/NotificationService";
import { UploadAlbum } from "../interfaces/uploadAlbum";
import instance from "../libs/axios/customAxios";

const useAlbumUpload = () => {
  const [uploadLoading, setUploadLoading] = useState(false);

  const albumUpload = async (data: UploadAlbum) => {
    setUploadLoading(true);
    if (
      data.coverUrl === undefined ||
      data.songs.length === 0 ||
      data.title.trim() === "" ||
      data.description === ""
    ) {
      setUploadLoading(false);
      if (data.songs.length === 0) {
        NotificationService.error("앨범에는 하나 이상의 곡이 존재해야 합니다.");
      }
      NotificationService.warn("모든 필드를 채워주세요.");
    } else {
      let isAllSongFilled = false;
      data.songs.forEach((item) => {
        if (item.title === "" && item.url === "") {
          NotificationService.warn(
            "음악 파일 또는 제목이 입력되지 않았습니다."
          );
          isAllSongFilled = false;
        }else{
          isAllSongFilled = true;
        }
      });
      if(isAllSongFilled) {
        try{
          const res = await instance.post("/albums", data);
          return res;
        }catch(err){
          NotificationService.error('네트워크');
        }finally{
          setUploadLoading(false);
        }
      }
    }
    setUploadLoading(false);
  };

  return {
    albumUpload,
    uploadLoading,
  };
};

export default useAlbumUpload;
