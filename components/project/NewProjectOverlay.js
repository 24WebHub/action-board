import React, {useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {FaProjectDiagram} from 'react-icons/fa'
import {MdOutlineEditNote} from 'react-icons/md'
import {PulseLoader} from 'react-spinners'

import { useAppContext } from '../../context/appContext'
import FormInput from '../../ui/forms/FormInput'
import Alert from '../../ui/Alert'

const NewProjectOverlay = () => {
  const {handleProject, editProject, handleProjectEdit, createProject, showModalAlert, isModalLoading, projectDetails, isProjectEdit} = useAppContext()  

  const [title, setTitle] = useState(isProjectEdit ? projectDetails.title : '')
  const [description, setDescription] = useState(isProjectEdit ? projectDetails.description : '')
  const [completionDate, setCompletionDate] = useState(isProjectEdit ? projectDetails.completionDate : '')
  
  
  const submitFormHandler = (e) => {
    e.preventDefault();


  if(isProjectEdit) {
  const editedProject = {
    title,
    description,
    completionDate,
  }
   editProject(projectDetails._id, editedProject)
   handleProjectEdit()
  }else {
    const newProject = {
      title,
      description,
      completionDate,
      status: isProjectEdit ? projectDetails.status : 'Not Started'
    }

    createProject(newProject)
  }
  
  }

function closeProjectEditHandler() {
    handleProject()
    if(isProjectEdit) {
      handleProjectEdit()
    }
  }

  return (
    <div className='absolute top-[15vh] left-[10%] w-[80%] md:left-[25%] md:w-[50%]  rounded shadow-lg  text-gray-600  bg-white text-center z-20 overflow-hidden'>
     <div className='px-5 md:px-10 py-2'>
      <div onClick={closeProjectEditHandler} className='flex justify-end text-gray-400 p-2 cursor-pointer'><AiOutlineClose className='w-7 h-7 hover:rotate-[90deg] duration-150'/></div>
      
      <div className='mb-2'>
        <div className='flex justify-center mb-2'>
        {isProjectEdit? <MdOutlineEditNote className='w-12 h-12 text-[#3C83ED]' /> :
        <FaProjectDiagram className='w-12 h-12 text-[#3C83ED]' />}
        </div>
        <h2>{isProjectEdit ? 'Update Project' : 'Create New Project'}</h2>
        </div>
        </div>
        
        <div className='py-4 px-6 md:px-12 bg-slate-200 border-t'>
          <form onSubmit={submitFormHandler}>
          <FormInput id='project-title' type='text' label='Project Title' placeholder='Enter project title' value={title} onChange={e => setTitle(e.target.value)} />
          <FormInput id='project-date' type='date' label='Expected Completion Date' placeholder='Enter project title' value={completionDate} onChange={e => setCompletionDate(e.target.value)} />

          <div className='mb-2 border-b-2  border-b-white w-full text-left'>
            <label htmlFor="project-description" className='py-2 w-full text-[14px] font-semibold capitalize'>Project Description</label>
            <textarea rows={2} required id='project-description' value={description} onChange={e => setDescription(e.target.value)}  className='py-1 mb-2 rounded px-2 outline-none text-lg text-gray-400 w-full'/>
          </div>

          {isModalLoading && <PulseLoader color="#12A1E9"/>}
         {showModalAlert && <Alert />}
          <div className='bg-[#3C83ED] rounded text-white py-2 mt-4 mb-2'>
          <button type='submit' className='w-full'>{isProjectEdit ? 'Update project' :'Create project'}</button>
          </div>

          </form>
          
        </div>
    </div>
  )
}

export default NewProjectOverlay