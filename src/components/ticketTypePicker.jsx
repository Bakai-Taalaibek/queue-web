import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import mainService from '../utilities/services'
import arrow from '../assets/arrow.svg'
import { useTranslation } from 'react-i18next'

export const TicketTypePicker = () => {
  const { parameters, setServerResponse, resetSomeState, setIsAppointment } = useServiceChooser()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleEnqueue = async () => {
    const result = await mainService.enqueue(parameters)
    await setServerResponse(result)

    resetSomeState()
    navigate('../view')
  }

  const handleCancel = () => {
    resetSomeState()
    navigate('/')
  }

  return(
    <div className='glass-container glass-container--grid-3-uneven'>

      <button 
        onClick={ () => navigate(-1) } 
        className="arrow arrow--left"
      >
        <img src={ arrow } className="arrow__icon"></img>
      </button> 
      
      <p className="text">{ t('chooseQueueType') }</p>

      <div className="picker" style={{ marginBottom: '2rem' }}>
        <div 
          style={ { backgroundColor: parameters.is_appointment === true ? '#70b7fa' : '' }}
          className="button button--long" 
          onClick={ () => setIsAppointment(true) }
        >
          { t('SignUpForASpecificTime') }
        </div>

        <div 
          style={ { backgroundColor: parameters.is_appointment === false ? '#70b7fa' : '' }}
          className="button button--long" onClick={ () => setIsAppointment(false) }
        >
          { t('takeTheNearestPlaceInLine') }
        </div>
      </div>

      <div className="horisontal-group horisontal-group--center">
        <div 
          className="button"
          // style={{ display: parameters.is_appointment === false ? 'block' : 'none' }} 
          onClick={ handleCancel }
        >
          { t('cancel') }
        </div>
        <div 
          className={`button button--blue ${ parameters.is_appointment === false ? '' : 'button--disabled' }`}
          onClick={ handleEnqueue }
        >
          { t('getATicket') }
        </div>
      </div>

      <button 
        style={{ display: parameters.is_appointment === true ? '' : 'none' }} 
        onClick={ () => navigate('../datetime') } 
        className="arrow arrow--right"
      >
        <img src={ arrow } className="arrow__icon"></img>
      </button> 
      
    </div>
  )
}