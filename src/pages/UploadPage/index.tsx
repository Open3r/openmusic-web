import { useRef, useState } from "react";
import * as S from "./style";
import { UploadSong } from "../../interfaces/uploadSong";
import useAlbumUpload from "../../hooks/useAlbumUpload";
import NotificationService from "../../libs/notification/NotificationService";
import { useNavigate } from "react-router-dom";
import useFileUpload from "../../hooks/useFileUpload";

const UploadPage = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const musicRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [albumCover, setAlbumCover] = useState<string | undefined>();
  const [songs, setSongs] = useState<UploadSong[]>([]);
  const [albumGenre, setAlbumGenre] = useState("POP");
  const [albumScope, setAlbumScope] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");

  const { fileUpload, loading } = useFileUpload();
  const { albumUpload, uploadLoading } = useAlbumUpload();
  const navigate = useNavigate();


  const handleAlbumCover = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleMusic = (i: number) => {
    if (musicRefs.current[i] !== null) {
      musicRefs.current[i]!.click();
    }
  };

  const handleAlbumTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumTitle(e.target.value);
  };

  const handleAlbumDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAlbumDescription(e.target.value);
  };

  const handleAlbumCoverValue = async () => {
    if (fileRef.current && fileRef.current.files && fileRef.current.files[0]) {
      const albumCoverFile = fileRef.current.files[0];
      const coverUrl = await fileUpload(albumCoverFile);
      setAlbumCover(coverUrl);
    }
  };

  const addSong = () => {
    setSongs((prev) => [...prev, { title: "", url: "" }]);
  };

  const handleSongTitleChange = (i: number, title: string) => {
    setSongs((prev) => {
      const updatedSongs = [...prev];
      updatedSongs[i].title = title;
      return updatedSongs;
    });
  };

  const handleSongFileChange = async (i: number) => {
    const musicRef = musicRefs.current[i];
    if (musicRef && musicRef.files && musicRef.files[0]) {
      const file = musicRef.files[0];
      try{
        const url = await fileUpload(file);
        setSongs((prev) => {
          const updatedSongs = [...prev];
          if (url) {
            updatedSongs[i].url = url;
          }
          return updatedSongs;
        });
      }catch(err:any){
        if(err.response.status === 413) {
          NotificationService.warn('파일 크기가 너무 큽니다.');
        }else{
          NotificationService.error('네트워크 에러');
        }
      }
    }
  };

  const handleAlbumGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    setAlbumGenre(genre);
  };
  

  const handleAlbumScope = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const scope = e.target.value as "PUBLIC" | "PRIVATE";
    setAlbumScope(scope);
  };

  const submit = async () => {
    try {
      const res = await albumUpload({
        title: albumTitle,
        coverUrl: albumCover,
        scope: albumScope,
        genre: albumGenre,
        songs: songs,
        description: albumDescription
      });
      if(res !== undefined) {
        NotificationService.success("업로드 요청 성공");
        navigate("/");
      }
    } catch (err) {
      NotificationService.error("네트워크 에러");
    }
  };

  const removeSong = (idx: number) => {
    setSongs((prev) => prev.filter((_, index) => index !== idx));
    musicRefs.current = musicRefs.current.filter((_, index) => index !== idx);
  };

  return (
    <S.Canvas>
      {loading ? (
        <S.LoadingShadow>
          <S.Spinner></S.Spinner>
        </S.LoadingShadow>
      ) : null}
      <S.SongInfoWrap>
        <S.AlbumCoverInput
          onClick={handleAlbumCover}
          $albumCover={
            albumCover ? albumCover : "/assets/imgs/uploadAlbumCover.svg"
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
          onChange={handleAlbumTitle}
        />
        <S.AlbumMetaLabel>
          장르선택
          <S.AlbumMetaSelect
            style={{ width: "60%" }}
            onChange={handleAlbumGenre}
          >
            <option value="POP">팝</option>
            <option value="HIPHOP">힙합</option>
            <option value="BALLAD">발라드</option>
            <option value="CLASSIC">클래식</option>
            <option value="JAZZ">재즈</option>
            <option value="JAZZ">스윙재즈</option>
            <option value="CITY_POP">시티팝</option>
            <option value="COUNTRY">컨트리</option>
            <option value="ROCK">락</option>
            <option value="METAL">메탈</option>
            <option value="ELECTRONIC">일렉트로닉</option>
            <option value="RNB">R&B</option>
            <option value="DANCE">댄스</option>
            <option value="REGGAE">레게</option>
            <option value="BLUES">블루스</option>
            <option value="FOLK">포크</option>
            <option value="SOUL">소울</option>
            <option value="OST">OST</option>
            <option value="OTHER">기타</option>
          </S.AlbumMetaSelect>
        </S.AlbumMetaLabel>
        <S.AlbumMetaLabel>
          공개범위
          <S.AlbumMetaSelect
            style={{ width: "60%" }}
            onChange={handleAlbumScope}
          >
            <option value="PUBLIC">공개</option>
            <option value="PRIVATE">비공개</option>
          </S.AlbumMetaSelect>
        </S.AlbumMetaLabel>
        <S.AlbumMetaLabel style={{ margin: "4rem 0 1rem 0" }}>
          앨범설명
        </S.AlbumMetaLabel>
        <S.AlbumDescription
          placeholder="앨범 설명을 입력하세요."
          onChange={handleAlbumDescription}
        />
      </S.SongInfoWrap>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>노래 업로드</h1>
        <S.SongInputArea>
          {songs.map((item, idx) => (
            <S.SongInput key={idx}>
              <S.SongTitleInput
                type="text"
                placeholder="곡 제목을 입력하세요."
                value={item.title}
                onChange={(e) => handleSongTitleChange(idx, e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  width: "8rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <S.SongFileInput
                  $file={
                    item.url
                      ? "/assets/imgs/uploadChk.svg"
                      : "/assets/imgs/songUpload.svg"
                  }
                  onClick={() => handleMusic(idx)}
                >
                  <input
                    type="file"
                    accept="audio/*"
                    ref={(ref) => (musicRefs.current[idx] = ref)}
                    onChange={() => handleSongFileChange(idx)}
                  />
                </S.SongFileInput>
                <img
                  src="/assets/imgs/deleteSong.svg"
                  onClick={() => {
                    removeSong(idx);
                  }}
                  style={{
                    height: "100%",
                    cursor: "pointer",
                  }}
                />
              </div>
            </S.SongInput>
          ))}
          <S.AddSong onClick={addSong}>
            <img src="/assets/imgs/plus.svg" />
          </S.AddSong>
        </S.SongInputArea>
        <S.UploadBtn onClick={submit} disabled={uploadLoading}>
          {uploadLoading ? "업로드 중..." : "업로드"}
        </S.UploadBtn>
      </div>
    </S.Canvas>
  );
};

export default UploadPage;
