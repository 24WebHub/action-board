import React from 'react'
import {PulseLoader} from 'react-spinners'
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'
import Sidebar from './Sidebar'
import NewProjectModal from '../project/NewProject'
import NewTaskModal from '../task/NewTask'
import Alert from '../../ui/Alert'
import { useAppContext } from '../../context/appContext'

const Layout = (props) => {
  const {isNewProject, isNewTask, showAlert, isLoading} = useAppContext()
  return (
    <React.Fragment>
    {isNewProject && <NewProjectModal />}
    {isNewTask && <NewTaskModal />}
    <Navigation />
    <MobileNavigation />
    <main className='max-w-[1200px] min-h-[90vh]  mx-auto my-8 px-4'>
    <div className='w-full min-h-[700px] rounded flex'>

    <Sidebar />
     <div className='flex-1 bg-slate-100 relative rounded-tr rounded-br p-2'>
     <div className='mx-20%'>
     {isLoading && <div className='text-center'><PulseLoader color="#12A1E9" /></div>}
    {showAlert && <Alert /> }
    </div>
     {props.children}</div>
     </div>
    </main>
    </React.Fragment>
  )
}

export default Layout