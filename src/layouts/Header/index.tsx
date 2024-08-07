import * as S from "./style";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import { userStore } from "../../stores/userStore";
import { useEffect, useState } from "react";
import NotificationService from "../../libs/notification/NotificationService";
import { getCookie } from "../../libs/cookies/cookie";

const Header = () => {
  const { getUser } = useGetUser();
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);
  const [pageState, setPageState] = useState<
    "MAIN" | "SONG" | "CHART" | "PLAYLIST" | "ALBUM"
  >("MAIN");
  const [searchText, setSearchText] = useState("");

  const accessToken = getCookie("accessToken");

  const location = useLocation();
  const navigate = useNavigate();

  const userReq = async () => {
    if (accessToken) {
      await getUser().then((res) => {
        setUser(res.data);
      });
    } else {
      navigate("/intro");
    }
  };

  useEffect(() => {
    if (user && user.nickname !== "" && user.genres) {
      if (user.genres.length === 0) {
        navigate("/genre");
      }
    }
  }, [user]);

  useEffect(() => {
    userReq();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const search = () => {
    if (searchText.trim() === "") {
      NotificationService.warn("검색어를 입력해주세요.");
      return;
    }
    navigate(`/search/${searchText}`);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setPageState("MAIN");
    }
    if (location.pathname === "/song") {
      setPageState("SONG");
    }
    if (location.pathname === "/rank") {
      setPageState("CHART");
    }
    if (location.pathname === "/playlist") {
      setPageState("PLAYLIST");
    }
    if (location.pathname === "/album") {
      setPageState("ALBUM");
    }
  }, [location.pathname]);

  return (
    <S.Canvas>
      <S.SearchArea>
        <S.Logo
          src="/assets/imgs/logo_color.png"
          onClick={() => {
            navigate("/");
          }}
        />
        <S.SearchWrap>
          <S.Search
            type="search"
            placeholder="오늘은 어떤 음악이 듣고 싶나요?"
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                search();
              }
            }}
          />
          <S.SearchBtn src="/assets/imgs/search.svg" onClick={search} />
        </S.SearchWrap>
      </S.SearchArea>
      <S.MenuArea>
        <S.MenuWrap>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <S.Menu
              style={
                pageState === "MAIN" ? { color: "#52A9F9" } : { color: "black" }
              }
            >
              메인
            </S.Menu>
          </Link>
          <Link to={"/rank"} style={{ textDecoration: "none" }}>
            <S.Menu
              style={
                pageState === "CHART"
                  ? { color: "#52A9F9" }
                  : { color: "black" }
              }
            >
              오픈차트
            </S.Menu>
          </Link>
          <Link to={"/song"} style={{ textDecoration: "none" }}>
            <S.Menu
              style={
                pageState === "SONG" ? { color: "#52A9F9" } : { color: "black" }
              }
            >
              신곡
            </S.Menu>
          </Link>
          <Link to={"/album"} style={{ textDecoration: "none" }}>
            <S.Menu
              style={
                pageState === "ALBUM"
                  ? { color: "#52A9F9" }
                  : { color: "black" }
              }
            >
              앨범
            </S.Menu>
          </Link>
          <Link to={"/playlist"} style={{ textDecoration: "none" }}>
            <S.Menu
              style={
                pageState === "PLAYLIST"
                  ? { color: "#52A9F9" }
                  : { color: "black" }
              }
            >
              플레이리스트
            </S.Menu>
          </Link>
        </S.MenuWrap>
      </S.MenuArea>
    </S.Canvas>
  );
};

export default Header;
