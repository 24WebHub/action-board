import React from 'react'
import ReactDOM from 'react-dom'

import TaskBackdrop from '../layout/TaskBackdrop'
import NewTaskOverlay from './NewTaskOverlay'

const NewTaskModal = () => {
  return (
    <React.Fragment>
    {ReactDOM.createPortal(<TaskBackdrop />, document.getElementById('task-backdrop'))}
    {ReactDOM.createPortal(<NewTaskOverlay />, document.getElementById('new-task-overlay'))}
    </React.Fragment>
  )
}

export default NewTaskModal