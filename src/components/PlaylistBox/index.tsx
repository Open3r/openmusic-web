import { PlaylistType } from '../../interfaces/playlist'
import * as S from './style'

const PlaylistBox = ({item}:{item:PlaylistType}) => {
  return (
    <S.Container>
      <S.Cover cover={item.coverUrl}>
        <S.PlaylistTitle>{item.title}</S.PlaylistTitle>
      </S.Cover>
    </S.Container>
  );
}

export default PlaylistBox