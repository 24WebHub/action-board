import { getSession } from 'next-auth/react'
import { Fragment, useEffect } from 'react'
import {PulseLoader} from 'react-spinners'
import { useAppContext } from '../../context/appContext'
import Layout from '../../components/layout/Layout'
import ToDoTasks from '../../components/task/ToDoTasks'
import InProgressTasks from '../../components/task/InProgressTasks'
import CompletedTasks from '../../components/task/CompletedTasks'
import Head from 'next/head'


const MyTask = () => {
  const {handleTask,  getMyRecentProjects, getMyTodoTasks, isLoading} = useAppContext()

  useEffect(() => {
    getMyTodoTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  const newTaskHandler = () => {
    getMyRecentProjects()
    handleTask()
  }

  if(isLoading) {
    <div className='mt-[45vh] mx-auto'>{isLoading && <PulseLoader color="#12A1E9" />} </div>
  }
 
  return (
    <Fragment>
    <Head>
    <title>ACTION BOARD - My Tasks</title>
        <meta name="description" content="ACTION BOARD - Project Management Solution" />
        <meta name="description" content="ACTION BOARD - Lists of tasks for all recent projects by the active user" />
    </Head>
    <Layout>
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 my-16 mx-4 gap-6 bg-inherit'>
{/*  */}
    <div className='rounded bg-slate-200 pb-4'>
      <div className='flex justify-between px-4 py-1'>
      <div className='flex gap-2 text-[14px] font-bold'>
      <p className=''>To Do</p>
      <p className='text-gray-500'>2</p>
      </div>

      <div className='flex gap-2 text-[20px] text-gray-600 bold'>
        <button onClick={newTaskHandler} className='cursor-pointer'>+</button>
        <div className='cursor-pointer'>
        <p className='leading-[30%]'>.</p>
        <p className='leading-[30%]'>.</p>
        <p className='leading-[30%]'>.</p>
        </div>
      </div>
      </div>
      
      <div className='h-[2px] w-full bg-white mb-4'></div>

      <div className='grid gap-6'>
      <ToDoTasks />

      <div className='grid grid-cols-3'>
        <div></div>
        <div></div>
        <div className=''>
    <div onClick={handleTask} className='w-11 h-11 rounded-full bg-red-400 mx-auto cursor-pointer shadow-lg text-white text-[24px] text-center font-black'>
    + 
    </div>
    </div>
      </div>


      </div>
      </div>


      {/* taskCategory  */}
      <div className='rounded bg-slate-200 pb-4'>
      <div className='flex justify-between px-4 py-1'>
      <div className='flex gap-2 text-[14px] font-bold'>
      <p className=''>In Progress</p>
      <p className='text-gray-500'>7</p>
      </div>

      <div className='flex gap-2 text-[20px] text-gray-400 bold'>
        <p className=''>+</p>
        <div className=''>
        <p className='leading-[30%]'>.</p>
        <p className='leading-[30%]'>.</p>
        <p className='leading-[30%]'>.</p>
        </div>
      </div>
      </div>
      
      <div className='h-[2px] w-full bg-white mb-4'></div>

      <div className='grid gap-6'>
      <InProgressTasks />
      </div>


      </div>
      {/*  */}

      <div className='rounded bg-green-300 pb-4'>
      <div className='flex justify-between px-4 py-1'>
      <div className='flex gap-2 text-[14px] font-bold'>
      <p className=''>Completed</p>
      <p className='text-gray-500'>20</p>
      </div>

      <div className='flex gap-2 text-[20px] text-gray-400 bold'>
        <p className=''>+</p>
        <div className=''>
        <p className='leading-[30%]'>.</p>
        <p className='leading-[30%]'>.</p>
        <p className='leading-[30%]'>.</p>
        </div>
      </div>
      </div>
      
      <div className='h-[2px] w-full bg-white mb-4'></div>

      <div className='grid gap-6'>
      <CompletedTasks />
      </div>
      </div>
    </div>
    </Layout>
    </Fragment>
  )
}

export default MyTask

export async function getServerSideProps(context) {
  const session = await getSession({req: context.req})
  if(!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false, 
      }
    }
  }

  return {
    props: {session}
  }
}