import { useState } from 'react'
import { useServiceChooser } from "../utilities/zustand"
import mainService from '../utilities/services'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Authorization = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const { setUser } = useServiceChooser()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogin = async () => {
    // event.preventDefault()
    try {
      const user = await mainService.login({
        phone, password,
      })
      setUser(user)
      setPhone('')
      setPassword('')
      mainService.setRefreshToken(user.refresh_token)
      window.localStorage.setItem(
        'loggedQueueWebUser', JSON.stringify(user)
      )
      navigate('/')
    }
    catch (exeption) {
      console.log('Error while trying to log in')
    }
  }

  return(
    <div  className='glass-container'>

      <div className='picker'>
        <p className='text'>{ t('welcome') }</p>
        <p>{ t('enterInformationYouAdded') }</p>

        <form onSubmit={ handleLogin }>
          <div>
            <p className='text--small text--left '>{ t('enterTelephoneNumber') } &#9432;</p>
            <input  
                    className='input' 
                    placeholder='Номер телефона'
                    type='text'
                    value={ phone }
                    name='phone'
                    onChange={({ target }) => setPhone(target.value)}/>
          </div>

          <div>
            <p className='text--small text--left '>{ t('enterPassword') } &#9432;</p>          
            <input 
                    className='input' 
                    placeholder='Пароль'
                    type='password'
                    value={ password }
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}/>
          </div>
          
          <div className='horisontal-group'>

            <div className="checkbox-container checkbox--left"  >
              <input onClick={ () => setRemember(!remember) } type="checkbox" id="remember" name="remember" />
              <label className="text text--smaller" htmlFor="remember">{ t('rememberMe') }</label>
              <div  style={{ visibility: remember ? '' : 'hidden' }} className="checkmark checkmark--auth"></div>
            </div>

            <p>{ t('forgotYourPassword') }</p>
          </div>

          <div className='horisontal-group horisontal-group--margin-top-1'>
            <div className='button button--50' onClick={ () => navigate('../registration')}>{ t('createAnAccount') }</div>
            <div className='button button--blue button--50' onClick={ handleLogin } type='submit'>{ t('enter') }</div>
          </div>
          
        </form>

      </div>

    </div>
  )
}