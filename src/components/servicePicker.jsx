import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import mainService from "../utilities/services"
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import arrow from '../assets/arrow.svg'

// This array was used for testing purposes. It's OK to delete it. -Bakai
// const queues = [
//   {
//     service: 'Deposits',
//     description: 'Matters relating to opening and servicing deposits',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
//   {
//     service: 'Credits',
//     description: 'Matters relating to opening and servicing credits',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
//   {
//     service: 'Money transfer',
//     description: 'Matters relating to international trasfer of money',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
//   {
//     service: 'Consultation',
//     description: 'Consultations on any matter',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
//   {
//     service: 'Payment cards',
//     description: 'Matters relating to opening and servicing payment cards',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
//   {
//     service: 'Deposits',
//     description: 'Matters relating to opening and servicing deposits',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
//   {
//     service: 'Credits',
//     description: 'Matters relating to opening and servicing credits',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
//   {
//     service: 'Money transfer',
//     description: 'Matters relating to international trasfer of money',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
//   {
//     service: 'Consultation',
//     description: 'Consultations on any matter',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
//   {
//     service: 'Payment cards',
//     description: 'Matters relating to opening and servicing payment cards',
//     documents: [
//       {
//         name: 'Passport',
//         required: true,
//       },
//       {
//         name: 'Application',
//         required: true,
//       },
//       {
//         name: 'Reference',
//         required: false,
//       }
//     ]
//   },
// ]

export const ServicePicker = () => {
  const { setService, setDocuments, parameters, documents } = useServiceChooser()
  const [services, setServices] = useState([])
  // const [currentImage, setCurrentImage] = useState([])
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  // Making the first argument of useEffect hook an async function resulted in 'destroy is not a function' error.
  // I used an immediately invoked function to circumvent this error. -Bakai
  useEffect(() => {
    (async () => {
      const result = await mainService.getServices(parameters.branch)
      setServices(result)
    })()   
  }, [])

  const handleServiceClick = (object) => {
    setService(object)
    setDocuments(object.documents)
    // navigate('../client')
  }

  let queues = Array.from(Array(18).keys())

  document.documentElement.style.setProperty("--rowNum", Math.floor(services.length ** (1 / 2)))
  document.documentElement.style.setProperty("--colNum", Math.ceil(services.length ** (1 / 2)))

  return (
    <div className='glass-container glass-container--grid-3'>

      <button 
        onClick={ () => navigate(-1) } 
        className="arrow arrow--left"
      >
        <img src={ arrow } className="arrow__icon"></img>
      </button> 

      <p className="text">Выберите услугу</p>
      <div className="picker">        

          <p className="picker__label">Шаг 3/5</p>
          <div className="services">
            { services.map((object, index) => { 
              let currentImage = `/src/assets/image${index}.png`

              return (
                <div 
                  style={{ backgroundColor: parameters.service === object.id ? '#70b7fa' : '' }} 
                  key={ index } 
                  className="button button--service" 
                  onClick={ () => handleServiceClick(object) }
                >
                  <p  className="text text--button" >{ (object.lang_name.find(option => option.lang === i18n.language) || {}).text || object.name } </p> 
                  {/* <img className="image-in-box" src={ currentImage } alt='illustration'/> */}
                </div >
              )
            })}
          </div>        
      </div>
       
      <button 
        style={{ display: parameters.service ? '' : 'none' }} 
        onClick={ () => navigate('../client') } 
        className="arrow arrow--right"
      >
        <img src={ arrow } className="arrow__icon"></img>
      </button>  

    </div>
  )
} 