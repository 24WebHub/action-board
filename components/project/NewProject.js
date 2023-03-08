import React from 'react'
import ReactDOM from 'react-dom'

import ProjectBackdrop from '../layout/ProjectBackdrop'
import NewProjectOverlay from './NewProjectOverlay'

const NewProjectModal = () => {
  return (
    <React.Fragment>
    {ReactDOM.createPortal(<ProjectBackdrop />, document.getElementById('project-backdrop'))}
    {ReactDOM.createPortal(<NewProjectOverlay />, document.getElementById('new-project-overlay'))}
    </React.Fragment>
  )
}

export default NewProjectModal