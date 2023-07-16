import React from 'react'
import { useServiceChooser } from "../utilities/zustand"
import { useTranslation } from 'react-i18next';
import '../styles/print.css'

const documentsToPrint = React.forwardRef((props, ref) => {
  const { documents } = useServiceChooser()
  const { t, i18n } = useTranslation()

  return (
    <div className='general' ref={ref}>
      <h2 className='title'>{ t('listOfDocuments') }</h2>
      <ul className='list'>
        { documents.map((document, index) => { 
          return(
            <li key={ index }  style={{ textAlign: 'left' }}>
              <span>{ (document.lang_name.find(option => option.lang === i18n.language) || {}).text || document.name }</span> 
              <span>{ documents.length === index + 1 ? '' : ';' }</span>
              <span style={{ fontSize: '20px' }}>{ document.required ? '*' : '' }</span>
            </li>
          )
        }) }
      </ul>
      <p className='note'><i>{ t('requiredDocuments') }</i></p>
    </div>
  )
})

documentsToPrint.displayName = 'documentsToPrint';
export default documentsToPrint