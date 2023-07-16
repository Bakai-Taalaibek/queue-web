import { useState } from 'react'
import mainService from '../utilities/services'
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import { useTranslation } from 'react-i18next';

export const PincodeEntryPage = () => {
  // const [ pin0, setPin0 ] = useState('')
  // const [ pin1, setPin1 ] = useState('')
  // const [ pin2, setPin2 ] = useState('')
  // const [ pin3, setPin3 ] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handlePincode = async (event) => {
    event.preventDefault()

    let pin = ''
    for (let i = 0; i < 4; i++) {
      pin = pin + document.querySelector(`input[name=pin${i}]`).value
    }

    try {
      const serverResponse = await mainService.login({
        pin, pc_name: 'terminal_default'
      })

      mainService.setToken(serverResponse.token)
      window.localStorage.setItem(
        'loggedTerminal', JSON.stringify(serverResponse)
      )

      // setPin0('')
      // setPin1('')
      // setPin2('')
      // setPin3('')
      navigate('/')
    }
    catch (exeption) {
      console.log('Error while trying to log in')
    }
  }

  const handleInput = (event) => {
    const id = event.target.id
    // const value = event.target.value
    const currentFieldValue = event.target.value

    // const currentFieldValue = document.querySelector(`input[name=pin${id}]`).value

    let nextField = null
    if ((id === '0' && currentFieldValue === '') || (id === '3' && currentFieldValue !== '')) {
      nextField = document.querySelector(`input[name=pin${id}]`)

    } else if (currentFieldValue === '') {
      nextField = document.querySelector(`input[name=pin${+id - 1}]`)
      
    } else {
      nextField = document.querySelector(`input[name=pin${+id + 1}]`)
    }
    nextField.focus()
  }

  return (
    <>
      <form className='centered-form' onSubmit={ handlePincode }>
        <p className='text'>{ t('terminalIsBlocked') }</p>
        <p className='text text--smaller'>{ t('enterYourPin') }</p>
        <div style={ { marginBottom: '80px', marginTop: '20px' } }>
          <input 
            key='0'
            id='0'
            className='single-character-input'
            type='password'
            name='pin0'
            maxlength="1"
            onKeyUp={ handleInput }
          />
          <input 
            key='1'
            id='1'
            className='single-character-input'
            type='password'
            name='pin1'
            maxlength="1"
            onKeyUp={ handleInput }
          />
          <input 
            key='2'
            id='2'
            className='single-character-input'
            type='password'
            name='pin2'
            maxlength="1"
            onKeyUp={ handleInput }
          />
          <input 
            key='3'
            id='3'
            className='single-character-input'
            type='password'
            name='pin3'
            maxlength="1"
            onKeyUp={ handleInput }
          />
        </div>
        <button className='button' type='submit'>{ t('confirm') }</button>
      </form>
    </>
  )
}