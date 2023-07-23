import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'


export const BranchSchedule = () => {
  const { parameters, allBranches } = useServiceChooser()
  const navigate = useNavigate()

  const currentBranch = allBranches.find(branch => branch.id === parameters.branch)
  // const startTime = new Date(currentBranch.work_time_start).toLocaleTimeString('ru', { hour: '2-digit', minute:'2-digit' })
  // const endTime = new Date(currentBranch.work_time_end).toLocaleTimeString('ru', { hour: '2-digit', minute:'2-digit' })

  const startTime = currentBranch.work_time_start.substring(0,5)
  const endTime = currentBranch.work_time_end.substring(0,5)

  return( 
    <div>
      <p>Адрес: { parameters.branchAddress }</p>
      <p>Понедельник { startTime } - { endTime }</p>
      <p>Вторник { startTime } - { endTime }</p>
      <p>Среда { startTime } - { endTime }</p>
      <p>Четверг { startTime } - { endTime }</p>
      <p>Пятница { startTime } - { endTime }</p>
      <p>Суббота { startTime } - { endTime }</p>
      <p>Воскресенье { startTime } - { endTime }</p>    

      
      <button onClick={ () => navigate('../service') }>Далее</button>  
    </div>
  )
}