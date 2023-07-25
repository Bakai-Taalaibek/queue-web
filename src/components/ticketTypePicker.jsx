import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import mainService from '../utilities/services'
import arrow from '../assets/arrow.svg'

export const TicketTypePicker = () => {
  const { parameters, setServerResponse, resetSomeState, setIsAppointment } = useServiceChooser()
  const navigate = useNavigate()

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
      
      <p className="text">Выберите тип очереди</p>

      <div className="picker" style={{ marginBottom: '2rem' }}>
        <div 
          style={ { backgroundColor: parameters.is_appointment === true ? '#70b7fa' : '' }}
          className="button button--long" 
          onClick={ () => setIsAppointment(true) }
        >
          Записаться на определенное время
        </div>

        <div 
          style={ { backgroundColor: parameters.is_appointment === false ? '#70b7fa' : '' }}
          className="button button--long" onClick={ () => setIsAppointment(false) }
        >
          Занять ближайшее место в очереди
        </div>
      </div>

      <div className="horisontal-group">
        <div 
          className="button"
          // style={{ display: parameters.is_appointment === false ? 'block' : 'none' }} 
          onClick={ handleCancel }
        >
          Отменить
        </div>
        <div 
          className={`button button--blue ${ parameters.is_appointment === false ? '' : 'button--disabled' }`}
          onClick={ handleEnqueue }
        >
          Получить талон
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