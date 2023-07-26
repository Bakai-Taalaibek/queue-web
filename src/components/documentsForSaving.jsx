import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { useServiceChooser } from "../utilities/zustand"
import { useTranslation } from 'react-i18next';
import '../styles/print.css'


export const DocumentsForSaving = () => {
  const { documents, parameters } = useServiceChooser()
  const { t, i18n } = useTranslation()
  
  Font.register({ family: 'NotoSans', fonts: [
     { src: "src/assets/NotoSans-Regular.ttf" }, 
     { src: "src/assets/NotoSans-Italic.ttf", fontStyle: 'italic' },
     { src: "src/assets/NotoSans-Bold.ttf", fontStyle: 'bold' },
    ]});

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'NotoSans',
      flexDirection: 'column',
      padding: '40px 40px 30px 30px',
      display: 'flex',
      fontSize: '20px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '5px',
      fontStyle: 'bold',
    },
    medium: {
      textAlign: 'center',
      fontSize: '17px',
      marginTop: '0',
      marginBottom: '8px',
      fontStyle: 'bold',
    },
    section: {
      textAlign: 'left',
      fontSize: '16px',
      marginLeft: '45px',
      marginBottom: '8px',
    },
    bottom: {
      paddingLeft: '30mm',
      fontStyle: 'italic',
      fontSize: '16px',
      paddingTop: '10px',
    }
  })

  return(
    <Document>
      <Page size="A4" style={ styles.page }>
    
        <View style={ styles.header }>
          <Text>{ t('listOfDocuments') }</Text>
        </View>
        <View style={ styles.medium }>
          <Text>"{ (parameters.serviceName.find(option => option.lang === i18n.language) || {}).text }"</Text>
        </View>
    
        { documents.map((document, index) => { 
          return(
            <View key={ index }>
              <Text style={ styles.section }>
                &#8226;
                { (document.lang_name.find(option => option.lang === i18n.language) || {}).text || document.name }
                { documents.length === index + 1 ? '' : ';' }
                { document.required ? '*' : '' }
              </Text>

            </View>
          )
        }) }

        <View style={ styles.bottom }>
          <Text>{ t('requiredDocuments') }</Text>
        </View>
      </Page>
    </Document>
  ) 
  }