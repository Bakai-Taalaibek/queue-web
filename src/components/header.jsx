import '../styles/mainStyles.scss'
import logo2 from '../assets/logo2.svg'
import lang from '../assets/lang.svg'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useServiceChooser } from "../utilities/zustand"
import mainService from '../utilities/services'


export const Header = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { resetServerResponse, user, resetSomeState, setUser } = useServiceChooser()
  const [langMenu, setLangMenu] = useState(false)
  const floatingWindowRef = useRef()


  const handleLogoClick = () => {
    resetServerResponse()
    navigate('')
  }

  const handleExit = () => {
    resetSomeState()
    setUser(null)
    mainService.setRefreshToken(null)
    window.localStorage.removeItem(
      'loggedQueueWebUser'
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
            style={{ borderBottom: langMenu ? '1.5px solid transparent' : '1.5px solid white' }} 
            onClick={ handleLangClick } 
            ref={ floatingWindowRef }
          >
            <p>{ i18n.language === 'ru' ? 'Рус' : i18n.language === 'en' ? 'Eng' : 'Кырг' }</p><p>&#x25BE;</p>
          </div>

          <div className='lang__dropdownMenu' style={{ display: langMenu ? '' : 'none',  borderBottom: langMenu ? '1.5px solid white' : '1.5px solid transparent'}}>
            { languages.filter(lang => lang.code !== i18n.language ).map((lang, index) => {
              return(
                <div key={ index } className='button--text' onClick={ () => i18n.changeLanguage(lang.code) }>
                  { lang.name }
                </div>
              )
            })}            
          </div>
        </div>

        { user ? 
          <>
            <div className='button--text' onClick={ () => navigate('../mytickets') }>{ t('myTickets') }</div>
            <div className='button--text' onClick={ handleExit }>{ t('exit') }</div>
          </> :
          <button className='button--text' onClick={ () => navigate('../authorization') }>{ t('enter') }</button>
        }
      </div>
    </div>
  )
}