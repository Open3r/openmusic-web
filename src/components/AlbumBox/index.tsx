import { AlbumType } from '../../interfaces/album'
import * as S from './style'

const AlbumBox = ({item}:{item:AlbumType}) => {
  return (
    <S.Container>
      <S.AlbumCover cover={item.coverUrl}></S.AlbumCover>
      <S.AlbumTitle>{item.title}</S.AlbumTitle>
      <S.AlbumSongCount>{item.songs.length} songs</S.AlbumSongCount>
    </S.Container>
  );
}

export default AlbumBox