import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import mainService from '../utilities/services'


export const BranchPicker = () => {
  const { parameters, setBranch, allBranches } = useServiceChooser()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const floatingWindowRef = useRef()
  const [branches, setBranches] = useState([])
  const [listVisibility, setListVisibility] = useState(false)

  // Making the first argument of useEffect hook an async function resulted in 'destroy is not a function' error.
  // I used an immediately invoked function to circumvent this error. -Bakai
//   useEffect(() => {
//     (async () => {
//       const result = await mainService.getBranches()
//       setBranches(result)
//     })()   
//   }, [])

  const handleListVisibility = (event) => {
    setListVisibility(!listVisibility)

    // To close the floating window by clicking anyware on the page
    document.addEventListener('mousedown', handler)
    function handler(event) {
      if (!floatingWindowRef.current.contains(event.target)) {
        setListVisibility(false)
        document.removeEventListener('mousedown', handler)
      }
    }
  }

  const handleBranchChoice = (event) => {
    setBranch(event.target.value)
    setListVisibility(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault
    navigate('../service')
  }

  return(
    <div>
      <h2>Получение электронной очереди</h2>
      <p>Шаг 2/5</p>

      <div ref={ floatingWindowRef } >
        <button 
          type='button'
          onClick={ handleListVisibility }
        >
          { parameters.branch || 'Выберите филиал' } &#8964; 
        </button>
        
        <div style={{ visibility: listVisibility ? "visible" : "hidden" }}>
          { allBranches.map((branch, index) => {
            return(
              <button  
                key={ index }
                type='button' 
                value={ branch }
                onClick={ handleBranchChoice }
              >
                { branch.address }                
              </button>
            )
          })}
        </div>
      </div>
      
      <button disabled={ parameters.branch ? false : true } onClick={ handleSubmit }>Далее</button>

    </div>
  )
}