import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next';
import arrow from '../assets/arrow.svg'
 
export const ClientInfo = () => {
  const { setPensionerState, setPersonState, parameters } = useServiceChooser()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = (event) => {
    event.preventDefault
    // setPensionerState(pensioner)
    navigate('../documents')
  }

  return (
    <>
      <button className='icon-background icon-background--arrow'>
        <img src={ arrow } onClick={ () => navigate(-1) } className='icon-button icon-button--arrow'></img>
      </button>

      {/* <button onClick={ () => navigate(-1) } className='icon-button icon-button--absolute'></button> */}

      <form className='centered-form'>
        <p className="text">{ t('chooseClientType') }</p>
        <div style={ { display: 'flex', marginTop: '20px' } }>
          <p 
            className='button' style={ { backgroundColor: parameters.client_type === 'physical' ? '#cccccc' : '' } } 
            onClick={ () => setPersonState('physical') }>{ t('individual') }
          </p>

          <p 
            className='button' style={ { backgroundColor: parameters.client_type === 'legal' ? '#cccccc' : '' } } 
            onClick={ () => setPersonState('legal') }>{ t('legalEntity') }
          </p>
        </div>

        <div className="checkbox-container" >
          <input onClick={ () => setPensionerState(!parameters.is_pensioner) } type="checkbox" id="pensioner" name="pensioner" />
          <label className="text text--smaller" htmlFor="pensioner">{ t('iAmApensioner') }</label>
        </div>

        <button className="button button--smaller" type="button" onClick={ handleSubmit }>{ t('onward') }</button>
      </form>
    </>
  )
}