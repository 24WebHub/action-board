// import {RiListCheck} from 'react-icons/ri'
// import {CiTimer} from 'react-icons/ci'
// import {PulseLoader} from 'react-spinners'
// import { useAppContext } from '../../context/AppContext'
// import Alert from '../../ui/Alert'
// import { useEffect } from 'react'

// const ToDoTasks = () => {
// const {myRecentTasks} = useAppContext()


// // if(isLoading) {
// //   return <div className='flex justify-center items-center'><PulseLoader color="#12A1E9"/></div>
// // }

// // if(showAlert) {
// //   return <Alert />
// //  }

// function extractArrayItems (tasks) {
//   const combinedArray = []
//   for(let items of tasks) {
//   combinedArray.push(...items)
//   }
//   return combinedArray
// }

// const tasks =extractArrayItems(myRecentTasks)

// const dragStarted = (e, id) => {
//   console.log('drag started' + id)
//   e.dataTransfer.setData('taskId', id)

// }

// const dragDropped = (e) => {
//   let transferedData = e.dataTransfer.getData('taskId')
//  const taskInfo = {
//     taskId: transferedData,
//     status: 'In Progress'
//   }
//   updateTaskStatus(taskInfo)
// }


//   return (
//     <ul className='space-y-4'>
//     {tasks.filter(myTask => myTask.status === 'To Do').map(task => 
//         <div  key={task._id} className='mx-3 bg-white rounded-lg space-y-3  shadow p-2' draggable onDragStart={e=> dragStarted(e, task._id)}>
    
//     <div className='leading-[110%] text-[14px] font-semibold'>
//       {task.title}
//     </div>
    
//      <div className='flex justify-between items-center gap-3'>
//         <p className='text-gary-500 leading-[100%] text-[13px]'>{task.projectTitle}</p>

//         <div className='flex gap-2 items-center text-[14px]'><CiTimer /><p className='text-orange-300 font-semibold'>{task.completionDate}</p></div>
//       </div>

  
//     </div>
//   )}
//    </ul>
//   )
// }

// export default ToDoTasks

        // project.tasks.map(task => tasks.push(task.status))

        // if((tasks.indexOf('Not Started') === -1) && (tasks.indexOf('In Progress') === -1)) {
        //   return {
        //     ...state, isProjectCompleted: true
        //   }
        // }



        // ---------------------------------
      //   case CHECK_PROJECT_COMPLETION_STATUS:
      // const projectId = action.payload.projectId
      // let project;
      // let taskStatus;
      // state.myRecentProjects.map(myRecentProject => {
      //   if(myRecentProject._id === projectId) {
      //     project = myRecentProject
      //   }
      // })
      // if(project.tasks.length > 0) {
      //   taskStatus = project.tasks.find(task => {
      //   return  task.status === 'To Do' || task.status === 'In Progress'
      //   })
      // }
      
      // if(project.tasks.length > 0 && taskStatus === undefined) {
      //   return {
      //     ...state, 
      //     isProjectCompleted: true,
      //   }
      // }else {
      //   return {
      //     ...state, 
      //     showAlert: true,
      //     alertType: 'danger',
      //     alertText: 'Please ensure all tasks are completed',
      //   }
      // }