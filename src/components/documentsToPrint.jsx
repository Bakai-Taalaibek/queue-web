import React from 'react'
import { useServiceChooser } from "../utilities/zustand"
import { useTranslation } from 'react-i18next';
import '../styles/print.css'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const documentsToPrint = React.forwardRef((props, ref) => {
  const { documents } = useServiceChooser()
  const { t, i18n } = useTranslation()

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem', width: '40rem', margin: '1rem', fontFamily: 'Inter' }}>
      <h2 style={{ textAlign: 'center' }}>{ t('listOfDocuments') }</h2>
      <ul style={{ paddingLeft: '10rem', width: '40rem' }}>
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
      <p style={{ paddingLeft: '30mm' }}><i>{ t('requiredDocuments') }</i></p>
    </div>
  )
})

// documentsToPrint.displayName = 'documentsToPrint';
export default documentsToPrint

// return (
//   <div className='general' ref={ref} style={{ fontSize: '5px' }}>
//     <h2 className='title' style={{ fontSize: '5px' }}>{ t('listOfDocuments') }</h2>
//     <ul className='list'>
//       { documents.map((document, index) => { 
//         return(
//           <li key={ index }  style={{ textAlign: 'left' }}>
//             <span>{ (document.lang_name.find(option => option.lang === i18n.language) || {}).text || document.name }</span> 
//             <span>{ documents.length === index + 1 ? '' : ';' }</span>
//             <span style={{ fontSize: '20px' }}>{ document.required ? '*' : '' }</span>
//           </li>
//         )
//       }) }
//     </ul>
//     <p className='note'><i>{ t('requiredDocuments') }</i></p>
//   </div>
// )


// return (
//   <div ref={ref} style={{ display: 'flex', flexDirection: 'column', fontSize: '20px', width: '550px', margin: '30px' }}>
//     <h2 style={{ textAlign: 'center' }}>{ t('listOfDocuments') }</h2>
//     <ul style={{ paddingLeft: '120px', width: '300px' }}>
//       { documents.map((document, index) => { 
//         return(
//           <li key={ index }  style={{ textAlign: 'left' }}>
//             <span>{ (document.lang_name.find(option => option.lang === i18n.language) || {}).text || document.name }</span> 
//             <span>{ documents.length === index + 1 ? '' : ';' }</span>
//             <span style={{ fontSize: '20px' }}>{ document.required ? '*' : '' }</span>
//           </li>
//         )
//       }) }
//     </ul>
//     <p style={{ paddingLeft: '80px' }}><i>{ t('requiredDocuments') }</i></p>
//   </div>
// )