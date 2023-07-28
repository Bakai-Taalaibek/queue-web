import mainService from '../utilities/services'
import { useEffect, useState } from 'react'
import remove from '../assets/remove.svg'

export const MyTickets = () => {
  const [myTickets, setMyTickets] = useState([])

  useEffect(() => {
    (async () => {
      setMyTickets(await mainService.getMyTickets()) 
    })()
  }, [])

  const handleRemove = async (id) => {
    await mainService.removeTicket(id)  
    setMyTickets(await mainService.getMyTickets()) 
  }

  return (
    <div className='myTickets__container'>
      { myTickets.map((ticket, index) => {
        return(                     
          <div className='myTickets__glass glass-container ' key={ index }>
              <p className="horisontal-group horisontal-group--center"><span className="text-bold">Ваш номер: </span><span className="text text--big">{ ticket.token }</span></p>
              
              <div className="horisontal-group horisontal-group--90">
                <div>
                  <p className="text-bold">Услуга: </p>
                  <p>{ ticket.service }</p>
                </div>

                <div>
                  <p className="text-bold">Дата: </p>
                  <p>{ new Date(ticket.registered_at).toLocaleDateString('ru') }</p>
                </div>

                <div>
                  <p className="text-bold">Время: </p>
                  <p>{ new Date(ticket.registered_at).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }) }</p>
                </div>

              </div>

              <div style={{ margin: 'auto auto 1rem auto' }}>
                <p className="text-bold">Адрес: </p>
                <p><span>{ ticket.branch.city }, </span><span>{ ticket.branch.address }</span></p>
                
              </div>

              <p className=" myTickets__leftTextRow  text-margin-5">
                <span>Позиция в очереди: </span>
                <span className="text-bold">{ ticket.talons_in_queue + 1 }</span>
              </p>
              <p className=" myTickets__leftTextRow  text-margin-5">
                <span>Осталось: </span>
                <span className="text-bold">{ ticket.estimated_time_in_min } минут</span>
              </p>

              <button 
                onClick={ () => handleRemove(ticket.id) } 
                className="remove__icon"
              >
                <img src={ remove } ></img>
              </button> 
          </div>   
        )
      })}
    </div> 
  )
}