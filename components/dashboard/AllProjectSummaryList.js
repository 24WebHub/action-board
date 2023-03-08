import {RiListCheck} from 'react-icons/ri'
import {RxCalendar} from 'react-icons/rx'
import {FaUserAlt} from 'react-icons/fa'
import { useAppContext } from '../../context/AppContext'

const AllProjectSummaryList = () => {

const {allProjects} = useAppContext()

const allRecentProjects = allProjects.filter(allProject => allProject.status !== 'Completed')



  return (
    <ul className='grid sm:grid-cols-2 lg:grid-cols-3 my-16 mx-4 gap-6 bg-inherit'> {
      allRecentProjects.map(allRecentProject => {

        const completedTasks = allRecentProject.tasks.length > 0 && allRecentProject.tasks.filter(task => task.status === 'Completed') 
 
        const completedTasklength = completedTasks.length || 0

       const progressWidth = completedTasklength !== 0 ? Math.floor((completedTasklength/allRecentProject.tasks.length)* 100) : 0
        
        return   <li key={allRecentProject._id} className='p-3 bg-white rounded-lg space-2-3 shadow'>
        <div className='flex justify-between'>
        <h3 className='leading-[120%] text-[16px] font-semibold text-gray-500'>{allRecentProject.title}</h3>
        <div className={`w-[2px] h-4 ${allRecentProject.tasks.length > 0 && completedTasklength === allRecentProject.tasks.length ? 'bg-green-400' : 'bg-orange-400'} `}></div>
        </div>
    
    <div className='flex justify-between text-gray-700'>
    <div className='w-1/2 flex items-center gap-2 text-cyan-500'><FaUserAlt />
    <p className='text-[13px]'>{allRecentProject.user.fullname}</p></div>

      <div className='flex flex-col my-1'>
      
        <div className='flex gap-2 items-center text-[14px]'><RiListCheck /><div className='text-green-400 font-semibold'>{allRecentProject.tasks.length === 0 ? 0 : <p>{completedTasks.length} / {allRecentProject.tasks.length}</p>}</div></div>

        <div className='flex gap-2 items-center text-[14px]'><RxCalendar /><p className='text-orange-300 font-semibold'>{allRecentProject.completionDate}</p></div>
      </div>
    </div>

    <div className='flex gap-8 items-center'>
    <div className='h-[8px]  w-full relative rounded border border-gray-300'>
  <div className={`h-[8px] bg-green-300 absolute rounded`} style={{width: `${progressWidth}%`}}></div>
      </div>

      <p className='text-[14px] text-gray-700'>{progressWidth}%</p>
    </div>

      <p className='text-[13px]'>{allRecentProject.status}</p>

    </li>
      })
    }
   
    </ul>
  )
}

export default AllProjectSummaryList