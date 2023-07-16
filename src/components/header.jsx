import '../styles/mainStyles.scss'
import logo from '../assets/LOGO.png'
import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.svg'
// import enIcon from '../assets/Frame 48.png'
// import kyIcon from '../assets/Frame 49.png'
// import ruIcon from '../assets/Frame 48-1.png'
import enIcon from '../assets/us.svg'
import kyIcon from '../assets/kg.svg'
import ruIcon from '../assets/ru.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


export const Header = () => {
  const { i18n } = useTranslation()
  const [ logoClicksCount, setLogoClicksCount ] = useState(1)
  const [ pendingTimeout, setPendingTimeout ] = useState(null)
  const navigate = useNavigate()


  // This function blocks the terminal if you press the logo 5 times in 5000 miliseconds. 
  const handleLogoClick = () => {
    setLogoClicksCount(logoClicksCount + 1)

    // Clear out previous timeout function
    if (pendingTimeout) {
      clearTimeout(pendingTimeout)
    }

    let timeoutId = setTimeout(() => {
      setLogoClicksCount(0)
    }, 5000)
    setPendingTimeout(timeoutId)

    if (logoClicksCount > 2) {
      navigate('/entry')
    }
  }

  return (
    <div className='header'>
      <div className='horisontal-group' onClick={ handleLogoClick }> 
        <div className='logo-custom'></div>
        <img src={ logo2 } alt="logo2"></img>
        {/* <img style={ { marginRight: '28px' } }  src={ logo1 } alt="logo1"></img> */}
      </div>
      {/* <img onClick={ handleLogoClick } src={ logo } alt="logo"></img> */}
      
      <div style={ { display: 'flex' } }>
        <button className='icon-background' onClick={ () => i18n.changeLanguage('ky') }>
          <img src={ kyIcon } alt="kyrgyz icon" className='icon-button' value='ky' ></img>
        </button>

        <button className='icon-background' onClick={ () => i18n.changeLanguage('ru') }>
          <img src={ ruIcon } alt="russian icon" className='icon-button' value='ru'></img>
        </button>

        <button className='icon-background' onClick={ () => i18n.changeLanguage('en') }>
          <img src={ enIcon } alt="english icon" className='icon-button' value='en'></img>
        </button>
      </div>
    </div>
  )
}