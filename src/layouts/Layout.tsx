import PlayBar from './PlayBar'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <PlayBar />
    </>
  )
}

export default Layout