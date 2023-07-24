import mainService from '../utilities/services'
import { useEffect, useState } from 'react'

export const MyTickets = () => {
  const [myTickets, setMyTickets] = useState([])

  useEffect(() => {
    (async () => {
      setMyTickets(await mainService.getMyTickets()) 
    })()
  }, [])

  return (
    <>
      { myTickets.map((ticket, index) => {
        return(
          <div className='talonGeneral' key={ index }>
            <h2>Ваш номер: { ticket.token }</h2>
            <p>Услуга: <b>{ ticket.service_name }</b></p>
            <p>Дата: { new Date(ticket.registered_at).toLocaleDateString('ru') }</p>
            <p>Время: { new Date(ticket.registered_at).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }) }</p>
            <p>Адрес: { ticket.branch.address }</p>
            <p>Позиция в очереди: { ticket.talons_in_queue + 1 }</p>
            <p>Осталось: { ticket.estimated_time_in_min } минут</p>
      
            <button>Удалить</button>
          </div>   
        )
      })}
    </> 
  )
}