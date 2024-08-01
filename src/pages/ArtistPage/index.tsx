import { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import Profile from "../../components/Profile";
import * as S from "./style";
import { PlaylistType } from "../../interfaces/playlist";
import instance from "../../libs/axios/customAxios";
import Album from "../../components/Album";
import { AlbumType } from "../../interfaces/album";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../interfaces/User";
import { userStore } from "../../stores/userStore";
import { paging } from "../../libs/axios/paging";

const ArtistPage = () => {
  const currentUser = userStore(state=>state.user);
  const [user,setUser] = useState<User>({
    id:0,
    nickname:'',
    email:'',
    status:'',
    provider:'',
    role:'',
    avatarUrl:'',
    genres:[]
  });
  const param = useParams();

  const navigate = useNavigate();



  const [playlists, setPlaylists] = useState<PlaylistType[]>();
  const [albums, setAlbums] = useState<AlbumType[]>();
  const [loading, setLoading] = useState(false);

  const DELAY = 5000;

  const playlistReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), DELAY);

      // const res = await instance.get(`/playlists/artist/${param.id}`);
      const res = await instance.get(`/users/me/playlists`,{params:paging});
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

      // const res = await instance.get(`/albums/artist/${param.id}`);
      const res = await instance.get(`/users/me/playlists`,{params:paging});
      setAlbums(res.data.data.content);
    } finally {
      clearTimeout(loadingTimeout);
      setLoading(false);
    }
  };

  const userReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), DELAY);

      const res = await instance.get(`/users/${param.id}`);
      setUser(res.data.data);
    } catch(err:any){
      if(err.response.data.status === 404) {
        navigate('/not-found');
      }
    } finally {
      clearTimeout(loadingTimeout);
      setLoading(false);
    }
  }

  useEffect(() => {
    playlistReq();
    albumReq();
    userReq();
  }, []);

  useEffect(()=>{
    if(currentUser.id === user.id) {
      navigate('/my-page');
    }
  },[user]);

  if(user.id !== 0) {
    return (
      <S.Container>
        {loading && (
          <S.LoadingShadow>
            <S.Spinner />
          </S.LoadingShadow>
        )}
        <S.PageTitle>아티스트페이지</S.PageTitle>
        <S.Main>
          <S.ProfileWrap>
            <Profile user={user} setUser={setUser} type="artist" />
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
  }
};

export default ArtistPage;
