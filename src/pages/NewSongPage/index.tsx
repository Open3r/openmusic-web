import * as S from "./style";
import { useEffect, useState } from "react";
import PlPlay from "../../assets/imgs/plPlay.svg";
import SongBox from "../../components/SongBox";
import { Song } from "../../interfaces/Song";
import Banner from "../../assets/imgs/Rank.jpeg";
import instance from "../../libs/axios/customAxios";
import { songIdUpdate } from "../../stores/nowPlayingStore";
import { queueUpdateStore } from "../../stores/queueStore";
import Logo from "../../assets/imgs/logo_color.png";
import useGetMusic from "../../hooks/useGetMusic";

const NewSongPage = () => {
  const [detail, setDetail] = useState<Song[]>();
  const [loading, setLoading] = useState(false);

  const updateSongId = songIdUpdate((state) => state.setSongIdUpdate);
  const setQueueUpdate = queueUpdateStore((state) => state.setQueueUpdate);
  const queue = queueUpdateStore((state) => state.queueUpdate);

  const { getMusic } = useGetMusic();


  const detailRankReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), 5000);
      const res = await getMusic(100);
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
    instance.delete("/users/me/queue").then(() => {
      if (detail) {
        instance.post("/users/me/queue/latest");
        setQueueUpdate(detail);
        if (detail) {
          updateSongId(detail[0].id);
        }
      }
    });
  };

  useEffect(() => {
    if (detail) {
      updateSongId(detail[0].id);
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
        <S.CoverImg src={Banner} />
        <S.InfoWrap>
          <S.Title>따끈따끈 신곡</S.Title>
        </S.InfoWrap>
        <S.PlayBtn src={PlPlay} onClick={copyToQueue} />
      </S.CoverArea>
      <S.Main>
        <S.PageTitleWrap>
          <S.AlbumInfoWrap>
            <S.PageTitle>
              Analyzed By{" "}
              <img
                src={Logo}
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

export default NewSongPage;
