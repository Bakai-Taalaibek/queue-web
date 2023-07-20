import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'


export const BranchPicker = () => {
  const { parameters, setBranch, allBranches, setBranchAddress } = useServiceChooser()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const floatingWindowRef = useRef()
  const [listVisibility, setListVisibility] = useState(false)

  const handleListVisibility = (event) => {
    setListVisibility(!listVisibility)

    // To close the floating window by clicking anyware on the page
    document.addEventListener('mousedown', handler)
    function handler(event) {
      if (!floatingWindowRef.current?.contains(event.target)) {
        setListVisibility(false)
        document.removeEventListener('mousedown', handler)
      }
    }
  }

  const handleBranchChoice = (branch) => {
    setBranch(branch.id)
    setBranchAddress(branch.address)
    setListVisibility(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault
    navigate('../schedule')
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
          { parameters.branchAddress || 'Выберите филиал' } &#8964; 
        </button>
        
        <div style={{ visibility: listVisibility ? "visible" : "hidden" }}>
          { allBranches.filter(branch => branch.city === parameters.city).map((branch, index) => {
            return(
              <button  
                key={ index }
                type='button' 
                onClick={ () => handleBranchChoice(branch) }
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