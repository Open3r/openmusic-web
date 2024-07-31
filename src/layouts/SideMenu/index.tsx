import { useRef, useState } from "react";
import * as S from "./style";
import { userStore } from "../../stores/userStore";
import { removeCookie } from "../../libs/cookies/cookie";
import NotificationService from "../../libs/notification/NotificationService";
import { useNavigate } from "react-router-dom";
import Mypage from '../../assets/imgs/mypage.svg';
import Uplaod from '../../assets/imgs/Vector.svg';
import Queue from "../../assets/imgs/Vector-1.svg";
import Recent from "../../assets/imgs/Vector-2.svg";

const SideMenu = () => {
  const sideMenu = useRef<HTMLDivElement | null>(null);
  const onOffBtn = useRef<HTMLImageElement | null>(null);
  const shadow = useRef<HTMLDivElement | null>(null);
  const [menuState, setMenuState] = useState(false);
  const user = userStore(state=>state.user);
  const navigate = useNavigate();

  const menuOnOff = () => {
    if (sideMenu.current && onOffBtn.current && shadow.current) {
      if (!menuState) {
        sideMenu.current.style.left = "0rem";
        onOffBtn.current.style.left = "30.5rem";
        shadow.current.style.display = 'block';
        setMenuState(true);
      } else {
        sideMenu.current.style.left = "-30rem";
        onOffBtn.current.style.left = "0.5rem";
        shadow.current.style.display = 'none'; 
        setMenuState(false);
      }
    }
  };

  const logout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    NotificationService.success('로그아웃 되었습니다.');
    navigate('/login');
  }

  return (
    <>
      <S.MenuOnBtn
        onClick={menuOnOff}
        ref={onOffBtn}
        className="sideMenu"
      ></S.MenuOnBtn>
      <S.Container ref={sideMenu} className="sideMenu">
        <S.ProfileWrap>
          <S.Avatar src={user.avatarUrl} />
          <S.Nickname>{user.nickname}</S.Nickname>
        </S.ProfileWrap>
        <S.Menu to="/my-page">
          <img src={Mypage} alt="" />
          마이페이지
        </S.Menu>
        <S.Menu to="/upload">
          <img src={Uplaod} alt="" />
          앨범 업로드
        </S.Menu>
        <S.Menu to="/queue">
          <img src={Queue} alt="" />
          재생목록
        </S.Menu>
        <S.Menu to="/recent">
          <img src={Recent} alt="" />
          최근 재생한 노래
        </S.Menu>
        <S.LogOut onClick={logout}>로그아웃</S.LogOut>
      </S.Container>
      <S.shadow className="shadow" ref={shadow} onClick={menuOnOff}></S.shadow>
    </>
  );
};

export default SideMenu;
