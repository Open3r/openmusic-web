import * as S from "./style";
import { useEffect, useState } from "react";
import SongBox from "../../components/SongBox";
import { Song } from "../../interfaces/Song";
import Banner from "../../assets/imgs/Rank.jpeg";
import instance from "../../libs/axios/customAxios";
import { songIdUpdate } from "../../stores/nowPlayingStore";
import { queueUpdateStore } from "../../stores/queueStore";
import Logo from "../../assets/imgs/logo_color.png";

const RecentPage = () => {
  const [detail, setDetail] = useState<Song[]>();
  const [loading, setLoading] = useState(false);

  const updateSongId = songIdUpdate((state) => state.setSongIdUpdate);
  const queue = queueUpdateStore((state) => state.queueUpdate);


  const detailRecentReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), 5000);
      const res = await instance.get(`/users/me/recents`);
      setDetail(res.data.data);
    } finally {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    detailRecentReq();
  }, []);


  useEffect(() => {
    console.log(queue);
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
          <S.Title>최근 재생한 노래</S.Title>
        </S.InfoWrap>
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

export default RecentPage;
