import * as S from "./style";
import searchBtn from '../../assets/imgs/search.svg';
import logo from '../../assets/imgs/logo_color.png';

const Header = () => {
  return (
    <S.Canvas>
      <S.SearchArea>
        <S.Logo src={logo} />
        <S.SearchWrap>
          <S.Search
            type="search"
            placeholder="오늘은 어떤 음악이 듣고 싶나요?"
          />
          <S.SearchBtn src={searchBtn} />
        </S.SearchWrap>
      </S.SearchArea>
      <S.MenuArea>
        <S.Menu>메인</S.Menu>
        <S.Menu>오픈차트</S.Menu>
        <S.Menu>신곡</S.Menu>
        <S.Menu>급상승</S.Menu>
        <S.Menu>재생목록</S.Menu>
        <S.Menu>오픈북</S.Menu>
      </S.MenuArea>
    </S.Canvas>
  );
};

export default Header;
