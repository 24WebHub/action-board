import {RxCalendar} from 'react-icons/rx'
import { useAppContext } from '../../context/appContext'

const ToDoTasks = () => {
const {myTodoTasks, updateTaskStatus, getTaskDetails, handleTaskEdit, handleTask, deleteTask} = useAppContext()

const handleTaskUpdate = (e, id) => {
  const taskInfo = {
    taskId: id,
    status: 'In Progress'
  }
  updateTaskStatus(taskInfo)
}

const handleTaskDelete = (e, id) => {
  e.preventDefault()
  deleteTask(id, 'todo')
}


const taskEditHandler = (e, id, title, projectTitle, completionDate, status) => {
 const taskInfo = {
  id,
  title, 
  projectTitle, 
  completionDate,
  status
 }
  getTaskDetails(taskInfo)
  handleTaskEdit()
  setTimeout(() => {
    handleTask()
  })
}

  return (
    <ul className='space-y-4'>
    {myTodoTasks.length === 0 ? <p className='p-2 text-red-400 text-center'>Empty!!!</p> : myTodoTasks && myTodoTasks.map(task => 
        <div  key={task._id} className='mx-3 bg-white rounded py-2 shadow'>
    <div className='space-y-2'>
    <div className='leading-[110%] text-[14px] text-gray-500 px-2 font-semibold'>
      {task.title}
    </div>
    <p className='font-motserrat text-gary-500 leading-[100%] px-2 text-end italic text-[12px]'>{task.projectTitle}</p>
    <div className='h-[1px] w-full bg-gray-100'></div> 
    </div>   
      <div className='flex justify-between text-[13px] my-4 mx-2'>
         <div className='flex  gap-2 items-center'><RxCalendar /><p className='text-gray-400 font-semibold'>{task.completionDate}</p></div>
          <button onClick={e=>handleTaskUpdate(e, task._id)} className='mx-2 px-3 py-[px border rounded-sm border-gray-200 text-blue-900 font-regular'>move</button>
      </div>
      <div className='space-x-2 text-[12px]'>
        <button onClick={e => taskEditHandler(e, task._id, task.title, task.projectTitle, task.completionDate, task.status)} className='ml-2 px-3 bg-green-100 rounded-sm opacity-90 text-green-900 font-semibold'>Edit</button>
        <button onClick={e => handleTaskDelete(e, task._id)} className='ml-2 px-2 bg-red-100 rounded-sm opacity-90 text-red-900 font-semibold'>Delete</button>
      </div>

        
  
    </div>
  )}
   </ul>
  )
}

export default ToDoTasks