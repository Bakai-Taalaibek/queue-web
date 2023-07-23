import React from 'react'
import { useServiceChooser } from "../utilities/zustand"
import '../styles/print.css'
import { useTranslation } from 'react-i18next';

const TalonToPrint = React.forwardRef((props, ref) => {
  const { serverResponse } = useServiceChooser()
  const { t } = useTranslation()

  let dateAndTime = new Date(serverResponse.registered_at)
  const time = dateAndTime.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
  const date = dateAndTime.toLocaleDateString('ru');

  return (
    <div className='talonGeneral' ref={ref}>
      <h2>Талон: { serverResponse.token }</h2>
      <p>Время регистрации: { time } { date }</p>
      <p>Выбранная очередь: <b>{ serverResponse.service_name }</b></p>
      <p>Позиция в очереди: { serverResponse.talons_in_queue + 1 }</p>
      <p>Расчетное время ожидания: { serverResponse.estimated_time_in_min } минут</p>
    </div>    
    // <div className='talonGeneral' ref={ref}>
    //   <h2>{ t('talon') }: { serverResponse.token }</h2>
    //   <p>{ t('timeOfRegistration') }: { time } { date }</p>
    //   <p>{ t('chosenQueue') }: <b>{ serverResponse.service_name }</b></p>
    //   <p>{ t('positionInQueue') }: { serverResponse.talons_in_queue + 1 }</p>
    //   <p>{ t('forecastedWaitingTime') }: { serverResponse.estimated_time_in_min } { t('minutes') }</p>
    // </div>
  )
})

TalonToPrint.displayName = 'TalonToPrint';
export default TalonToPrint