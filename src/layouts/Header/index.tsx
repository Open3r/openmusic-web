import * as S from "./style";
import searchBtn from '../../assets/imgs/search.svg';
import logo from '../../assets/imgs/logo_color.png';
import { Link } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import { userStore } from "../../stores/userStore";
import { useEffect } from "react";

const Header = () => {

  const { getUser,error } = useGetUser();
  const setUser = userStore((state) => state.setUser);

  const userReq = async () => {
    try {
      const res = await getUser();
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };

  useEffect(() => {
    userReq();
  }, []);

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
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <S.Menu>메인</S.Menu>
        </Link>
        <S.Menu>오픈차트</S.Menu>
        <Link to={"/upload"} style={{ textDecoration: "none" }}>
          <S.Menu>신곡</S.Menu>
        </Link>
        <S.Menu>급상승</S.Menu>
        <S.Menu>재생목록</S.Menu>
        <S.Menu>오픈북</S.Menu>
      </S.MenuArea>
    </S.Canvas>
  );
};

export default Header;
