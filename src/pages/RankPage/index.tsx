import * as S from "./style";
import { useEffect, useState } from "react";
import SongBox from "../../components/SongBox";
import useGetRank from "../../hooks/useGetRank";
import { Song } from "../../interfaces/Song";
import instance from "../../libs/axios/customAxios";
import { songIdUpdate } from "../../stores/nowPlayingStore";
import { queueUpdateStore } from "../../stores/queueStore";

const RankPage = () => {
  const [detail, setDetail] = useState<Song[]>();
  const [loading, setLoading] = useState(false);

  const setQueueUpdate = queueUpdateStore((state) => state.setQueueUpdate);
  const queue = queueUpdateStore((state) => state.queueUpdate);
  const setSongIdUpdate = songIdUpdate((state) => state.setSongIdUpdate);

  const { getRank } = useGetRank();

  const detailRankReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), 5000);
      const res = await getRank(100)
      setDetail(res);
    } finally {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    detailRankReq();
  }, []);



  const copyToQueue = () => {
    setSongIdUpdate({songIdentify:0});
    instance.delete("/users/me/queue").then(() => {
      instance.get("/users/me/queue").then((res) => {
        setQueueUpdate(res.data.data);
      });
    });
  };

  useEffect(() => {
    if (queue.length === 0 && detail) {
      instance.post("/users/me/queue/ranking");
      setQueueUpdate(detail);
      setSongIdUpdate({songIdentify:detail[0].id});
    }
  }, [queue]);



  return (
    <S.Container>
      {loading ? (
        <S.LoadingShadow>
          <S.Spinner></S.Spinner>
        </S.LoadingShadow>
      ) : null}
      <S.CoverArea>
        <S.CoverImg src="/assets/imgs/banner.png" />
        <S.InfoWrap>
          <S.Title>오픈차트</S.Title>
        </S.InfoWrap>
        <S.PlayBtn src="/assets/imgs/plPlay.svg" onClick={copyToQueue} />
      </S.CoverArea>
      <S.Main>
        <S.PageTitleWrap>
          <S.AlbumInfoWrap>
            <S.PageTitle>
              Analyzed By{" "}
              <img
                src="/assets/imgs/logo_color.png"
                alt=""
                style={{ height: "3rem", width: "3rem", marginLeft: "1rem" }}
              />
            </S.PageTitle>
          </S.AlbumInfoWrap>
        </S.PageTitleWrap>
        <S.SongList>
          {detail?.length && detail?.length > 0 ? (
            detail.map((item, idx) => (
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

export default RankPage;
