import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mainService from '../utilities/services'
import { useServiceChooser } from "../utilities/zustand"

export const Registration = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirm, setPassword_confirm] = useState('')
  const navigate = useNavigate()
  const { setPhoneForActivation } = useServiceChooser()

  const handleRegistration = async (event) => {
    event.preventDefault()
    if (password !== password_confirm) {
      return alert('Пароли не совпадают')
    }
    setPhoneForActivation(phone)

    try {
      await mainService.register({
        phone, password, password_confirm
      })
      setPhone('')
      setPassword('')
      setPassword_confirm('')
      navigate('../activation')      
    }
    catch (exeption) {
      console.log('Error while trying to register')
    }    
  }

  return (
    <div >
      <h2>Создание нового аккаунта</h2>
      <form onSubmit={ handleRegistration }>
        <div>
          Введите номер телефона &#9432;
          <input  
                  type='text'
                  value={ phone }
                  name='phone'
                  onChange={({ target }) => setPhone(target.value)}
          />
        </div>

        <div>
          Введите пароль &#9432;
          <input  
                  type='password'
                  value={ password }
                  name='password'
                  onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <div>
          Введите тот же пароль снова &#9432;
          <input  
                  type='password'
                  value={ password_confirm }
                  name='password_confirm'
                  onChange={({ target }) => setPassword_confirm(target.value)}
          />
        </div>
        
        <button>Уже есть акаунт</button>
        <button type='submit'>Создать аккаунт</button>
      </form>
    </div>
  )
}
