import React from 'react'

import { useAppContext } from '../../context/appContext'

const TaskBackdrop = () => {
  
  const {handleTask, handleTaskEdit, isTaskEdit} = useAppContext()

  const closeTaskHandler = () => {
    handleTask()
    if(isTaskEdit) {
      handleTaskEdit()
    }
  }

  return (
    <div onClick={closeTaskHandler} className='inset-0 fixed w-[100%] h-[100vh] bg-gray-600 opacity-95 cursor-pointer z-10'></div>   
    )
}

export default TaskBackdrop