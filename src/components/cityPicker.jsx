import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import mainService from '../utilities/services'
import arrow from '../assets/arrow.svg'
 

export const CityPicker = () => {
  const { parameters, setCity, setAllBranches, allBranches } = useServiceChooser()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const floatingWindowRef = useRef()
  const [listVisibility, setListVisibility] = useState(false)
  const [cities, setCities] = useState([])

  // Making the first argument of useEffect hook an async function resulted in 'destroy is not a function' error.
  // I used an immediately invoked function to circumvent this error. -Bakai
  useEffect(() => {
    (async () => {
      const result = await mainService.getBranches()
      setAllBranches(result)
      // Find all unique cities on branches object
      setCities([...new Set(result.map(item => item.lang_name === i18n.language ))])
    })()   
  }, [])
  
  const handleListVisibility = (event) => {
    setListVisibility(!listVisibility)
    
    // To close the floating window by clicking anyware on the page
    document.addEventListener('click', handler, { capture: true })
    function handler(event) {
      if (!floatingWindowRef.current?.contains(event.target)) {
        setListVisibility(false)
        document.removeEventListener('click', handler, { capture: true })
      }
    }
  }
  
  const handleCityChoice = (event) => {
    setCity(event.target.value)
    setListVisibility(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault
    navigate('../branch')
  }
  console.log(cities)
  const findCityName = (branch) => {
    if (!branch) {
      return
    }
    console.log(branch)
    const chosenLang = branch.lang_name?.find(name => name.lang === i18n.language)
    console.log(chosenLang)
    return chosenLang?.text
  }

  return(
    <div className='glass-container glass-container--grid-3'>
      <p className="text">{ t('receiveingAnElectronicQueue') }</p>

      <div className='picker'>
        <p className="picker__label">{ t('step') } 1/5</p>

        <div 
          ref={ floatingWindowRef }
          className="picker__button"
          type='button'
          onClick={ handleListVisibility }
        >
          <span className="picker__inner-text">{ parameters.city || t('chooseCity') }</span>
          <span className="picker__arrow-symbol">&#8964;</span>          
        
          <div 
            className="picker__list-container" 
            style={{ visibility: listVisibility ? "visible" : "hidden" }}
          >
            { allBranches.map((branch, index) => {
              return(
                <button  
                  className="picker__button picker__button--secondary"
                  key={ index }
                  type='button' 
                  // value={ branch }
                  onClick={ handleCityChoice }
                >
                  <span 
                    className="picker__inner-text picker__inner-text--secondary">
                      { findCityName(branch) }
                  </span>               
                </button>
              )
            })}
          </div>        
        
        </div>       

      </div>
      
      <button 
        style={{ display: parameters.city ? '' : 'none' }} 
        onClick={ handleSubmit } 
        className="arrow arrow--right"
      >
        <img src={ arrow } className="arrow__icon"></img>
      </button>

    </div>
  )
}