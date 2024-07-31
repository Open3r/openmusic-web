import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomToastContainer from "./libs/notification/CustomToastContainer";
import Router from "./components/Router";
import Header from "./layouts/Header";
import PlayBar from "./layouts/PlayBar";
import { isMobile } from "react-device-detect";

function App() {
  const [headerHideLayout, setHeaderHideLayout] = useState(false);
  const [playBarHideLayout, setPlayBarHideLayout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hidePaths = ["/login", "/signup", "/verify", "/intro", "/genre", "/callback/google"];
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
      {
        !isMobile ? (
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
          <h1>모바일 입니다.</h1>
        )
      }
    </>
    
  );
}

export default App;
