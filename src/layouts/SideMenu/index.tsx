import { useRef, useState } from "react";
import * as S from "./style";
import { userStore } from "../../stores/userStore";
import { removeCookie } from "../../libs/cookies/cookie";
import NotificationService from "../../libs/notification/NotificationService";
import { useNavigate } from "react-router-dom";


const SideMenu = () => {
  const sideMenu = useRef<HTMLDivElement | null>(null);
  const shadow = useRef<HTMLDivElement | null>(null);
  const [menuState, setMenuState] = useState(false);
  const user = userStore(state=>state.user);
  const setUser = userStore(state=>state.setUser);
  const navigate = useNavigate();

  const menuOnOff = () => {
    if (sideMenu.current && shadow.current) {
      if (!menuState) {
        sideMenu.current.style.right = "0rem";
        shadow.current.style.display = 'block';
        setMenuState(true);
      } else {
        sideMenu.current.style.right = "-30rem";
        shadow.current.style.display = 'none'; 
        setMenuState(false);
      }
    }
  };

  const logout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setUser({
      id:0,
      nickname:'',
      email:'',
      provider:'',
      status:'',
      genres:[],
      avatarUrl:'',
      role:''
    })
    NotificationService.success('로그아웃 되었습니다.');
    navigate('/intro');
  }

  return (
    <>
      <S.Hamburger src="/assets/imgs/Hamburger.svg" onClick={menuOnOff}/>
      <S.Container ref={sideMenu}>
        <S.closeWrap>
          <img src="/assets/imgs/MenuClose.svg" alt="" style={{width:'3rem',height:'3rem',cursor:'pointer'}} onClick={menuOnOff}/>
        </S.closeWrap>
        <S.ProfileWrap>
          <S.Avatar src={user.avatarUrl} />
          <S.Nickname>{user.nickname}</S.Nickname>
        </S.ProfileWrap>
        <S.Menu to="/my-page">
          <img src="/assets/imgs/mypage.svg" alt="" />
          마이페이지
        </S.Menu>
        <S.Menu to="/upload">
          <img src="/assets/imgs/Vector.svg" alt="" />
          앨범 업로드
        </S.Menu>
        <S.Menu to="/queue">
          <img src="/assets/imgs/Vector-1.svg" alt="" />
          재생목록
        </S.Menu>
        <S.Menu to="/recent">
          <img src="/assets/imgs/Vector-2.svg" alt="" />
          최근 재생한 노래
        </S.Menu>
        <S.LogOut onClick={logout}>로그아웃</S.LogOut>
      </S.Container>
      <S.shadow ref={shadow} onClick={menuOnOff}></S.shadow>
    </>
  );
};

export default SideMenu;
