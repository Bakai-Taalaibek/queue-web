import React from 'react'
import { useServiceChooser } from "../utilities/zustand"
import '../styles/print.css'
import { useTranslation } from 'react-i18next';

const TalonToPrint = React.forwardRef((props, ref) => {
  const { serverResponse } = useServiceChooser()
  const { t } = useTranslation()

  let dateAndTime = new Date(serverResponse.registered_at)
  const time = dateAndTime.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
  const date = dateAndTime.toLocaleDateString('ru')

  return (
    <div className='talonGeneral' ref={ref}>
      <h2>{ t('ticket') }: { serverResponse.token }</h2>
      <p>{ t('timeOfRegistration') }: { time } { date }</p>
      <p>{ t('chosenQueue') }: <b>{ serverResponse.service_name }</b></p>
      <p>{ t('positionInQueue') }: { serverResponse.position_in_queue }</p>
      {/* <p>Расчетное время ожидания: { serverResponse.estimated_time_in_min } минут</p> */}
    </div>    
  )
})

TalonToPrint.displayName = 'TalonToPrint';
export default TalonToPrint