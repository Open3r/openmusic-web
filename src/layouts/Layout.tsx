import QueueBox from './QueueBox/QueueBox'
import PlayBar from './PlayBar/PlayBar'
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