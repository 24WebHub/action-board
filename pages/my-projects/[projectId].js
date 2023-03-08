import { Fragment, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {PulseLoader} from 'react-spinners'
import {RiListCheck} from 'react-icons/ri'
import {CiTimer} from 'react-icons/ci'
import { useAppContext } from '../../context/AppContext'

import Layout from "../../components/layout/Layout"
import Head from 'next/head'

const ProjectDetails = () => {
  const router = useRouter()
  const { projectDetails, handleProject, handleProjectEdit, getProjectDetails, isLoading, user} = useAppContext()

  console.log(projectDetails)

const {projectId} = router.query

useEffect(() => {
  getProjectDetails(projectId)
  // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [])

const projectEditHandler = () => {
  handleProjectEdit()
    handleProject()
}




if(isLoading) {
  return <div className='mt-[45vh] text-center'>{isLoading && <PulseLoader color="#ffffff" />} </div>
}
  
if(Object.keys(projectDetails).length > 0) {
  const completedTasks = projectDetails.tasks.length > 0 && projectDetails.tasks.filter(task => task.status === 'Completed') 
  
  return (
    <Fragment>
    <Head>
    <title>ACTION BOARD - {projectDetails.title}</title>
        <meta name="description" content="ACTION BOARD - Project Management Solution" />
        <meta name="description" content="ACTION BOARD - Project details" />
    </Head>
    <Layout>
    { (Object.keys(projectDetails).length === 0) ? <p className='text-center font-semibold mt-[45vh]'>Could not fetch project details from the server.</p>
    :
    <div className=' text-gray-600 my-16 mx-4  bg-inherit'>
      <div className='px-10 py-2'>      
      <div className='mb-1 w-full lg:w-[50vw] xl:w-[40vw]'>
        <div>
        <h2 className='uppercase'>{projectDetails.title}</h2></div>
        </div>
        </div>
        
        <div className='py-4 px-12 bg-slate-100 relative border-t'>
          <div className='absolute top-0 right-0 flex gap-4 m-2 text-white'>
            <div className='py-1 px-4 bg-gray-300 text-gray-400 rounded'>Asign</div>
            <div className='py-1 px-4 bg-gray-300 text-gray-400 rounded'>Move</div>
          </div>

          <div className='w-full lg:w-[50vw] xl:w-[40vw] mt-12'>


          <div className='space-y-6'>
          

          <div className='w-full'>
          <div className='flex w-full'>
            <p className='w-1/3'>Completion Date:</p>
            <div className='flex w-2/3 items-center gap-4'>
            <CiTimer className='text-orange-300' />
            <p className='p-1'>{projectDetails.completionDate}</p>
            </div>
          </div> </div>

          <div className='w-full'>
          <div className='flex w-full'>
            <p className='w-1/3'>Tasks:</p>
            <div className='p-1 w-2/3 flex gap-4 items-center'>
            <RiListCheck  className='text-green-400'/>
            <p className=''>{projectDetails.tasks.length === 0 ? 0 : <p>{completedTasks.length} / {projectDetails.tasks.length}</p>}</p>
            </div>
          </div>
          </div>

          <div className='w-full'>
          <div className='flex w-full'>
            <p className='w-1/3'>Status:</p>
            <div className='p-1 w-2/3 flex gap-4 items-center'>
            <p className=''>{projectDetails.status}</p>
            </div>
          </div>
          </div>

          <div className='w-full'>
          <div className='w-full flex'>
            <p className='w-1/3'>Project Description:</p>
            <p className='p-1 w-2/3'>{projectDetails.description}</p>
          </div> </div>


          <div className='w-full'>
          <div className='flex w-full'>
            <p className='w-1/3'>Owner / <span className='text-gray-400'>Team</span>:</p>
            <p className='text-purple-500'>{user.fullname}</p>
          </div>
          </div>
        
          </div>


          </div>

          <div className='flex gap-4 justify-around  text-white py-3 mt-8'>
          <div className=''>
           <button className='bg-[#6ABE45] rounded py-2 px-8' onClick={projectEditHandler}>Edit</button> </div>
          <div className=''>
          <div className='py-2 px-8 rounded bg-gray-300' >Delete</div> </div>
          </div>
        </div>

        </div>} 
        </Layout>
        </Fragment>
  )
}
  
}

export default ProjectDetails

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