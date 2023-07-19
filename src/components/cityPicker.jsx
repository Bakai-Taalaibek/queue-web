import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import mainService from '../utilities/services'


export const CityPicker = () => {
  const { parameters, setCity } = useServiceChooser()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const floatingWindowRef = useRef()
  const [branches, setBranches] = useState([])
  const [citiesVisibility, setCitiesVisibility] = useState(false)
  const [cities, setCities] = useState([])

  // Making the first argument of useEffect hook an async function resulted in 'destroy is not a function' error.
  // I used an immediately invoked function to circumvent this error. -Bakai
  useEffect(() => {
    (async () => {
      const result = await mainService.getBranches()
      setBranches(result)
      setCities([...new Set(result.map(item => item.city))])
    })()   
  }, [])

  const handleCitiesVisibility = (event) => {
    setCitiesVisibility(!citiesVisibility)

    document.addEventListener('mousedown', handler)
    function handler(event) {
      if (!floatingWindowRef.current.contains(event.target)) {
        setCitiesVisibility(false)
        document.removeEventListener('mousedown', handler)
      }
    }
  }

  const handleCityChoice = (event) => {
    setCity(event.target.value)
    setCitiesVisibility(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault
    navigate('../documents')
  }

  return(
    <div>
      <h2>Получение электронной очереди</h2>
      <p>Шаг 1/5</p>

      <div ref={ floatingWindowRef } >
        <button 
          type='button'
          onClick={ handleCitiesVisibility }
        >
          { parameters.city || 'Выберите город' } &#8964; 
        </button>
        
        <div style={{ visibility: citiesVisibility ? "visible" : "hidden" }}>
          { cities.map((city, index) => {
            return(
              <button  
                key={ index }
                type='button' 
                value={ city }
                onClick={ handleCityChoice }
              >
                { city }                
              </button>
            )
          })}
        </div>
      </div>
      
      <button onClick={ handleSubmit }>Далее</button>

    </div>
  )
}