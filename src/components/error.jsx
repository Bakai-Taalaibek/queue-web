import { useRouteError } from "react-router-dom";
import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next'

export const Error = () => {
  const error = useRouteError();
  const { t } = useTranslation()

  return(
    <div className='glass-container glass-container--grid-3'>
      <p className="text text--medium" >{ t('error') }:</p>
      <p className="text">{ error.statusText || error.message }</p>
    </div>
  )
}
