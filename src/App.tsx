import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomToastContainer from "./components/Notification/CustomToastContainer";
import Router from "./components/Router";
import Header from "./layouts/Header";
import PlayBar from "./layouts/PlayBar";
import useGetUser from "./hooks/useGetUser";
import { userStore } from "./stores/userStore";

function App() {
  const [hideLayout, setHideLayout] = useState(false);
  const location = useLocation();
  const { getUser } = useGetUser();
  const setUser = userStore(state=>state.setUser);

  const userReq = async () => {
    try {
      const res = await getUser();
      setUser(res.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    const hidePaths = ["/login", "/signup", "/verify"];
    setHideLayout(hidePaths.includes(location.pathname));
  }, [location.pathname]);

  useEffect(()=>{
    userReq();
  },[]);

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
