import mainService from '../utilities/services'
import { useEffect, useState, useRef } from 'react'
import remove from '../assets/remove.svg'
import { useTranslation } from 'react-i18next'

export const MyTickets = () => {
  const [myTickets, setMyTickets] = useState([])
  const containerRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    (async () => {
      setMyTickets(await mainService.getMyTickets()) 
    })()
  }, [])

  const handleRemove = async (id) => {
    await mainService.removeTicket(id)  
    setMyTickets(await mainService.getMyTickets()) 
  }

  const scrollContainer = containerRef.current
  scrollContainer?.addEventListener("wheel", (event) => {
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaY
  })

  return (
    <div ref={ containerRef } className='myTickets__container'>
      <div className='myTickets__container--another'>

        { myTickets.map((ticket, index) => {
          return(                     
            <div 
              className='myTickets__glass glass-container' 
              key={ index }
            >
              <p className="horisontal-group horisontal-group--center"><span className="text-bold">{ t('yourTicket') }: </span><span className="text text--big">{ ticket.token }</span></p>
              
              <div className="horisontal-group horisontal-group--90">
                <div>
                  <p className="text-bold">{ t('service') }: </p>
                  <p>{ ticket.service }</p>
                </div>

                <div>
                  <p className="text-bold">{ t('date') }: </p>
                  <p>{ new Date(ticket.registered_at).toLocaleDateString('ru') }</p>
                </div>

                <div>
                  <p className="text-bold">{ t('time') }: </p>
                  <p>{ new Date(ticket.registered_at).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }) }</p>
                </div>
              </div>

              <div style={{ margin: 'auto auto 1rem auto' }}>
                <p className="text-bold">{ t('address') }: </p>
                <p><span>{ ticket.branch.city }, </span><span>{ ticket.branch.address }</span></p>
                
              </div>

              { ticket.is_appointed ? 
                <p className=" myTickets__leftTextRow  text-margin-5">
                  <span className="text-bold">{ t('appointment') }: </span>
                  <span>{ new Date(ticket.appointment_date).toLocaleDateString('ru') }, { new Date(ticket.appointment_date).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }) }</span>
                </p> :
                <p className=" myTickets__leftTextRow  text-margin-5">
                  <span>{ t('positionInQueue') }: </span>
                  <span className="text-bold">{ ticket.position_in_queue }</span>
                </p> 
              }
              {/* <p className=" myTickets__leftTextRow  text-margin-5">
                <span>Осталось: </span>
                <span className="text-bold">{ ticket.estimated_time_in_min } минут</span>
              </p> */}

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
    </div> 
  )
}