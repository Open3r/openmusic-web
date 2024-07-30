import { useRef, useState } from "react";
import * as S from "./style";
import { userStore } from "../../stores/userStore";

const SideMenu = () => {
  const sideMenu = useRef<HTMLDivElement | null>(null);
  const onOffBtn = useRef<HTMLImageElement | null>(null);
  const shadow = useRef<HTMLDivElement | null>(null);
  const [menuState, setMenuState] = useState(false);
  const user = userStore(state=>state.user);

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

  return (
    <>
      <S.Container ref={sideMenu} className="sideMenu">
        {user.nickname}
        <S.MenuOnBtn
          onClick={menuOnOff}
          ref={onOffBtn}
          className="sideMenu"
        ></S.MenuOnBtn>
      </S.Container>
      <S.shadow className="shadow" ref={shadow} onClick={menuOnOff}></S.shadow>
    </>
  );
};

export default SideMenu;
