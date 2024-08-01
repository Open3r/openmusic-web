import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomToastContainer from "./libs/notification/CustomToastContainer";
import Router from "./components/Router";
import Header from "./layouts/Header";
import PlayBar from "./layouts/PlayBar";
import { isMobile } from "react-device-detect";
import Logo from "./assets/imgs/logo_color.png";

function App() {
  const [headerHideLayout, setHeaderHideLayout] = useState(false);
  const [playBarHideLayout, setPlayBarHideLayout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hidePaths = [
      "/login",
      "/signup",
      "/verify",
      "/intro",
      "/genre",
      "/callback/google",
    ];
    setHeaderHideLayout(hidePaths.includes(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const hidePaths = [
      "/login",
      "/signup",
      "/verify",
      "/upload",
      "/intro",
      "/genre",
      "/callback/google",
    ];
    setPlayBarHideLayout(hidePaths.includes(location.pathname));
  }, [location.pathname]);

  return (
    <>
      {!isMobile ? (
        <>
          <CustomToastContainer />
          <Router />
          {!headerHideLayout && (
            <>
              <Header />
            </>
          )}
          {!playBarHideLayout && (
            <>
              <PlayBar />
            </>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100vw",
            height: "50rem",
          }}
        >
          <img src={Logo} alt="" style={{ marginBottom: "2rem" }} />
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            오픈뮤직 웹은
            <br />
            PC에서만 지원합니다!
          </h1>
          <p style={{ fontSize: "1.7rem", textAlign: "center", color: "gray" }}>
            모바일에서 오픈 뮤직을 사용하려면
            <br />
            모바일 앱을 이용해주세요.
          </p>
        </div>
      )}
    </>
  );
}

export default App;
