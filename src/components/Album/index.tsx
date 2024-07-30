import { AlbumType } from '../../interfaces/album'
import AlbumBox from '../AlbumBox';
import * as S from './style'

const Album = ({albums}: {albums: AlbumType[]|undefined}) => {
  return (
    <S.Container>
      <S.Title>앨범</S.Title>
      <S.Main>
        {albums?.map((item) => (
          <AlbumBox item={item} key={item.id}/>
        ))}
      </S.Main>
    </S.Container>
  );
};

export default Album