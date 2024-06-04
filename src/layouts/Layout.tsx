import PlayBar from './PlayBar'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import QueueBox from './QueueBox'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <QueueBox />
      <PlayBar />
    </>
  )
}

export default Layout