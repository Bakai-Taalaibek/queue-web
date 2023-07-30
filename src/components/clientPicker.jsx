import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next'
import arrow from '../assets/arrow.svg'
 
export const ClientInfo = () => {
  const { setPensionerState, setPersonState, parameters } = useServiceChooser()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = (event) => {
    event.preventDefault
    navigate('../documents')
  }

  return (
    <div className='glass-container glass-container--grid-3-uneven'>

      <button 
        onClick={ () => navigate(-1) } 
        className="arrow arrow--left"
      >
        <img src={ arrow } className="arrow__icon"></img>
      </button> 

      {/* <button onClick={ () => navigate(-1) } className='icon-button icon-button--absolute'></button> */}

      <p className="text">{ t('chooseClientType') }</p>

      <div className="picker">
        <p className="picker__label">{ t('step') } 4/5</p>
        <div className="horisontal-group">
          <div
            className='button' style={ { backgroundColor: parameters.client_type === 'physical' ? '#70b7fa' : '' } } 
            onClick={ () => setPersonState('physical') }><p className="text text--button">{ t('individual') }</p>
          </div>

          <div 
            className='button ' style={ { backgroundColor: parameters.client_type === 'legal' ? '#70b7fa' : '' } } 
            onClick={ () => setPersonState('legal') }><p className="text text--button">{ t('legalEntity') }</p>
          </div>          
        </div>

        <div className="checkbox-container" >
          <input onClick={ () => setPensionerState(!parameters.is_pensioner) } type="checkbox" id="pensioner" name="pensioner" />
          <label className="text text--smaller" htmlFor="pensioner">{ t('iAmApensioner') }</label>
          <div style={{ visibility: parameters.is_pensioner ? '' : 'hidden' }} className="checkmark"></div>
        </div>
      </div>

      <button 
        style={{ display: parameters.client_type ? '' : 'none' }} 
        onClick={ handleSubmit } 
        className="arrow arrow--right"
      >
        <img src={ arrow } className="arrow__icon"></img>
      </button>  
      
    </div>
  )
}