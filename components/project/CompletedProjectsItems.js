import { useEffect } from 'react'
import {RiListCheck} from 'react-icons/ri'
import {CiTimer} from 'react-icons/ci'
import { useAppContext } from '../../context/appContext'

const CompletedProjectsItems = () => {
const {myCompletedProjects, getMyCompletedProjects, isLoading} = useAppContext()

useEffect(() => {
  getMyCompletedProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [])

  return (
    <ul  className='grid gap-6 m-3'>
    
      {!isLoading && myCompletedProjects.length === 0 ? <p className='p-2 text-red-400 text-center'>Empty!!!</p>: !isLoading && myCompletedProjects.length > 0 && myCompletedProjects.map(completedProject => {

    return <li key={completedProject._id}>
    <div className='p-3 bg-white rounded space-y-3 shadow'>
    <div className='flex justify-between'>
    <h3 className='leading-[120%] text-[14px] font-semibold text-gray-500'>{completedProject.title}</h3>
    </div>

    
    <div className='flex justify-between'>

        <div className='flex gap-2 items-center text-[14px]'><RiListCheck /><p className='text-green-400 font-semibold'>{completedProject.tasks.length} / {completedProject.tasks.length}</p></div>

        <div className='flex gap-2 items-center text-[14px]'><CiTimer /><p className='text-orange-300 font-semibold'>{completedProject.completionDate}</p></div>

      </div>
    </div>
    </li> })}
    </ul>
  )
}

export default CompletedProjectsItems