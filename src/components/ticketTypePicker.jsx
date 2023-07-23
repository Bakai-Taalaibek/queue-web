import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'

export const TicketTypePicker = () => {
  const { parameters, documents, resetParameters, setIsAppointment } = useServiceChooser()
  const navigate = useNavigate()

  return(
    <div>
      <h2>Вы хотите занять место в конце очереди или записать на определенное время?</h2>

      <button onClick={ () => setIsAppointment(false) }>Занять ближайшее место в очереди</button>
      <button onClick={ () => setIsAppointment(true) }>Записаться на определенное время</button>

      <button 
        style={{ display: parameters.is_appointment === false ? 'block' : 'none' }} 
        onClick={ () => navigate('../datetime') }
      >
        Получить талон
      </button>

      <button 
        style={{ display: parameters.is_appointment === true ? 'block' : 'none' }} 
        onClick={ () => navigate('../datetime') }
      >
        Далее
      </button>
    </div>
  )
}