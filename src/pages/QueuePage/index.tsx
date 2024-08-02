import * as S from "./style";
import { useEffect, useState } from "react";
import instance from "../../libs/axios/customAxios";
import SongBox from "../../components/SongBox";
import NotificationService from "../../libs/notification/NotificationService";
import { songIdUpdate } from "../../stores/nowPlayingStore";
import { queueUpdateStore } from "../../stores/queueStore";
import { Song } from "../../interfaces/Song";
import { queueStateUpdateStore } from "../../stores/queueStateStore";

const QueuePage = () => {
  const [detail, setDetail] = useState<Song[]>();
  const [pageLoading, setPageLoading] = useState(false);


  const queueStateUpdate = queueStateUpdateStore((state) => state.queueStateUpdate);
  const setQueueStateUpdate = queueStateUpdateStore(
    (state) => state.setQueueStateUpdate
  );


  const songId = songIdUpdate(state=>state.songId);
  const setQueueUpdate = queueUpdateStore((state)=>state.setQueueUpdate);


  const detailQueueReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setPageLoading(true), 5000);
      const res = await instance.get(`/users/me/queue`);
      setDetail(res.data.data);
      setQueueUpdate(res.data.data)
    } finally {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      setPageLoading(false);
      setQueueStateUpdate(false);
    }
  };

  useEffect(() => {
    detailQueueReq();
  }, []);

  useEffect(() => {
    if (queueStateUpdate) {
      detailQueueReq();
    }
  }, [queueStateUpdate]);



  const deleteSong = async (songId: number) => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setPageLoading(true), 5000);
      await instance.delete(`/users/me/queue/${songId}`);
      NotificationService.success("삭제 성공");
      instance.get(`/users/me/queue`).then((response) => {
        setDetail(response.data.data);
        setQueueUpdate(response.data.data);
      });
    } finally {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      setPageLoading(false);
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
        <S.CoverImg src="/assets/imgs/banner.png" />
        <S.InfoWrap>
          <S.Title>재생목록</S.Title>
        </S.InfoWrap>
      </S.CoverArea>
      <S.Main>
        <S.PageTitleWrap>
          <S.PageTitle>
            Analyzed By{" "}
            <img
              src="/assets/imgs/logo_color.png"
              alt=""
              style={{ height: "3rem", width: "3rem", marginLeft: "1rem" }}
            />
          </S.PageTitle>
          <span style={{ margin: "0 1rem", fontSize: "3rem", color: "gray" }}>
            ·
          </span>
          <S.SongCount>{detail?.length} songs</S.SongCount>
        </S.PageTitleWrap>
        <S.SongList>
          {detail?.length && detail?.length > 0 ? (
            detail.map((item, idx) => (
              <S.PlaylistSongWrap key={idx}>
                <SongBox
                  title={item.title}
                  artist={item.artist}
                  id={item.id}
                  key={item.id}
                  url={item.url}
                  thumbnailUrl={item.thumbnailUrl}
                  type={"queue"}
                  genre={item.genre}
                  scope={item.scope}
                  liked={item.liked}
                  likeCount={item.likeCount}
                  rank={idx}
                  album={item.album}
                  nowPlaying={item.id === songId ? true : false}
                />
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
              </S.PlaylistSongWrap>
            ))
          ) : (
            <h1 style={{ color: "gray", textAlign: "center" }}>
              곡이 없습니다
            </h1>
          )}
        </S.SongList>
      </S.Main>
    </S.Container>
  );
};

export default QueuePage;
