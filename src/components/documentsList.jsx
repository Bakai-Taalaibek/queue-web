import { useNavigate } from 'react-router-dom'
import { useServiceChooser } from "../utilities/zustand"
import mainService from '../utilities/services'
import '../styles/mainStyles.scss'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import arrow from '../assets/arrow.svg'
import { useReactToPrint } from "react-to-print";
import TalonToPrint from './talonToPrint'
import DocumentsToPrint from './documentsToPrint'

export const DocumentsList = () => {
  const { parameters, documents, resetParameters, setServerResponse } = useServiceChooser()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const talonPrintRef = useRef()
  const documentsPrintRef = useRef()

  const printTalons = useReactToPrint({ content: () => talonPrintRef.current, pageStyle: "@page { size: 80mm 120mm }" })
  const printDocuments = useReactToPrint({ content: () => documentsPrintRef.current, pageStyle: "@page { size: 210mm 297mm }" })

  const handlePrintDocuments = () => {
    // mainService.printDocuments(parameters.service)
    printDocuments()
  }


  const handleCancel = () => {
    resetParameters()
    navigate('/')
  }


  const handleEnqueue = async () => {
    const result = await mainService.chosen(parameters)
    await setServerResponse(result)

    printTalons()

    resetParameters()
    navigate('/')
  }

  return (
    <>
      <button className='icon-background icon-background--arrow'>
        <img src={ arrow } onClick={ () => navigate(-1) } className='icon-button icon-button--arrow'></img>
      </button>

      <p className="text">{ t('listOfDocuments') }</p>
      <ul className='document-items'>
        { documents.map((document, index) => { 
          return(
            <li key={ index } className='text text--smaller' style={{ textAlign: 'left' }}>
              <span>{ (document.lang_name.find(option => option.lang === i18n.language) || {}).text || document.name }</span> 
              <span>{ documents.length === index + 1 ? '' : ';' }</span>
              <span style={{ fontSize: '20px' }}>{ document.required ? '*' : '' }</span>
            </li>
          )
        }) }
      </ul>
      <p className="text text--smaller-17"><i>{ t('requiredDocuments') }</i></p>


      <div className='horisontal-group'>
        <button className='button' onClick={ handlePrintDocuments }>{ t('print') }</button>
        <button className='button' onClick={ handleCancel }>{ t('cancel') }</button>
        <button className='button' onClick={ handleEnqueue }>{ t('getATicket') }</button>
      </div>

      <div style={{ display: 'none' }} >
        <TalonToPrint  ref={ talonPrintRef }/> 
        <DocumentsToPrint ref={ documentsPrintRef } />
      </div>
    </>
  )
}