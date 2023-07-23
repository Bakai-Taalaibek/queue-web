import { useState } from 'react'
import { useServiceChooser } from "../utilities/zustand"
import mainService from '../utilities/services'
import { useNavigate } from 'react-router-dom'

export const Activation = () => {
  const [code, setCode] = useState('')
  const { phoneForActivation, resetPhoneForActivation } = useServiceChooser()
  const navigate = useNavigate()

  const handleActivation = async (event) => {
    event.preventDefault()

    try {
      await mainService.activate({
        phone: phoneForActivation, code
      })
      setCode('')
      resetPhoneForActivation()
      navigate('../authorization')      
    }
    catch (exeption) {
      console.log('Error while trying to activate')
    }   
  }

  return(
    <div>
      <h2>Активация аккаунта</h2>
      <p>На ваш номер направлен код активации. Введите его в поле.</p>

      <form onSubmit={ handleActivation }>
        <div>
          Введите код активации &#9432;
          <input  
                  type='code'
                  value={ code }
                  name='code'
                  onChange={({ target }) => setCode(target.value)}/>
        </div>
        
        <button type='button'>Назад</button>
        <button type='submit'>Создать аккаунт</button>
      </form>

    </div>
  )
}