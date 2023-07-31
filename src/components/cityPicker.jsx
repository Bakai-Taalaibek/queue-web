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

  // Making the first argument of useEffect hook an async function resulted in 
  // 'destroy is not a function' error.
  // I used an immediately invoked function to circumvent this error. -Bakai
  useEffect(() => {
    (async () => {
      const branches = await mainService.getBranches()
      setAllBranches(branches)

      // I want to create an array of all unique cities + their names in chosen language...
      let cityNames = []
      let uniqueCities = []
      for (let i = 0; i < branches.length; i++) {
        // While iterating over branches find its city's name in chosen language
        const allLanguageObjects = branches[i].lang_name
        const cityInChosenLang = allLanguageObjects.find(item => item.lang === i18n.language)
        // I only add a city to my array if it doesn't exist there yet 
        if (!uniqueCities.includes(branches[i].city)) {
          uniqueCities.push(branches[i].city)
          // And now I create an object with city name and translation which I push to an array
          const obj = { name: branches[i].city, translation: cityInChosenLang.text }
          cityNames.push(obj)
        }
      }
      setCities(cityNames)
    })()   
  }, [i18n.language])


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
            { cities.map((city, index) => {
              return(
                <button  
                  className="picker__button picker__button--secondary"
                  key={ index }
                  type='button' 
                  value={ city.name }
                  onClick={ handleCityChoice }
                >
                  <span 
                    className="picker__inner-text picker__inner-text--secondary">
                      { city.translation }
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