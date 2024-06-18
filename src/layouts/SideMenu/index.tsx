import { useRef, useState } from "react";
import * as S from "./style";

const SideMenu = () => {
  const sideMenu = useRef<HTMLDivElement | null>(null);
  const onOffBtn = useRef<HTMLDivElement | null>(null);
  const shadow = useRef<HTMLDivElement | null>(null);
  const [menuState, setMenuState] = useState(false);

  // shadow.current?.addEventListener('click',(e:any)=>{
  //   if(!e.target.className.includes('sideMenu')) {
  //     if(sideMenu.current && onOffBtn.current && shadow.current) {
  //       sideMenu.current.style.left = "-30rem";
  //       onOffBtn.current.style.left = "0.5rem";
  //       shadow.current.style.display = 'none';
  //       setMenuState(false);
  //     }
  //   }
  // });

  const menuOnOff = () => {
    if (sideMenu.current && onOffBtn.current && shadow.current) {
      if (!menuState) {
        sideMenu.current.style.left = "0rem";
        onOffBtn.current.style.left = "30.5rem";
        shadow.current.style.display = 'inline';
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
        SideMenu
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
