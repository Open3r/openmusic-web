import { useNavigate, useParams } from 'react-router-dom';
import * as S from './style';
import { useEffect, useRef, useState } from 'react';
import { PlaylistType } from '../../interfaces/playlist';
import instance from '../../libs/axios/customAxios';
import SongBox from '../../components/SongBox';
import NotificationService from '../../libs/notification/NotificationService';
import { userStore } from '../../stores/userStore';
import useFileUpload from '../../hooks/useFileUpload';
import { playlistUpdateStore } from '../../stores/playlistUpdateStore';
import { songIdUpdate } from '../../stores/nowPlayingStore';
import { queueUpdateStore } from '../../stores/queueStore';

const PlaylistPage = () => {

  const [detail, setDetail] = useState<PlaylistType>();
  const [pageLoading, setPageLoading] = useState(false);


  const user = userStore(state=>state.user);

  const update = playlistUpdateStore(state=>state.update);

  const param = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistCover, setPlaylistCover] = useState(detail?.coverUrl);
  const [playlistTitle, setPlaylistTitle] = useState(detail?.title);
  const [playlistScope, setPlaylistScope] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { fileUpload, loading } = useFileUpload();
  const setUpdate = playlistUpdateStore(state=>state.setUpdate);
  
  const setQueueUpdate = queueUpdateStore(state=>state.setQueueUpdate);
  const queue = queueUpdateStore((state) => state.queueUpdate);
  const setSongIdUpdate = songIdUpdate((state) => state.setSongIdUpdate);

  const navigate = useNavigate();

  const handlePlaylistCoverValue = async () => {
    if (fileRef.current && fileRef.current.files && fileRef.current.files[0]) {
      const playlistCoverFile = fileRef.current.files[0];
      const coverUrl = await fileUpload(playlistCoverFile);
      setPlaylistCover(coverUrl);
    }
  };

  const handlePlaylistCover = async () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistTitle(e.target.value);
  };

  const handleScope = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaylistScope(e.target.value as "PUBLIC" | "PRIVATE");
  };

  const submit = async () => {
    setSubmitLoading(true);
    await instance
      .patch(`/playlists/${param.id}`, {
        title: playlistTitle,
        scope: playlistScope,
        coverUrl: playlistCover,
      })
      .then(() => {
        setPlaylistCover(undefined);
        setPlaylistTitle("");
        setPlaylistScope("PUBLIC");
        instance.get(`/playlists/${param.id}`).then((response) => {
          setDetail(response.data.data);
        });
        setIsModalOpen(false);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const detailPlaylistReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setPageLoading(true), 5000); 
      const res = await instance.get(`/playlists/${param.id}`);
      setDetail(res.data.data);
    } finally {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      setPageLoading(false);
    }
  };

  useEffect(()=>{
    detailPlaylistReq();
  },[]);

  useEffect(()=>{
    if(update){
      detailPlaylistReq();
    }
  },[update]);


  const copyToQueue = () => {
    setSongIdUpdate({songIdentify:0});
    instance.delete('/users/me/queue')
      .then(()=>{
        instance.get('/users/me/queue').then((res)=>{
          setQueueUpdate(res.data.data);
        })
      }
    );
  }

  useEffect(()=>{
    if(queue.length === 0 && detail) {
      instance.post("/users/me/queue/playlist", {
        playlistId: detail.id,
      });
      setQueueUpdate(detail.songs);
      setSongIdUpdate({songIdentify:detail.songs[0].id});
    }
  },[queue]);


  const deletePlaylist = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setPageLoading(true), 5000);
      await instance.delete(`/playlists/${param.id}`);
      NotificationService.success('삭제 성공');
      navigate(-1);
    } finally {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      setPageLoading(false);
      setUpdate(true);
    }
  }

  const deleteSong = async (songId:number) => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setPageLoading(true), 5000);
      await instance.delete(`/playlists/${param.id}/songs/${songId}`,);
      NotificationService.success("삭제 성공");
      instance.get(`/playlists/${param.id}`).then((response) => {
        setDetail(response.data.data);
      });
    } finally {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      setPageLoading(false);
    }
  }

  const likeReq = async () => {
    setLikeLoading(true);
    if (!likeLoading) {
      await instance
        .post(`/playlists/${detail?.id}/likes`)
        .then((res) => {
          setDetail(res.data.data);
        })
        .finally(() => {
          setLikeLoading(false);
        });
    }
  };

  const unlikeReq = async () => {
    setLikeLoading(true);
    if (!likeLoading) {
      await instance
        .delete(`/playlists/${detail?.id}/likes`)
        .then((res) => {
          setDetail(res.data.data);
        })
        .finally(() => {
          setLikeLoading(false);
        });
    }
  }; 


  return (
    <S.Container>
      {pageLoading ? (
        <S.LoadingShadow>
          <S.Spinner></S.Spinner>
        </S.LoadingShadow>
      ) : null}
      <S.CoverArea>
        <S.CoverImg src={detail?.coverUrl} />
        <S.InfoWrap>
          <S.Title>{detail?.title}</S.Title>
        </S.InfoWrap>
        <S.PlayBtn src="/assets/imgs/plPlay.svg" onClick={copyToQueue} />
      </S.CoverArea>
      <S.Main>
        <S.PageTitleWrap>
          <S.PageTitle>
            By{" "}
            <S.Username to={`/artist/${detail?.artist.id}`}>
              {detail?.artist.nickname}
            </S.Username>
          </S.PageTitle>
          <span style={{ margin: "0 1rem", fontSize: "3rem", color: "gray" }}>
            ·
          </span>
          <S.SongCount>{detail?.songs.length} songs</S.SongCount>
          {user.id === detail?.artist.id ? (
            <img
              src="/assets/imgs/EditNickname.svg"
              alt=""
              style={{ height: "3rem", cursor: "pointer", marginLeft: "1rem" }}
              onClick={handleModal}
            />
          ) : null}
          {!detail?.liked ? (
            <img
              src="/assets/imgs/unlike.svg"
              style={{
                width: "3rem",
                height: "3rem",
                cursor: "pointer",
                marginLeft: "2rem",
              }}
              onClick={likeReq}
            />
          ) : (
            <img
              src="/assets/imgs/like.svg"
              style={{
                width: "3rem",
                height: "3rem",
                cursor: "pointer",
                marginLeft: "2rem",
              }}
              onClick={unlikeReq}
            />
          )}
          <S.SongCount
            style={
              detail?.liked
                ? { marginLeft: "0.5rem", color: "#52a9f9" }
                : { marginLeft: "0.5rem", color: "black" }
            }
          >
            {detail?.likeCount}
          </S.SongCount>
        </S.PageTitleWrap>
        <S.SongList>
          {detail?.songs.length && detail?.songs.length > 0 ? (
            detail.songs.map((item, idx) => (
              <S.PlaylistSongWrap key={idx}>
                <SongBox
                  title={item.title}
                  artist={item.artist}
                  id={item.id}
                  key={item.id}
                  url={item.url}
                  thumbnailUrl={item.thumbnailUrl}
                  type={"list"}
                  genre={item.genre}
                  scope={item.scope}
                  liked={item.liked}
                  likeCount={item.likeCount}
                  rank={idx}
                  album={item.album}
                />
                {user.id === detail.artist.id ? (
                  <S.DeleteSong>
                    <img
                      src="/assets/imgs/deleteSong.svg"
                      style={{ cursor: "pointer", width: "2rem" }}
                      alt=""
                      onClick={() => {
                        deleteSong(item.id);
                      }}
                    />
                  </S.DeleteSong>
                ) : null}
              </S.PlaylistSongWrap>
            ))
          ) : (
            <h1 style={{ color: "gray", textAlign: "center" }}>
              곡이 없습니다
            </h1>
          )}
        </S.SongList>
      </S.Main>
      {isModalOpen ? (
        <S.CreatModalWrap>
          <S.Modal>
            <S.ModalTitle>
              플레이리스트 수정
              <img
                src="/assets/imgs/X.svg"
                style={{ height: "2rem", width: "2rem", cursor: "pointer" }}
                onClick={handleModal}
              />
            </S.ModalTitle>
            <S.PlaylistCoverWrap>
              <S.PlaylistCoverInput
                $playlistCover={
                  !loading
                    ? playlistCover
                      ? playlistCover
                      : "/assets/imgs/uploadAlbumCover.svg"
                    : "/assets/imgs/uploading.svg"
                }
                onClick={handlePlaylistCover}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handlePlaylistCoverValue}
                />
              </S.PlaylistCoverInput>
            </S.PlaylistCoverWrap>
            <S.PlaylistInputWrap>
              <S.PlaylistTitle
                placeholder="플레이리스트 제목을 입력하세요."
                onChange={handleTitle}
              />
              <S.PlaylistScope onChange={handleScope}>
                <option value="PUBLIC">공개</option>
                <option value="PRIVATE">비공개</option>
              </S.PlaylistScope>
            </S.PlaylistInputWrap>
            <S.PlaylistBtnWrap>
              <S.PlaylistBtn onClick={submit} disabled={submitLoading}>
                {submitLoading ? "수정중..." : "수정"}
              </S.PlaylistBtn>
              <S.PlaylistDeleteBtn
                style={{ marginLeft: "2rem" }}
                onClick={deletePlaylist}
              >
                삭제
              </S.PlaylistDeleteBtn>
            </S.PlaylistBtnWrap>
          </S.Modal>
        </S.CreatModalWrap>
      ) : null}
    </S.Container>
  );
}

export default PlaylistPage;