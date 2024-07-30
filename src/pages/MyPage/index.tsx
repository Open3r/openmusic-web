import { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import Profile from "../../components/Profile";
import { userStore } from "../../stores/userStore";
import * as S from "./style";
import { PlaylistType } from "../../interfaces/playlist";
import instance from "../../libs/axios/customAxios";
import Album from "../../components/Album";
import { AlbumType } from "../../interfaces/album";
import { paging } from "../../libs/axios/paging";

const MyPage = () => {
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);

  const [playlists, setPlaylists] = useState<PlaylistType[]>();
  const [albums, setAlbums] = useState<AlbumType[]>();
  const [loading, setLoading] = useState(false);

  const DELAY = 5000;

  const playlistReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), DELAY);

      const res = await instance.get("/users/me/playlists",{params:paging});
      setPlaylists(res.data.data.content);
    } finally {
      clearTimeout(loadingTimeout);
      setLoading(false);
    }
  };

  const albumReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), DELAY);

      const res = await instance.get("/users/me/albums",{params:paging});
      setAlbums(res.data.data.content);
    } finally {
      clearTimeout(loadingTimeout);
      setLoading(false);
    }
  };

  useEffect(() => {
    playlistReq();
    albumReq();
  }, []);

  return (
    <S.Container>
      {loading && (
        <S.LoadingShadow>
          <S.Spinner />
        </S.LoadingShadow>
      )}
      <S.PageTitle>마이페이지</S.PageTitle>
      <S.Main>
        <S.ProfileWrap>
          <Profile user={user} setUser={setUser} type='mypage'/>
        </S.ProfileWrap>
        <S.PlayListWrap>
          <Playlist playlists={playlists} setPlaylists={setPlaylists} />
        </S.PlayListWrap>
        <S.MyAlbumArea>
          <Album albums={albums} />
        </S.MyAlbumArea>
      </S.Main>
    </S.Container>
  );
};

export default MyPage;
