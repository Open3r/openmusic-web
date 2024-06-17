import { useRef, useState } from "react";
import * as S from "./style";

const SideMenu = () => {
  const sideMenu = useRef<HTMLDivElement | null>(null);
  const onOffBtn = useRef<HTMLDivElement | null>(null);
  const [menuState, setMenuState] = useState(false);

  document.documentElement.addEventListener('click',(e:any)=>{
    if(!e.target.className.includes('sideMenu')) {
      if(sideMenu.current && onOffBtn.current) {
        sideMenu.current.style.width = "0rem";
        onOffBtn.current.style.right = "0.5rem";
        setMenuState(false);
      }
    }
  });

  const menuOnOff = () => {
    if (sideMenu.current && onOffBtn.current) {
      if (!menuState) {
        sideMenu.current.style.width = "30rem";
        onOffBtn.current.style.right = "30.5rem";
        setMenuState(true);
      } else {
        sideMenu.current.style.width = "0rem";
        onOffBtn.current.style.right ="0.5rem";
        setMenuState(false);
      }
    }
  };

  return (
    <S.Container ref={sideMenu} className="sideMenu">
      SideMenu
      <S.MenuOnBtn onClick={menuOnOff} ref={onOffBtn} className="sideMenu">
      </S.MenuOnBtn>
    </S.Container>
  );
};

export default SideMenu;
