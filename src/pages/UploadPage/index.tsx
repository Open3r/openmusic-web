import { useEffect, useRef, useState } from "react";
import * as S from "./style";
import AlbumCoverImg from "../../assets/imgs/Group 9.svg";

const UploadPage = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [albumCover, setAlbumCover] = useState<string>("");

  const handleAlbumCover = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleAlbumCoverValue = () => {
    if (fileRef.current && fileRef.current.files && fileRef.current.files[0]) {
      const file = fileRef.current.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAlbumCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(()=>{
    setAlbumCover(AlbumCoverImg);
  },[]);

  return (
    <S.Canvas>
      <S.SongInfoWrap>
        <S.AlbumCoverInput onClick={handleAlbumCover} $albumCover={albumCover}>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleAlbumCoverValue}
          />
        </S.AlbumCoverInput>
        <S.AlbumTitleInput
          type="text"
          placeholder="앨범 제목을 입력해주세요."
        />
        <S.AlbumMetaLabel>
          장르선택
          <S.AlbumMetaSelect style={{ width: "60%" }}>
            <option value="hiphop">힙합</option>
            <option value="pop">팝</option>
          </S.AlbumMetaSelect>
        </S.AlbumMetaLabel>
        <S.AlbumMetaLabel>
          공개범위
          <S.AlbumMetaSelect style={{ width: "60%" }}>
            <option value="hiphop">공개</option>
            <option value="pop">비공개</option>
          </S.AlbumMetaSelect>
        </S.AlbumMetaLabel>
        <S.AlbumMetaLabel style={{margin:'4rem 0 1rem 0'}}>앨범설명</S.AlbumMetaLabel>
        <S.AlbumDescription placeholder="250자 이내" />
      </S.SongInfoWrap>
    </S.Canvas>
  );
};

export default UploadPage;
