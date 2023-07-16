import { Outlet } from "react-router-dom";
import './styles/mainStyles.scss'
import { Header } from './components/header'
import { Footer } from './components/footer';

function App({ errorOutlet }) {

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
