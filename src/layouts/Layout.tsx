import QueueBox from './QueueBox'
import PlayBar from './PlayBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Outlet />
      <QueueBox />
      <PlayBar />
    </>
  )
}

export default Layout