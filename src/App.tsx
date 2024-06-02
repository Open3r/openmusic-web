// import { GoogleLogin } from "@react-oauth/google";
import CustomToastContainer from "./components/Notification/CustomToastContainer";
import Router from "./components/Router";

function App() {


  return (
    <>
      <CustomToastContainer />
      <Router />
      {/* <GoogleLogin
      onSuccess={response => console.log(response)}
      onError={() => console.error("Error")}
      /> */}
    </>
  )
}

export default App
