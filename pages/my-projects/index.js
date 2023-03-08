import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { Fragment} from 'react'
import {PulseLoader} from 'react-spinners'
import { useAppContext } from '../../context/appContext'
import Layout from '../../components/layout/Layout'
import RecentProjectsItems from '../../components/project/RecentProjectsItems'
import CompletedProjectsItems from '../../components/project/CompletedProjectsItems'
import OptionsButton from '../../ui/OptionsButton'


const MyProject = () => {
const {handleProject, setProjectAsCompleted, isLoading} =  useAppContext()


const draggingOver = (e) => {
  e.preventDefault()
}


const draggingStop  = (e) => {
  const transferedId = e.dataTransfer.getData('transferedId')
    const projectInfo = {
      projectId: transferedId,
      status: 'Completed'
    }
  setProjectAsCompleted(projectInfo)

  }

  if(isLoading) {
    return <div className='mt-[45vh] text-center'>{isLoading && <PulseLoader color="#ffffff" />} </div>
  }

  return (
    <Fragment>
    <Head>
    <title>ACTION BOARD - My Projects</title>
        <meta name="description" content="ACTION BOARD - Project Management Solution" />
        <meta name="description" content="ACTION BOARD - Lists of project by the active user" />
    </Head>
    <Layout>
    <h1 className='mt-10 mx-4'>My Projects</h1>
    <div className='grid lg:grid-cols-3 my-4 mx-4 gap-6 bg-inherit'>
{/* Start of Recent Project Section */}
      <div className='lg:col-span-2 bg-slate-200 rounded '>
      <div>
      <div className='flex justify-between px-4 py-1'>
      
      <div className='flex gap-2 text-[14px] font-bold'>
      <p className=''>Recent Projects</p>
      <p className='text-gray-500'>8</p>
      </div>

      <div className='flex gap-2 text-[20px] text-gray-600 bold'>
        <button onClick={handleProject}>+</button>
        <OptionsButton>
        </OptionsButton>
      </div>
      </div>

    <div className='h-[2px] w-full bg-white mb-4'></div> 
    <RecentProjectsItems />
    <div className='grid grid-cols-3 sm:grid-cols-4 gap-6 m-3'>
    <div></div>
    <div></div>
    <div></div>
    <div className=''>
    <div onClick={handleProject} className='w-11 h-11 rounded-full bg-red-400 mx-auto cursor-pointer shadow-lg text-white text-[24px] text-center font-black'>
    + 
    </div>
    </div>
    </div>
      </div>
</div>
{/* End of Recent Projects Section */}

{/*Start of Completed Projct Section*/}
<div className='bg-green-300 rounded hidden lg:grid overflow-hidden'>
      <div className=''>
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
      <div onDragOver={e=>draggingOver(e)} onDrop={e=>draggingStop(e)} className='h-full'>
      <CompletedProjectsItems />
      </div>
      </div>
    </div>
{/* End of Completed Project Section */}
    </div>
    </Layout>
    </Fragment>
  )
  
}

export default MyProject

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