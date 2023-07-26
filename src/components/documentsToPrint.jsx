import React from 'react'
import { useServiceChooser } from "../utilities/zustand"
import { useTranslation } from 'react-i18next';
import '../styles/print.css'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const documentsToPrint = React.forwardRef((props, ref) => {
  const { documents, parameters } = useServiceChooser()
  const { t, i18n } = useTranslation()

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', fontSize: '1.2rem', width: '45rem', margin: '1rem auto 0 auto', fontFamily: 'Inter' }}>
      <h2 style={{ textAlign: 'center', margin: '0 auto' }}>{ t('listOfDocuments') }</h2>
      <p style={{ margin: '1rem auto 0 auto', fontSize: '1.3rem' }}><b>"{ (parameters.serviceName.find(option => option.lang === i18n.language) || {}).text }"</b></p>
        
      <ul style={{ paddingLeft: '6rem', width: '40rem' }}>
        { documents.map((document, index) => { 
          return(
            <li key={ index }  style={{ textAlign: 'left' }}>
              <span>{ (document.lang_name.find(option => option.lang === i18n.language) || {}).text || document.name }</span> 
              <span>{ documents.length === index + 1 ? '' : ';' }</span>
              <span style={{ fontSize: '0.8rem' }}>{ document.required ? '*' : '' }</span>
            </li>
          )
        }) }
      </ul>
      <p style={{ paddingLeft: '30mm', margin: '0 auto 0 0' }}><i>{ t('requiredDocuments') }</i></p>
    </div>
  )
})

export default documentsToPrint

