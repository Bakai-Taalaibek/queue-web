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
import print from '../assets/print.svg'
import download from '../assets/download.svg'


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

  const DocumentsForSaving = () => (
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

  return (
    <div className='glass-container '>

      <button 
        onClick={ () => navigate(-1) } 
        className="arrow arrow--left"
      >
        <img src={ arrow } className="arrow__icon"></img>
      </button> 

      <div className='picker'>
        <p className="text ">{ t('listOfDocuments') } </p>
        <p className='text text--medium'>"{ (parameters.serviceName.find(option => option.lang === i18n.language) || {}).text }"</p>
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
        <p className="text text--smaller" style={{ marginBottom: '2rem'}}><i>{ t('requiredDocuments') }</i></p>


        <div className='icon icon--print' onClick={ handlePrintDocuments }>
          <img  src={ print } ></img>          
        </div>

        <PDFDownloadLink document={<DocumentsForSaving />} fileName="documents.pdf">
          <img className='icon' src={ download } ></img>    
        </PDFDownloadLink>

        <button 
          onClick={ () => navigate('../ticket') } 
          className="arrow arrow--right"
        >
          <img src={ arrow } className="arrow__icon"></img>
        </button> 

      </div>

      <div style={{ display: 'none' }} >
        <TalonToPrint  ref={ talonPrintRef }/> 
        <DocumentsToPrint ref={ documentsPrintRef } />
      </div>
    </div>
  )
}