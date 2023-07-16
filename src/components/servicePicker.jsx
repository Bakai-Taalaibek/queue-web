import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import '../styles/mainStyles.scss'
import mainService from "../utilities/services"
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

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
      const result = await mainService.getAll()
      setServices(result)
    })()   
  }, [])

  const handleServiceClick = (object) => {
    setService(object.id)
    setDocuments(object.documents)
    navigate('client')
  }

  return (
    <div className="service-menu-groups">
      { services.map((object, index) => { 
        let currentImage = `/src/assets/image${index}.png`
        // import(`../assets/image${index}.png`).then(image => {
        //   console.log(image.default)
        //   currentImage = image.default
        //   console.log(image.default, currentImage)
        // })
        // console.log(currentImage)

        return (
          <button key={ index } className="button button--bigger" onClick={ () => handleServiceClick(object) }>
            <p  className="text text--in-box" >{ (object.lang_name.find(option => option.lang === i18n.language) || {}).text || object.name }
            </p> 
            <img className="image-in-box" src={ currentImage } alt='illustration'/>
          </button >
        )
      })}
    </div>
  )
} 
// (object.lang_name.find(option => option.lang === i18n.language) || {}).text

// object.lang_name.reduce((accumulator, currentOption) => {
//   if (currentOption.lang === i18n.language) {
//     accumulator = currentOption.text
//   }
//   return accumulator
// }, '')