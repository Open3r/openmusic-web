import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
import Layout from "../../layouts/Layout";
import HomePage from "../../pages/HomePage";
import PlaylistPage from "../../pages/PlaylistPage";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import Verify from "../../pages/Verify";

const pageVariants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: -100,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const Router = () => {
  const location = useLocation();

  return (
    <div style={{ overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="/playlist"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PlaylistPage />
                </motion.div>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
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
                transition={pageTransition}
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
                transition={pageTransition}
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