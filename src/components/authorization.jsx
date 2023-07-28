import { useState } from 'react'
import { useServiceChooser } from "../utilities/zustand"
import mainService from '../utilities/services'
import { useNavigate } from 'react-router-dom'

export const Authorization = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const { setUser } = useServiceChooser()
  const navigate = useNavigate()

  const handleLogin = async () => {
    // event.preventDefault()
    try {
      const user = await mainService.login({
        phone, password,
      })
      console.log(user)
      setUser(user)
      setPhone('')
      setPassword('')
      mainService.setToken(user.access_token)
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
        <p className='text'>Добро пожаловать!</p>
        <p>Введите информацию, которую вы добавили при регистрации</p>

        <form onSubmit={ handleLogin }>
          <div>
            <p className='text--small text--left '>Введите номер телефона &#9432;</p>
            <input  
                    className='input' 
                    placeholder='Номер телефона'
                    type='text'
                    value={ phone }
                    name='phone'
                    onChange={({ target }) => setPhone(target.value)}/>
          </div>

          <div>
            <p className='text--small text--left '>Введите пароль &#9432;</p>          
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
              <label className="text text--smaller" htmlFor="remember">Запомнить меня</label>
              <div  style={{ visibility: remember ? '' : 'hidden' }} className="checkmark checkmark--auth"></div>
            </div>

            <p>Забыли пароль?</p>
          </div>

          <div className='horisontal-group horisontal-group--margin-top-1'>
            <div className='button button--50' onClick={ () => navigate('../registration')}>Создать аккаунт</div>
            <div className='button button--blue button--50' onClick={ handleLogin } type='submit'>Войти</div>
          </div>
          
        </form>


      </div>


    </div>
  )
}