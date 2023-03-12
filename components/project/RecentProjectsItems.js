import { useEffect } from 'react'
import {RiListCheck} from 'react-icons/ri'
import {RxCalendar} from 'react-icons/rx'
import { useAppContext } from '../../context/appContext'
import OptionsButton from '../../ui/OptionsButton'
import ProjectOptions from './ProjectOptions'

const RecentProjectsItems = () => {
const {myRecentProjects,getActiveProjectTitle, getMyRecentProjects, isLoading} = useAppContext()

useEffect(() => {
  getMyRecentProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [])


const draggingStarted = (e, id) => {
  e.dataTransfer.setData('transferedId', id)
}

const createTaskHandler = (e, projectTitle) => {
  getActiveProjectTitle(projectTitle)
}


  return (
    <ul  className='grid sm:grid-cols-2 gap-6 m-3'>
    {!isLoading && myRecentProjects.length === 0 ? <p className='p-2 text-red-400 text-center lg:col-span-2'>Empty!!!</p>: myRecentProjects.map(recentProject => {

      const completedTasks = recentProject.tasks.length > 0 && recentProject.tasks.filter(task => task.status === 'Completed') 
 
      const completedTasklength = completedTasks.length || 0

      const progressWidth = completedTasklength !== 0 ? Math.floor((completedTasklength/recentProject.tasks.length)* 100) : 0
      
return <li draggable onDragStart={e=>draggingStarted(e, recentProject._id)} key={recentProject._id} className=''>
<div className='p-2 bg-white rounded shadow'>
<div className='flex justify-between mb-3 '>
<h3 className='leading-[120%] text-[14px] font-semibold text-gray-500 pr-2'>{recentProject.title}</h3>
<div>
<div className='flex gap-2'>
  <button onClick={e=>createTaskHandler(e, recentProject.title)} className='font-semibold text-gray-500'>+</button>
  <OptionsButton>
<ProjectOptions id={recentProject._id} />
</OptionsButton>
</div>

</div>
</div>

<div className='group space-y-2 '>
<div className='flex justify-between'>

  <div className='flex gap-2 items-center text-[14px]'><RiListCheck /><div className='text-green-400 font-semibold'>{recentProject.tasks.length === 0 ? 0 : <p>{completedTasks.length} / {recentProject.tasks.length}</p>}</div></div>

  <div className='flex gap-2 items-center text-[14px]'><RxCalendar /><p className='text-orange-300 font-semibold'>{recentProject.completionDate}</p></div>

</div>

<div className='h-[6px]  w-full relative rounded border border-gray-300'>
  <div className={`h-[6px] absolute rounded ${progressWidth < 100 ? 'bg-amber-400' : 'bg-green-400'}  `} style={{width: `${progressWidth}%`}}></div>

      </div>

      {recentProject.tasks.length > 0 && completedTasks.length === recentProject.tasks.length && <div className=' hidden group-hover:block hover:block text-[12px] text-center active:blcok animate-ping textt-green-300 group-active:block '>Drag to move to completed</div>}

<div className='flex justify-between'>
<p className='text-[13px]'>{recentProject.status}</p>
<p className='text-gray-400'>Team</p>
</div>

</div>
</div>
</li>
}  ) }
    </ul>
  )
}

export default RecentProjectsItems