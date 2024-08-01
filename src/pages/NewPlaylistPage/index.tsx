import * as S from "./style";
import Logo from "../../assets/imgs/logo_color.png";
import { useEffect, useState } from "react";
import instance from "../../libs/axios/customAxios";
import { paging } from "../../libs/axios/paging";
import PlaylistBox from "../../components/PlaylistBox";
import { PlaylistType } from "../../interfaces/playlist";

const NewPlaylistPage = () => {
  const [detail, setDetail] = useState<PlaylistType[]>();
  const [loading, setLoading] = useState(false);

  const playlistReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), 5000);
      const res = await instance.get("/playlists", {
        params: { ...paging, size: 50 },
      });
      setDetail(res.data.data.content);
    } finally {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    playlistReq();
  }, []);

  return (
    <S.Container>
      {loading ? (
        <S.LoadingShadow>
          <S.Spinner></S.Spinner>
        </S.LoadingShadow>
      ) : null}
      <S.Main>
        <S.Title>
          <img
            src={Logo}
            alt=""
            style={{ height: "4rem", width: "4rem", marginRight: "2rem" }}
          />
          사람들과 관심사를 공유하세요!
        </S.Title>
        {detail?.length && detail.length > 0 ? (
          <S.PlaylistWrap>
            {detail?.map((item) => (
              <PlaylistBox item={item} type="default" key={item.id}/>
            ))}
          </S.PlaylistWrap>
        ) : (
          <h1 style={{ color: "gray", textAlign: "center" }}>
            플레이리스트가 없습니다
          </h1>
        )}
      </S.Main>
    </S.Container>
  );
};

export default NewPlaylistPage;
