import React from 'react'

import { useAppContext } from '../../context/appContext'

const ProjectBackdrop = () => {
  const {handleProject, isProjectEdit, handleProjectEdit} = useAppContext()

  const closeProjectHandler = () => {
    handleProject()
    if(isProjectEdit) {
      handleProjectEdit()
    }
  }


  return (
    <div onClick={closeProjectHandler} className='inset-0 fixed w-[100%] h-[100vh] bg-gray-600 opacity-95 cursor-pointer z-10'></div>   
    )
}

export default ProjectBackdrop