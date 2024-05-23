import {Route, Routes } from 'react-router-dom'
import Layout from '../../layouts/Layout'
import Home from '../../pages/Home'
import LoginPage from '../../pages/LoginPage'
import SignupPage from '../../pages/SignupPage'
import PlaylistPage from '../../pages/PlaylistPage'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="/playlist" element={<PlaylistPage />}/>
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  )
}

export default Router