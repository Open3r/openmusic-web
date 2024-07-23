import { useEffect, useRef, useState } from "react";
import * as S from "./style";
import AlbumCoverImg from "../../assets/imgs/uploadAlbumCover.svg";
import BeforeUpload from "../../assets/imgs/songUpload.svg";
import AfterUpload from "../../assets/imgs/uploadChk.svg";

interface UploadSong {
  title: string;
  music: File | null;
  thumbnail: File | null;
}

const UploadPage = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const musicRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [albumCover, setAlbumCover] = useState<File | null>(null);
  const [songs, setSongs] = useState<UploadSong[]>([]);

  const handleAlbumCover = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleMusic = (i: number) => {
    if (musicRefs.current[i]) {
      musicRefs.current[i].click();
    }
  };

  const handleAlbumCoverValue = () => {
    if (fileRef.current && fileRef.current.files && fileRef.current.files[0]) {
      const albumCoverFile = fileRef.current.files[0];
      setAlbumCover(albumCoverFile);
      setSongs((prevSongs) =>
        prevSongs.map((song) => ({ ...song, thumbnail: albumCoverFile }))
      );
    }
  };

  useEffect(() => {
    fetch(AlbumCoverImg)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultAlbumCover = new File([blob], "uploadAlbumCover.svg", {
          type: "image/svg+xml",
        });
        setAlbumCover(defaultAlbumCover);
        setSongs((prevSongs) =>
          prevSongs.map((song) => ({ ...song, thumbnail: defaultAlbumCover }))
        );
      });
  }, []);

  const addSong = () => {
    setSongs((prev) => [
      ...prev,
      { title: "", music: null, thumbnail: albumCover },
    ]);
  };

  const handleSongTitleChange = (i: number, title: string) => {
    setSongs((prev) => {
      const updatedSongs = [...prev];
      updatedSongs[i].title = title;
      return updatedSongs;
    });
  };

  const handleSongFileChange = (i: number) => {
    const musicRef = musicRefs.current[i];
    if (musicRef && musicRef.files && musicRef.files[0]) {
      const file = musicRef.files[0];
      setSongs((prev) => {
        const updatedSongs = [...prev];
        updatedSongs[i].music = file;
        return updatedSongs;
      });
    }
  };

  return (
    <S.Canvas>
      <S.SongInfoWrap>
        <S.AlbumCoverInput
          onClick={handleAlbumCover}
          $albumCover={
            albumCover ? URL.createObjectURL(albumCover) : AlbumCoverImg
          }
        >
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
            <option value="public">공개</option>
            <option value="private">비공개</option>
          </S.AlbumMetaSelect>
        </S.AlbumMetaLabel>
        <S.AlbumMetaLabel style={{ margin: "4rem 0 1rem 0" }}>
          앨범설명
        </S.AlbumMetaLabel>
        <S.AlbumDescription placeholder="250자 이내" />
      </S.SongInfoWrap>
      <S.SongInputArea>
        {songs.map((item, idx) => (
          <S.SongInput key={idx}>
            <S.SongTitleInput
              type="text"
              placeholder="곡 제목을 입력하세요."
              value={item.title}
              onChange={(e) => handleSongTitleChange(idx, e.target.value)}
            />
            <S.SongFileInput
              $file={item.music ? AfterUpload : BeforeUpload}
              onClick={() => handleMusic(idx)}
            >
              <input
                type="file"
                accept="audio/*"
                ref={(ref) => (musicRefs.current[idx] = ref)}
                onChange={() => handleSongFileChange(idx)}
              />
            </S.SongFileInput>
          </S.SongInput>
        ))}
        <S.AddSong onClick={addSong}>+</S.AddSong>
      </S.SongInputArea>
    </S.Canvas>
  );
};

export default UploadPage;
