import { useNavigate } from 'react-router-dom'
import { useServiceChooser } from "../utilities/zustand"
import mainService from '../utilities/services'
import '../styles/mainStyles.scss'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import arrow from '../assets/arrow.svg'
import { useReactToPrint } from "react-to-print"
import TalonToPrint from './ticketToPrint'
import DocumentsToPrint from './documentsToPrint'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas';
// import { DocumentsForSaving } from './documentsForSaving'
import ReactPDF from '@react-pdf/renderer';
import * as ReactDOM from 'react-dom';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'
import Inter from '../assets/Inter-Medium.ttf'


export const DocumentsList = () => {
  const { parameters, documents, resetParameters, setServerResponse } = useServiceChooser()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const talonPrintRef = useRef()
  const documentsPrintRef = useRef()

  const printTalons = useReactToPrint({ content: () => talonPrintRef.current, pageStyle: "@page { size: 80mm 120mm }" })
  const printDocuments = useReactToPrint({ content: () => documentsPrintRef.current, pageStyle: "@page { size: 210mm 297mm }" })

  const handlePrintDocuments = () => {
    printDocuments()
  }

  // const handleEnqueue = async () => {
  //   const result = await mainService.chosen(parameters)
  //   await setServerResponse(result)

  //   printTalons()

  //   resetParameters()
  //   navigate('/')
  // }

  // const handleDownload = async (domElement) => {
  //   // const elementForSaving = await document.querySelector("#documentsPrintRef")
  //   const documentsAsPDF = new JsPDF('portrait','pt', 'a4')
  //   const canvas = await html2canvas(domElement, { scale: 1, onclone: (document) => {
  //     document.querySelector().style.color = 'black'
  //   }})  
  //   const divImage = canvas.toDataURL("image/png")

  //   documentsAsPDF.addImage(divImage, 'PNG', 0, 0);
  //   documentsAsPDF.save("documents.pdf");
  //   // html2canvas(elementForSaving).then(function (canvas) {
  //   //   const divImage = canvas.toDataURL("image/png")
  //   //   console.log('1')
  //   //   documentsAsPDF.addImage(divImage, 'PNG', 0, 0);
  //   //   console.log('2')
  //   //   documentsAsPDF.save("documents.pdf");
  //   // })

  //   // const myFont = 'src/assets/Inter-Medium.ttf'

  //   // // add the font to jsPDF
  //   // documentsAsPDF.addFileToVFS("MyFont.ttf", myFont);
  //   // documentsAsPDF.addFont("MyFont.ttf", "MyFont", "normal");
  //   // documentsAsPDF.setFont("MyFont");
  //   // documentsAsPDF.html(htmlForPrinting).then(() => {
  //   //   documentsAsPDF.save('documents.pdf')
  //   // })


  //   // ReactDOM.render(<DocumentsForSaving />, 'example.pdf');
  // }
  Font.register({ family: 'Roboto', fonts: [
    { src: "src/assets/Roboto-Regular.ttf" }, // font-style: normal, font-weight: normal
    { src: "src/assets/Roboto-Italic.ttf", fontStyle: 'italic' },
    { src: "src/assets/Roboto-Bold.ttf", fontStyle: 'bold' },
   ]});
  Font.register({ family: 'NotoSans', fonts: [
     { src: "src/assets/NotoSans-Regular.ttf" }, // font-style: normal, font-weight: normal
     { src: "src/assets/NotoSans-Italic.ttf", fontStyle: 'italic' },
     { src: "src/assets/NotoSans-Bold.ttf", fontStyle: 'bold' },
    ]});
  Font.register({ family: 'Inter', src: "src/assets/Inter-Medium.ttf" })

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
      marginBottom: '10px',
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

  const DocumentsForSaving = () => (
    <Document>
      <Page size="A4" style={ styles.page }>
    
        <View style={ styles.header }>
          <Text>{ t('listOfDocuments') }</Text>
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
        <PDFDownloadLink document={<DocumentsForSaving />} style={{ textDecoration: 'none' }} fileName="documents.pdf" className='button'>
          {({ blob, url, loading, error }) =>
            loading ? 'Минуточку...' : 'Сохранить'
          }
        </PDFDownloadLink>

        <button className='button' onClick={ handlePrintDocuments }>{ t('print') }</button>
        <button onClick={ () => navigate('../ticket') }>Далее</button>  
      </div>

      <div style={{ display: 'none' }} >
        <TalonToPrint  ref={ talonPrintRef }/> 
        <DocumentsToPrint ref={ documentsPrintRef } />
      </div>
    </>
  )
}