import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomToastContainer from "./components/Notification/CustomToastContainer";
import Router from "./components/Router";
import Header from "./layouts/Header";
import PlayBar from "./layouts/PlayBar";

function App() {
  const [headerHideLayout, setHeaderHideLayout] = useState(false);
  const [playBarHideLayout, setPlayBarHideLayout] = useState(false);
  const location = useLocation();
  

  useEffect(() => {
    const hidePaths = ["/login", "/signup", "/verify"];
    setHeaderHideLayout(hidePaths.includes(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const hidePaths = ["/login", "/signup", "/verify", "/upload"];
    setPlayBarHideLayout(hidePaths.includes(location.pathname));
  }, [location.pathname]);



  return (
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
  );
}

export default App;
