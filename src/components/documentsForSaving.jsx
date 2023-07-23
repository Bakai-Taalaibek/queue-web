import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { useServiceChooser } from "../utilities/zustand"
import { useTranslation } from 'react-i18next';
import '../styles/print.css'


export const DocumentsForSaving = () => {
  const { documents } = useServiceChooser()
  const { t, i18n } = useTranslation()
  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: '40px 40px 30px 30px',
      display: 'flex',
      fontSize: '20px'
    },
    header: {
      textAlign: 'center'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    bottom: {
      paddingLeft: '30mm'
    }
  })
  
  return(
    <Document>
      <Page size="A4" style={styles.page}>
  
        <View style={styles.header}>
          <Text>{ t('listOfDocuments') }</Text>
        </View>
  
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.bottom}>
          <Text>{ t('requiredDocuments') }</Text>
        </View>
      </Page>
    </Document>
  )
}





      // <ul style={{ paddingLeft: '10rem', width: '40rem' }}>
      //   { documents.map((document, index) => { 
      //     return(
      //       <li key={ index }  style={{ textAlign: 'left' }}>
      //         <span>{ (document.lang_name.find(option => option.lang === i18n.language) || {}).text || document.name }</span> 
      //         <span>{ documents.length === index + 1 ? '' : ';' }</span>
      //         <span style={{ fontSize: '0.8rem' }}>{ document.required ? '*' : '' }</span>
      //       </li>
      //     )
      //   }) }
      // </ul>