import { useNavigate } from 'react-router-dom';
import { AlbumType } from '../../interfaces/album'
import * as S from './style'

const AlbumBox = ({item}:{item:AlbumType}) => {

  const navigate = useNavigate();

  const toDetailAlbum = (id: number) => {
    navigate(`/album/${id}`);
  };

  return (
    <S.Container onClick={()=>{toDetailAlbum(item.id)}}>
      <S.AlbumCover cover={item.coverUrl}></S.AlbumCover>
      <S.AlbumTitle>{item.title.length > 12 ? (item.title.slice(0,12)+'...') : (item.title)}</S.AlbumTitle>
      <S.AlbumSongCount>{item.songs.length} songs</S.AlbumSongCount>
    </S.Container>
  );
}

export default AlbumBox