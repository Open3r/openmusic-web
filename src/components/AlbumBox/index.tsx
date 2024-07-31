import { useNavigate } from 'react-router-dom';
import { AlbumType } from '../../interfaces/album'
import Like from '../../assets/imgs/unlike.svg';
import * as S from './style'

const AlbumBox = ({item,type}:{item:AlbumType,type:string}) => {

  const navigate = useNavigate();

  const toDetailAlbum = (id: number) => {
    navigate(`/album/${id}`);
  };

  if(type === 'default') {
    return (
      <S.Container
        onClick={() => {
          toDetailAlbum(item.id);
        }}
      >
        <S.AlbumCover cover={item.coverUrl}></S.AlbumCover>
        <S.AlbumTitle>
          {item.title.length > 12
            ? item.title.slice(0, 12) + "..."
            : item.title}
        </S.AlbumTitle>
        <S.AlbumSongCount>{item.songs.length} songs</S.AlbumSongCount>
      </S.Container>
    );
  }
  if(type === 'list') {
    return (
      <S.ListContainer
        onClick={() => {
          toDetailAlbum(item.id);
        }}
      >
        <S.ListAlbumCover cover={item.coverUrl}></S.ListAlbumCover>
        <S.ListAlbumInfoWrap>
          <S.AlbumTitle>
            {item.title.length > 12
              ? item.title.slice(0, 12) + "..."
              : item.title}
          </S.AlbumTitle>
          <S.ListAlbumArtist>{item.artist.nickname}</S.ListAlbumArtist>
          <S.ListAlbumMeta>
            <S.AlbumSongCount>{item.songs.length} songs</S.AlbumSongCount>
            <S.ListAlbumLikeWrap>
              <img src={Like} alt="" />
              <span style={{fontSize:'1.5rem',color:'gray',marginLeft:'0.5rem'}}>{item.likeCount}</span>
            </S.ListAlbumLikeWrap>
          </S.ListAlbumMeta>
        </S.ListAlbumInfoWrap>
      </S.ListContainer>
    );
  }
}

export default AlbumBox