import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/User'
import * as S from './style'

const UserBox = ({user}:{user:User}) => {

  const navigate = useNavigate();

  return (
    <S.Conatainer
      key={user.id}
      onClick={() => {
        navigate(`/artist/${user.id}`);
      }}
    >
      <S.ArtistAvatar src={user.avatarUrl} alt="" />
      <S.ArtistName>{user.nickname}</S.ArtistName>
      {user.genres.length > 0 ? (
        <S.ArtistGenreWrap>
          {user.genres.map((item) => (
            <S.GenreBox key={user.id}>{item}</S.GenreBox>
          ))}
        </S.ArtistGenreWrap>
      ) : (
        <S.ArtistGenreWrap>
          <h1 style={{fontSize:'1.5rem',color:'gray'}}>선호하는 장르가 없습니다.</h1>
        </S.ArtistGenreWrap>
      )}
    </S.Conatainer>
  );
}

export default UserBox