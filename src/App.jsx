import { Outlet } from "react-router-dom";
import './styles/mainStyles.scss'
import { Header } from './components/header'
import { useEffect } from 'react'
import { useServiceChooser } from "./utilities/zustand"
import mainService from './utilities/services'

function App({ errorOutlet }) {
  const { setUser } = useServiceChooser()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedQueueWebUser')   
    if (loggedUserJSON) {      
      const storedUser = JSON.parse(loggedUserJSON)      

      setUser(storedUser)    
      mainService.setToken(storedUser.access_token)    
    }  
  }, [])

  return (
    <> 
      <Header />

      { errorOutlet ? errorOutlet : <Outlet /> }

      <div className="footer"></div>
    </>
  )
}

export default App
