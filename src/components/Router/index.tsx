import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../../layouts/Layout";
import HomePage from "../../pages/HomePage";
import PlaylistPage from "../../pages/PlaylistPage";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import Verify from "../../pages/Verify";
import UploadPage from "../../pages/UploadPage";
import MyPage from "../../pages/MyPage";

const Router = () => {
  const location = useLocation();

  // Define variants for animation
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -50,
    },
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        {" "}
        {/* Updated from exitBeforeEnter to mode="wait" */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/my-page" element={<MyPage />} />
          </Route>
          <Route
            path="/login"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/signup"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <SignUp />
              </motion.div>
            }
          />
          <Route
            path="/verify"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <Verify />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default Router;
