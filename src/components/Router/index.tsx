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
import AlbumPage from "../../pages/AlbumPage";
import ArtistPage from "../../pages/ArtistPage";
import NotFoundPage from "../../pages/NotFondPage";
import { SearchPage } from "../../pages/SearchPage";
import RankPage from "../../pages/RankPage";
import QueuePage from "../../pages/QueuePage";
import RecentPage from "../../pages/RecentPage";
import NewSongPage from "../../pages/NewSongPage";
import NewAlbumPage from "../../pages/NewAlbumPage";
import NewPlaylistPage from "../../pages/NewPlaylistPage";
import LandingPage from "../../pages/LandingPage";
import GenreChoosePage from "../../pages/GenreChoosePage";
import { GoogleCallback } from "../../pages/Callback/Google";

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
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/playlist/:id" element={<PlaylistPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/search/:keyword" element={<SearchPage />} />
            <Route path="/rank" element={<RankPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/recent" element={<RecentPage />} />
            <Route path="/song" element={<NewSongPage />} />
            <Route path="/album" element={<NewAlbumPage />} />
            <Route path="/playlist" element={<NewPlaylistPage />} />
            <Route path="/callback/google" element={<GoogleCallback/>} />
            <Route path="/*" element={<NotFoundPage />} />
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
          <Route
            path="/genre"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <GenreChoosePage />
              </motion.div>
            }
          />
          <Route
            path="/intro"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <LandingPage />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default Router;
