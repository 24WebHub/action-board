import React from 'react'
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'
import Sidebar from './Sidebar'
import NewProjectModal from '../project/NewProject'
import NewTaskModal from '../task/NewTask'
import Alert from '../../ui/Alert'
import { useAppContext } from '../../context/AppContext'

const Layout = (props) => {
  const {isNewProject, isNewTask, showAlert} = useAppContext()
  return (
    <React.Fragment>
    {isNewProject && <NewProjectModal />}
    {isNewTask && <NewTaskModal />}
    <Navigation />
    <MobileNavigation />
    <main className='max-w-[1200px] min-h-[90vh]  mx-auto my-8 px-4'>
    <div className='w-full min-h-[700px] rounded flex'>

    <Sidebar />
     <div className='flex-1 bg-slate-100 relative rounded p-2'>
     <div className='mx-20%'>
    {showAlert && <Alert /> }
    </div>
     {props.children}</div>
     </div>
    </main>
    </React.Fragment>
  )
}

export default Layout