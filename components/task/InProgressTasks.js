
import {RxCalendar} from 'react-icons/rx'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

const InProgressTasks = () => {
const {myInprogressTasks, getMyInprogressTasks, deleteTask, updateTaskStatus, isLoading} = useAppContext()


useEffect(() => {
  getMyInprogressTasks()
  // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [])

const handleTaskUpdate = (e, id) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  const taskInfo = {
    taskId: id,
    status: 'Completed'
  }
  updateTaskStatus(taskInfo)
}

const handleTaskDelete = (e, id) => {
  e.preventDefault()
  deleteTask(id, 'inprogress')
}

// const dragStarted = (e, id) => {
//   console.log('drag started' + id)
//   e.dataTransfer.setData('taskId', id)
// }

const  formatDate = ((date = new Date()) =>{
  const year = date.toLocaleString('default', {year: 'numeric'});
  const month = date.toLocaleString('default', {month: '2-digit'});
  const day = date.toLocaleString('default', {day: '2-digit'});

  return [year, month, day].join('-');
})


const today = formatDate()

// isLoading ? <PulseLoader color="#12A1E9" /> : showAlert ? <Alert /> 

  return (
<ul className='space-y-4'>
    {!isLoading && myInprogressTasks.length === 0 ? <p className='p-2 text-red-400 text-center'>Empty!!!</p> : !isLoading & myInprogressTasks.length > 0 && myInprogressTasks.map(task => 
        <div  key={task._id} className='mx-3 bg-white rounded py-2 shadow'>
    <div className='space-y-2'>
    <div className='leading-[110%] text-[14px] text-gray-500 px-2 font-semibold'>
      {task.title}
    </div>
    <p className='font-motserrat text-gary-500 leading-[100%] text-end italic px-2 text-[12px]'>{task.project}</p>
    <div className='h-[1px] w-full bg-gray-100'></div> 
    </div>   
      <div className='flex justify-between text-[13px] my-4 mx-2'>
         <div className='flex  gap-2 items-center'><RxCalendar /><p className={today  > task.completionDate ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'}>{task.completionDate}</p></div>
          <button onClick={e=>handleTaskUpdate(e, task._id)} className='mx-2 px-3 py-[px border rounded-sm border-gray-200 text-blue-900 font-regular'>move</button>
      </div>
      <div className='space-x-2 text-[12px]'>
        <button className='ml-2 px-3 bg-green-100 rounded-sm opacity-90 text-green-900 font-semibold'>Edit</button>
        <button onClick={e=>handleTaskDelete(e, task._id)} className='ml-2 px-2 bg-red-100 rounded-sm opacity-90 text-red-900 font-semibold'>Delete</button>
      </div>

        
  
    </div>
  )}
   </ul>
  )
}

export default InProgressTasks