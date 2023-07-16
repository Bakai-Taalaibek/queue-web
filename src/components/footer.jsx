import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className='footer'>
      <div>
        <p>{ t('helpline') }</p>
        <p>+996 (312) 35-55-55</p>
      </div>

      <div>
        <p>{ t('contactCenter') } 24/7:</p>
        <p>+996 (312/552/706/775) 911-111</p>
      </div>

      <div>
        <p>WhatsApp:</p>
        <p>+996 (706) 911-111</p>
      </div>
    </div>
  )
}