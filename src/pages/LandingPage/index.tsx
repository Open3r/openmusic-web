import { useEffect, useRef } from "react";
import * as S from "./style";
import MockUp from "../../assets/imgs/MockUp.png";
import Logo from "../../assets/imgs/logo_color.png";
import MobileMock from "../../assets/imgs/MobileMock.png";
import MobileMock2 from "../../assets/imgs/MobileMock2.png";
import MobileMock3 from "../../assets/imgs/MobileMock3.png";

const LandingPage = () => {
  const mobileMockRef1 = useRef<HTMLImageElement>(null);
  const mobileMockRef2 = useRef<HTMLImageElement>(null);
  const mobileMockRef3 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, 500);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (mobileMockRef1.current) observer.observe(mobileMockRef1.current);
    if (mobileMockRef2.current) observer.observe(mobileMockRef2.current);
    if (mobileMockRef3.current) observer.observe(mobileMockRef3.current);

    return () => {
      if (mobileMockRef1.current) observer.unobserve(mobileMockRef1.current);
      if (mobileMockRef2.current) observer.unobserve(mobileMockRef2.current);
      if (mobileMockRef3.current) observer.unobserve(mobileMockRef3.current);
    };
  }, []);

  return (
    <S.Container bg={MockUp}>
      <S.Header>
        <S.H1>
          <img src={Logo} alt="" style={{ marginRight: "1rem",width:'4rem' }} />
          <span
            style={{
              color: "#F1F1F1",
              fontSize: "1.5rem",
              fontWeight: "300",
              marginLeft: "1rem",
            }}
          >
            당신만의 작은 음악관
          </span>
        </S.H1>
        <S.HeaderButtonWrap>
          <S.HeaderLogin to="/login">Login</S.HeaderLogin>
          <S.HeaderSignIn to="/signup">Sign up</S.HeaderSignIn>
        </S.HeaderButtonWrap>
      </S.Header>
      <S.First>
        <img src={Logo} alt="" style={{ marginRight: "1rem" }} />
        오픈뮤직, 당신만의 작은 음악관.
        <S.MobileMockUp
          ref={mobileMockRef1}
          src={MobileMock}
          className="hidden"
        />
        <S.MobileMockUp
          ref={mobileMockRef2}
          src={MobileMock2}
          style={{ top: "0rem", right: "8rem", zIndex: "998" }}
          className="hidden"
        />
      </S.First>
      <S.Second>
        <span>
          안전하게
          <br />
          <br />
          확실하게
          <br />
          <br />
          정확하게
        </span>
        <S.MobileMockUp
          ref={mobileMockRef3}
          src={MobileMock3}
          style={{ zIndex: "998", top: "2rem", left: "20rem" }}
          className="hidden"
        />
      </S.Second>
      <S.Third>
        <img src={Logo} alt="" />
        지금 시작해보세요!
        <S.navigateWrap>
          <S.Navigate to="/signup">Sign up</S.Navigate>
          <S.Navigate style={{ color: "#52a9f9" }} to="/login">
            Login
          </S.Navigate>
        </S.navigateWrap>
      </S.Third>
    </S.Container>
  );
};

export default LandingPage;
