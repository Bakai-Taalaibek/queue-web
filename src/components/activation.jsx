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
    <div   className='glass-container'>

      <div className='picker'>
        <p className='text'>Активация аккаунта</p>
        <p>На ваш номер направлен код активации. Введите его в поле.</p>

        <form onSubmit={ handleActivation }>
          <div>
            <p className='text--small text--left '>Введите код активации &#9432;</p>
            <input  
                    className='input' 
                    type='code'
                    value={ code }
                    name='code'
                    onChange={({ target }) => setCode(target.value)}/>
          </div>

          <div className='horisontal-group horisontal-group--margin-top-2'>
            <div className='button button--50' onClick={ () => navigate(-1)}>Назад</div>
            <div className='button button--blue button--50' type='submit'>Создать аккаунт</div>
          </div>
          
        </form>
      </div>

    </div>
  )
}