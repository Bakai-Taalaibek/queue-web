import { useServiceChooser } from "../utilities/zustand"
import { useNavigate } from 'react-router-dom'
import arrow from '../assets/arrow.svg'
import { useTranslation } from 'react-i18next'

export const BranchSchedule = () => {
  const { parameters, allBranches } = useServiceChooser()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const currentBranch = allBranches.find(branch => branch.id === parameters.branch)
  // const startTime = new Date(currentBranch.work_time_start).toLocaleTimeString('ru', { hour: '2-digit', minute:'2-digit' })
  // const endTime = new Date(currentBranch.work_time_end).toLocaleTimeString('ru', { hour: '2-digit', minute:'2-digit' })

  const startTime = currentBranch.work_time_start.substring(0,5)
  const endTime = currentBranch.work_time_end.substring(0,5)

  return( 
    <div className='glass-container glass-container--grid-2'>    
      <div className="picker">
        <button 
          onClick={ () => navigate(-1) } 
          className="arrow arrow--left"
        >
          <img src={ arrow } className="arrow__icon"></img>
        </button> 

        <p className="text">{ t('address') }: { parameters.branchAddress }</p>
        <div className="schedule">
          <div><span>{ t('monday') }</span> <span>{ startTime } - { endTime }</span></div>
          <div><span>{ t('tuesday') }</span> <span>{ startTime } - { endTime }</span></div>
          <div><span>{ t('wednesday') }</span> <span>{ startTime } - { endTime }</span></div>
          <div><span>{ t('thursday') }</span> <span>{ startTime } - { endTime }</span></div>
          <div><span>{ t('friday') }</span> <span>{ startTime } - { endTime }</span></div>
          <div><span>{ t('saturday') }</span> <span>{ startTime } - { endTime }</span></div>
          <div><span>{ t('sunday') }</span> <span>{ startTime } - { endTime }</span></div>
        </div>
  
        <button 
          onClick={ () => navigate('../service') } 
          className="arrow arrow--right"
        >
          <img src={ arrow } className="arrow__icon"></img>
        </button>  

      </div>  
    </div>
  )
}