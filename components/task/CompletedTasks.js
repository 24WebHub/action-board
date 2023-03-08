
import {RxCalendar} from 'react-icons/rx'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

const CompletedTasks = () => {
const {myCompletedTasks, getMyCompletedTasks} = useAppContext()


useEffect(() => {
  getMyCompletedTasks()
  // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [])

  return (
<ul className='space-y-3'>
    {myCompletedTasks.length === 0 ? <p className='p-2 text-red-400 text-center'>Empty!!!</p>: myCompletedTasks.map(task => 
        <div  key={task._id} className='mx-3 bg-white rounded py-2 shadow'>
    <div className='space-y-2'>
    <div className='leading-[110%] text-[14px] text-gray-500 px-2 font-semibold'>
      {task.title}
    </div>
    <p className='font-motserrat text-gary-500 leading-[100%] px-2 italic text-[12px]'>{task.projectTitle}</p>
    <div className='h-[1px] w-full bg-gray-100'></div> 
    </div>   
         <div className='flex px-2 gap-2 text-[13px] justify-end items-center'><RxCalendar /><p className='text-gray-600 font-semibold'>{task.completionDate}</p></div>
             
  
    </div>
  )}
   </ul>
  )
}

export default CompletedTasks