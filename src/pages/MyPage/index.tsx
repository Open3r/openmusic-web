import { useEffect, useState } from 'react';
import Playlist from '../../components/Playlist';
import Profile from '../../components/Profile';
import { userStore } from '../../stores/userStore';
import * as S from './style'
import { PlaylistType } from '../../interfaces/playlist';
import instance from '../../libs/axios/customAxios';
import Album from '../../components/Album';
import { AlbumType} from '../../interfaces/album';

const MyPage = () => {

  const user = userStore(state=>state.user);
  const setUser = userStore(state=>state.setUser);

  const [playlists,setPlaylists] = useState<PlaylistType[]>();
  const [albums, setAlbums] = useState<AlbumType[]>();

  const playlistReq = async () => {
    await instance.get("/playlists/my")
    .then((res)=>{
      setPlaylists(res.data.data);
    });
  }

  const albumReq = async () => {
    await instance.get("/albums/my")
    .then((res) => {
      setAlbums(res.data.data);
    });
  };



  useEffect(()=>{
    playlistReq();
    albumReq();
  },[]);

  return (
    <S.Container>
      <S.PageTitle>마이페이지</S.PageTitle>
      <S.Main>
        <S.ProfileWrap>
          <Profile user={user} setUser={setUser}/>
        </S.ProfileWrap>
        <S.PlayListWrap>
          <Playlist playlists={playlists} setPlaylists={setPlaylists}/>
        </S.PlayListWrap>
        <S.MyAlbumArea>
          <Album albums={albums}/>
        </S.MyAlbumArea>
      </S.Main>
    </S.Container>
  )
}

export default MyPage;