import { Outlet } from 'react-router-dom'
import SideMenu from './SideMenu'

const Layout = () => {
  return (
    <>
      <Outlet />
      <SideMenu />
    </>
  )
}

export default Layout