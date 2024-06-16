// import { GoogleLogin } from "@react-oauth/google";
import CustomToastContainer from "./components/Notification/CustomToastContainer";
import Router from "./components/Router";
import Header from "./layouts/Header";
import PlayBar from "./layouts/PlayBar";

function App() {


  return (
    <>
      <Header />
      <CustomToastContainer />
      <Router />
      <PlayBar />
      {/* <GoogleLogin
      onSuccess={response => console.log(response)}
      onError={() => console.error("Error")}
      /> */}
    </>
  );
}

export default App
