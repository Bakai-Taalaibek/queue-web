import { useState } from 'react'
import { useServiceChooser } from "../utilities/zustand"
import mainService from '../utilities/services'
import { useNavigate } from 'react-router-dom'

export const Authorization = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useServiceChooser()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await mainService.login({
        phone, password,
      })
      console.log(user)
      setUser(user)
      setPhone('')
      setPassword('')
      mainService.setToken(user.token)
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
    <div>
      <h2>Добро пожаловать!</h2>
      <p>Введите информацию, которую вы добавили при регистрации</p>


      <form onSubmit={ handleLogin }>
        <div>
          Введите номер телефона &#9432;
          <input  
                  type='text'
                  value={ phone }
                  name='phone'
                  onChange={({ target }) => setPhone(target.value)}/>
        </div>

        <div>
          Введите пароль &#9432;
          <input  
                  type='password'
                  value={ password }
                  name='Password'
                  onChange={({ target }) => setPassword(target.value)}/>
        </div>
        
        <p>Запомнить меня</p>
        <p>Забыли пароль?</p>

        <button type='submit'>Войти</button>
      </form>

      <button>Создать аккаунт</button>

    </div>
  )
}