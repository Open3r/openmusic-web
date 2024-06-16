import { Outlet } from 'react-router-dom'
import Header from './Header'
import QueueBox from './QueueBox'

const Layout = () => {
  return (
    <>
      
      <Outlet />
      {/* <QueueBox /> */}
    </>
  )
}

export default Layout