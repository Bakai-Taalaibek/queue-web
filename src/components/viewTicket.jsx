import { useServiceChooser } from "../utilities/zustand"
import { useTranslation } from 'react-i18next'

export const ViewTicket = () => {
  const { serverResponse } = useServiceChooser()
  const { t } = useTranslation()

  let dateAndTime = new Date(serverResponse.registered_at)
  const time = dateAndTime.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
  const date = dateAndTime.toLocaleDateString('ru');

  return (
    <div className='talonGeneral' >
      <h2>Ваш номер: { serverResponse.token }</h2>
      <p>Услуга: <b>{ serverResponse.service_name }</b></p>
      <p>Дата: { date }</p>
      <p>Время: { time }</p>
      <p>Адрес: { serverResponse.branch.address }</p>
      <p>Позиция в очереди: { serverResponse.talons_in_queue + 1 }</p>
      <p>Осталось: { serverResponse.estimated_time_in_min } минут</p>

      <button>Удалить</button>
    </div>    
  )
}
