import { Outlet } from "react-router-dom";
import './styles/mainStyles.scss'
import { Header } from './components/header'
import { Footer } from './components/footer';
import { useEffect } from 'react'

function App({ errorOutlet }) {
  useEffect(() => {
    // Check localstorage, if login data is there - populate global login state 
    console.log('hi')
  }, [])

  return (
    <div className='main'> 
      <Header />

      <div className='body'>
        { errorOutlet ? errorOutlet : <Outlet /> }
      </div>

      <Footer />
    </div>
  )
}

export default App
