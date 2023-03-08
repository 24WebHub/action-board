import React, {useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {MdAddTask} from 'react-icons/md'
import {PulseLoader} from 'react-spinners'

import { useAppContext } from '../../context/AppContext'
import FormInput from '../../ui/forms/FormInput'
import Alert from '../../ui/Alert'


const NewTaskOverlay = () => {
  const {handleTask, editTask, handleTaskEdit, createTask, showModalAlert, isModalLoading, taskDetails, isTaskEdit, myRecentProjects, activeProjectTitle} = useAppContext()
  
  
  const editInitTitle = taskDetails.projectTitle

  const nonEditInitTitle = activeProjectTitle && activeProjectTitle.trim().length !== '' ?activeProjectTitle : myRecentProjects.length > 0 ? myRecentProjects[0].title : ''

  const initTitle = isTaskEdit ? editInitTitle : nonEditInitTitle

  const [title, setTitle] = useState(isTaskEdit ? taskDetails.title : '' ) 
  const [project, setProject] = useState(initTitle)
  const [completionDate, setCompletionDate] = useState(isTaskEdit ? taskDetails.completionDate : '')
  
  
  const submitFormHandler = (e) => {
    e.preventDefault();
  if(isTaskEdit) {
    const editedTask = {
      title,
      completionDate,
    }
  editTask(taskDetails.id, editedTask, taskDetails.status)
   handleTaskEdit()

  }else {
    const newTask = {
      title,
      completionDate,
      project,
      status: 'To Do'
    }
    createTask(newTask)
  }
  
  }

  const closeProjectEditHandler = () => {
    handleTask()
    if(isTaskEdit) {
      handleTaskEdit()
    }
  }

  const projectOptions =myRecentProjects.map(myRecentProject => <option value={myRecentProject.title} key={myRecentProject.title}>{myRecentProject.title}</option>)

  return (
    <div className='absolute top-[15vh] left-[25%] w-[50%]  rounded shadow-lg  text-gray-600  bg-white text-center z-20 overflow-hidden'>
     <div className='px-10 py-2'>
      <div onClick={closeProjectEditHandler} className='flex justify-end text-gray-400 p-2 cursor-pointer'><AiOutlineClose className='w-7 h-7 hover:rotate-[90deg] duration-150'/></div>
      
      <div className='mb-2'>
        <div className='flex justify-center mb-2'>
        <MdAddTask className='w-12 h-12 text-[#3C83ED]' />
        </div>
        <h2>{isTaskEdit ? 'Update Task' : 'Create New Task'}</h2>
        </div>
        </div>
        
        <div className='py-4 px-12 bg-slate-200 border-t'>
          <form onSubmit={submitFormHandler} className=''>
          <FormInput id='task-title' type='text' label='Task Title' placeholder='Enter task title' value={title} onChange={e => setTitle(e.target.value)} />

          <FormInput id='task-date' type='date' label='Expected Completion Date' placeholder='Enter task title' value={completionDate} onChange={e => setCompletionDate(e.target.value)} />

          {isTaskEdit ? <FormInput id='project-title' type='text' label='Project' value={project} onChange={e => setCompletionDate(e.target.value)} /> 
          : <div className='mb-2 w-full text-left'>
            <label htmlFor="project-title" className='py-2 w-full text-[14px] font-semibold capitalize'>Project</label>
            <select id='project-title' value={project} onChange={e => setProject(e.target.value)} className='py-1 mb-2 rounded px-2 outline-none text-lg text-gray-400 w-full'>
            {projectOptions}
            </select>
          </div>}



          {isModalLoading && <PulseLoader color="#12A1E9"/>}
          {showModalAlert && <Alert />}

          <div className='bg-[#3C83ED] rounded text-white py-2 mt-4 mb-2'>
          <button type='submit' className='w-full'>{isTaskEdit ? 'Update Task' : 'Create task'}</button>
          </div>

          </form>
          
        </div>
    </div>
  )
}

export default NewTaskOverlay