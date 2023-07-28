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
import lang from '../assets/lang.svg'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useServiceChooser } from "../utilities/zustand"
import mainService from '../utilities/services'


export const Header = () => {
  const { i18n } = useTranslation()
  const [ logoClicksCount, setLogoClicksCount ] = useState(1)
  const [ pendingTimeout, setPendingTimeout ] = useState(null)
  const navigate = useNavigate()
  const { resetServerResponse, user, resetSomeState } = useServiceChooser()
  const [langMenu, setLangMenu] = useState(false)
  const floatingWindowRef = useRef()


  // This function blocks the terminal if you press the logo 5 times in 5000 miliseconds. 
  const handleLogoClick = () => {
    resetServerResponse()
    navigate('')
  }

  const handleExit = () => {
    resetSomeState()
    mainService.setToken(null)
    window.localStorage.removeItem(
      'loggedUser'
    )
    navigate('')
  }

  const handleLangClick = () => {
    setLangMenu(!langMenu)
    
    // To close the floating window by clicking anyware on the page
    document.addEventListener('click', handler, { capture: true })
    function handler(event) {
      if (!floatingWindowRef.current?.contains(event.target)) {
        setLangMenu(false)
        document.removeEventListener('click', handler, { capture: true })
      }
    }
  }

  const languages = [{name: 'Рус', code: 'ru'}, {name: 'Кырг', code: 'ky'}, {name: 'Eng', code: 'en'} ]

  return (
    <div className='header'>
      <div className='horisontal-group' onClick={ handleLogoClick }> 
        <div className='logo-custom'></div>
        <img src={ logo2 } alt="logo2"></img>
      </div>
      
      <div style={ { display: 'flex' } }>
        <img className='lang__icon' src={ lang } alt="globe icon" ></img>

        <div className='lang__container'>
          <div 
            className='lang__text button--text' 
            onClick={ handleLangClick } 
            ref={ floatingWindowRef }
          >
            <p>{ i18n.language === 'ru' ? 'Рус' : i18n.language === 'en' ? 'Eng' : 'Кырг' }</p><p>&#x25BE;</p>
          </div>

          <div className='lang__dropdownMenu' style={{ display: langMenu ? '' : 'none' }}>

            { languages.filter(lang => lang.code !== i18n.language ).map(lang => {
              return(
                <div className=' button--text' onClick={ () => i18n.changeLanguage(lang.code) }>
                  { lang.name }
                </div>
              )
            })}

          </div>

        </div>


        { user ? 
          <>
            <div className='button--text' onClick={ () => navigate('../mytickets') }>Мои талоны</div>
            <div className='button--text' onClick={ handleExit }>Выйти</div>
          </> :
          <button className='button--text' onClick={ () => navigate('../authorization') }>Войти</button>
        }
      </div>
    </div>
  )
}