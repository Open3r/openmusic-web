import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomToastContainer from "./components/Notification/CustomToastContainer";
import Router from "./components/Router";
import Header from "./layouts/Header";
import PlayBar from "./layouts/PlayBar";

function App() {
  const [hideLayout, setHideLayout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hidePaths = ["/login", "/signup", "/verify"];
    setHideLayout(hidePaths.includes(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <CustomToastContainer />
      <Router />
      {!hideLayout && (
        <>
          <Header />
          <PlayBar />
        </>
      )}
    </>
  );
}

export default App;
