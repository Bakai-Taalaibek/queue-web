import { useServiceChooser } from "../utilities/zustand"
import { useTranslation } from 'react-i18next'

export const ViewTicket = () => {
  const { serverResponse } = useServiceChooser()
  const { t } = useTranslation()

  let dateAndTime = new Date(serverResponse.registered_at)
  const time = dateAndTime.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
  const date = dateAndTime.toLocaleDateString('ru');

  return (
    <div className="glass-container" style={{ textAlign: 'left' }}>

      <div className="picker">
        <p className="horisontal-group horisontal-group--center"><span className="text-bold">{ t('yourTicket') }: </span><span className="text text--big">{ serverResponse.token }</span></p>
        <div className="horisontal-group horisontal-group--90">
          <div>
            <p className="text-bold">{ t('service') }: </p>
            <p>{ serverResponse.service_name }</p>
          </div>

          <div>
            <p className="text-bold">{ t('date') }: </p>
            <p>{ date }</p>
          </div>

          <div>
            <p className="text-bold">{ t('time') }: </p>
            <p>{ time }</p>
          </div>

        </div>

        <div style={{ margin: 'auto auto 1rem auto' }}>
          <p className="text-bold">{ t('address') }: </p>
          <p><span>{ serverResponse.branch.city }, </span><span>{ serverResponse.branch.address }</span></p>
          
        </div>

        <p className="text-margin-5">
          <span>{ t('positionInQueue') }: </span>
          <span className="text-bold">{ serverResponse.position_in_queue }</span>
        </p>
        {/* <p className="text-margin-5">
          <span>Осталось: </span>
          <span className="text-bold">{ serverResponse.estimated_time_in_min } минут</span>
        </p> */}

      </div>

      {/* <button>Удалить</button> */}
    </div>    
  )
}
