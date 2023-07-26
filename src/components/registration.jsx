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
    <div className='glass-container'>
      <div>
        <p className='text'>Создание нового аккаунта</p>

        <form onSubmit={ handleRegistration }>
          <div>
            <p className='text--small text--left '>Введите номер телефона &#9432;</p>
            <input  
                    className='input' 
                    type='text'
                    value={ phone }
                    name='phone'
                    onChange={({ target }) => setPhone(target.value)}
            />
          </div>

          <div>
            <p className='text--small text--left '>Введите пароль &#9432;</p>   
            <input  
                    className='input' 
                    type='password'
                    value={ password }
                    name='password'
                    onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <div>
            <p className='text--small text--left '>Введите тот же пароль снова &#9432;</p>   
            <input  
                    className='input' 
                    type='password'
                    value={ password_confirm }
                    name='password_confirm'
                    onChange={({ target }) => setPassword_confirm(target.value)}
            />
          </div>

          <div className='horisontal-group horisontal-group--margin-top-2'>
            <div className='button button--50' onClick={ () => navigate('../authorization')}>Уже есть акаунт</div>
            <div className='button button--blue button--50' type='submit'>Создать аккаунт</div>
          </div>
        </form>

      </div>

    </div>
  )
}
