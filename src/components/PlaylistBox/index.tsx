import { useNavigate } from 'react-router-dom';
import { PlaylistType } from '../../interfaces/playlist'
import * as S from './style'
import instance from '../../libs/axios/customAxios';
import NotificationService from '../../libs/notification/NotificationService';
import { playlistUpdateStore } from '../../stores/playlistUpdateStore';

const PlaylistBox = ({item,type,songId}:{item:PlaylistType;type:string;songId?:number}) => {

  const setUpdate = playlistUpdateStore(state=>state.setUpdate);

  const navigate = useNavigate();
   
  const toDetailPlaylist = (id:number) => {
    navigate(`/playlist/${id}`);
  }

  const addToPlaylist = async (playlist:number,songId:number) => {
    if(songId !== 0) {
      let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
      try {
        await instance.post(`/playlists/${playlist}/songs`,{songId});
        NotificationService.success("추가 성공");
        setUpdate(true);
      } catch (err: any) {
        if (err.response.data.code === "PLAYLIST_SONG_ALREADY_EXISTS") {
          NotificationService.error("해당 플레이리스트에 이미 있는 곡 입니다.");
        }
      } finally {
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
        }
      }
    }else{
      NotificationService.error('재생중인 노래가 없습니다.');
    } 
  }

  if(type === 'default') {
    return (
      <S.Container onClick={()=>{toDetailPlaylist(item.id)}}>
        <S.Cover cover={item.coverUrl}>
          <S.PlaylistTitle>{item.title}</S.PlaylistTitle>
        </S.Cover>
      </S.Container>
    );
  }
  if(type === 'box') {
    return (
      <S.SongBox
        thumbnailUrl={item.coverUrl}
        onClick={() => {
          toDetailPlaylist(item.id);
        }}
      >
        <S.BoxHover>
          <S.HoverWord>자세히 보기</S.HoverWord>
        </S.BoxHover>
        <S.Title>{item.title}</S.Title>
        <S.Artist>{item.artist.nickname}</S.Artist>
      </S.SongBox>
    );
  }
  if(type === 'playbar') {
    return (
      <S.AddListWrap onClick={()=>{addToPlaylist(item.id,songId!)}}>
        <S.BoxHover>
          <S.BoxHover>
            <S.HoverWord>눌러서 추가</S.HoverWord>
          </S.BoxHover>
        </S.BoxHover>
        <S.AddListCover src={item.coverUrl}/>
        <S.AddListTitle>{item.title}</S.AddListTitle>
      </S.AddListWrap>
    )
  }
}

export default PlaylistBox