import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react'


export const CityPicker = () => {
  const { setPensionerState, setPersonState, parameters } = useServiceChooser()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const floatingWindowRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault
    // setPensionerState(pensioner)
    navigate('../documents')
  }

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value)
    setFloatingLangWindow(!floatingLangWindow)

    document.addEventListener('mousedown', handler)
    function handler(event) {
      if (!floatingWindowRef.current.contains(event.target)) {
        setFloatingLangWindow(false)
        document.removeEventListener('mousedown', handler)
      }
    }
  }

  return(
    <div>
      <h2>Получение электронной очереди</h2>
      <p>Шаг 1/5</p>

      <div className=''>
        <button 
          type='button'
          // value={ parameters.city || 'Выберите город' }
          onClick={ handleLanguageChange }
        >
          { parameters.city || 'Выберите город' } &#8964; 
        </button>
        <button 
          ref={ floatingWindowRef }  
          type='button' 
          // className={ floatingLangWindow ? floatingWindow : 'hidden' }
          value={ i18n.language === 'ru' ? 'en' : 'ru' }
          onClick={ handleLanguageChange }
        >
          Бишкек
        </button>
      </div>
    </div>
  )
}