import * as S from "./style";
import searchBtn from '../../assets/imgs/search.svg';
import logo from '../../assets/imgs/logo_color.png';
import { Link, useLocation } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import { userStore } from "../../stores/userStore";
import { useEffect, useState } from "react";

const Header = () => {

  const { getUser } = useGetUser();
  const setUser = userStore((state) => state.setUser);
  const [pageState, setPageState] = useState<"MAIN"|"UPLOAD"|"CHART"|"INCREASE"|"QUEUE"|"MYPAGE">("MAIN");
  const location = useLocation();

  const userReq = async () => {
    await getUser().then((res)=>{
      setUser(res.data);
    });
  };

  useEffect(() => {
    userReq();
  }, []);

  useEffect(()=>{
    if(location.pathname === "/") {
      setPageState("MAIN");
    }
    if(location.pathname === "/upload") {
      setPageState("UPLOAD");
    }
    if(location.pathname === "/chart") {
      setPageState("CHART");
    }
    if(location.pathname === "/increase") {
      setPageState("INCREASE");
    }
    if(location.pathname === "/queue") {
      setPageState("QUEUE");
    }
    if (location.pathname === "/my-page") {
      setPageState("MYPAGE");
    }
  },[location.pathname]);

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
          <S.Menu
            style={
              pageState === "MAIN" ? { color: "#52A9F9" } : { color: "black" }
            }
          >
            메인
          </S.Menu>
        </Link>
        <S.Menu
          style={
            pageState === "CHART" ? { color: "#52A9F9" } : { color: "black" }
          }
        >
          오픈차트
        </S.Menu>
        <Link to={"/upload"} style={{ textDecoration: "none" }}>
          <S.Menu
            style={
              pageState === "UPLOAD" ? { color: "#52A9F9" } : { color: "black" }
            }
          >
            신곡
          </S.Menu>
        </Link>
        <S.Menu
          style={
            pageState === "INCREASE" ? { color: "#52A9F9" } : { color: "black" }
          }
        >
          급상승
        </S.Menu>
        <S.Menu
          style={
            pageState === "QUEUE" ? { color: "#52A9F9" } : { color: "black" }
          }
        >
          재생목록
        </S.Menu>
        <Link to={"/my-page"} style={{ textDecoration: "none" }}>
          <S.Menu
            style={
              pageState === "MYPAGE" ? { color: "#52A9F9" } : { color: "black" }
            }
          >
            마이페이지
          </S.Menu>
        </Link>
      </S.MenuArea>
    </S.Canvas>
  );
};

export default Header;
