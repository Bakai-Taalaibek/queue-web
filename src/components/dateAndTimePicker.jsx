import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import ru from 'date-fns/locale/ru'
import { useServiceChooser } from "../utilities/zustand"
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

export const DateAndTimePicker = () => {
  const [appointmentDate, setAppointmentDate] = useState(null)
  const [appointmentTime, setAppointmentTime] = useState(dayjs().set('hour', 9).startOf('hour'))
  const { parameters, allBranches } = useServiceChooser()

  const addDays = (date, days) => {
    const initialDate = new Date(date)
    const finalDate = initialDate.setDate(initialDate.getDate() + days)
    return finalDate
  }

  const handleSubmit = () => {
    const year = appointmentDate.getFullYear()
    const month = appointmentDate.getMonth()
    const day = appointmentDate.getDate()
    const hour = appointmentTime.$d.getHours()
    const minute = appointmentTime.$d.getMinutes()
    const chosenTime = new Date(year, month, day, hour, minute)
    const chosenTimeISO = chosenTime.toISOString()
  }

  // To check if today the bank branch is still available for appointment, 
  // we compare current time to working hours
  const currentHour = new Date().getHours()
  const currentMinute = new Date().getMinutes()

  const scheduleDayStartTime = allBranches.find(branch => branch.id === parameters.branch).work_time_start
  const scheduleDayEndTime = allBranches.find(branch => branch.id === parameters.branch).work_time_end
  const scheduleHour = +scheduleDayEndTime.slice(0, 2)
  const scheduleMinute = +scheduleDayEndTime.slice(3, 5)

  let firstDay = new Date() 
  if (currentHour > scheduleHour) {
    firstDay = addDays(firstDay, 1)
  } else if (currentHour === scheduleHour && currentMinute > scheduleMinute) {
    firstDay = addDays(firstDay, 1)
  }

  const lastDay = addDays(firstDay, 6)
  const monthsToShow = new Date(lastDay).getMonth() - new Date(firstDay).getMonth() + 1


  const theme = createTheme({
    typography: {
      fontSize: 12,
      fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
    },
    palette: {
      primary: {
        main: 'rgb(66, 127, 232)',
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

  const startTime = dayjs().set('hour', +scheduleDayStartTime.slice(0, 2)).set('minute', +scheduleDayStartTime.slice(3, 5)).set('second', 0)
  const endTime = dayjs().set('hour', +scheduleDayEndTime.slice(0, 2)).set('minute', +scheduleDayStartTime.slice(3, 2)).set('second', 0)

  return(
    <div >
      <p>Выберите дату</p>
      
      <DatePicker 
        selected={ appointmentDate } 
        onChange={ (newDate) => setAppointmentDate(newDate) } 
        minDate={ firstDay }
        maxDate={ lastDay }      
        monthsShown={ monthsToShow }
        dateFormat="dd.MM.yyyy"
        calendarStartDay={ 1 }
        locale={ ru }
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [ monthsToShow === 2 ? -150 : -30, 0],
            },
          }
        ]}
      />
      <p>Выберите время</p>

      <ThemeProvider theme={ theme }>   
        <LocalizationProvider dateAdapter={ AdapterDayjs }>
          <TimePicker         
            value={ appointmentTime } 
            onChange={ (newTime) => setAppointmentTime(newTime) } 
            ampm={ false }
            minTime={ startTime }
            maxTime={ endTime }
            skipDisabled={ true }
            timeSteps={{ minutes: 1}}
            views={['hours', 'minutes']}
          />
        </LocalizationProvider>        
      </ThemeProvider>
      
      <button disabled={ appointmentDate ? false : true } onClick={ handleSubmit }>Далее</button>
        
    </div>
  )
}