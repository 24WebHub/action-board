import { Fragment, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import {PulseLoader} from 'react-spinners'
import StatsChart from '../ui/dashboard/StatsChart'
import Layout from '../components/layout/Layout'
import { useAppContext } from '../context/AppContext'
import AllProjectSummaryList from '../components/dashboard/AllProjectSummaryList'
import Head from 'next/head'


const Dashboard = () => {
  const {getAllProjects, allProjects, isLoading} = useAppContext()

  useEffect(() => {
    getAllProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])


  const completedProject = allProjects.filter(allProject => allProject.status === 'Completed' )

  const notStartedProject = allProjects.filter(allProject => allProject.status === 'Not Started' )

  const inProgressProject = allProjects.filter(allProject => allProject.status === 'In Progress' )

  const  formatDate = ((date = new Date()) =>{
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {month: '2-digit'});
    const day = date.toLocaleString('default', {day: '2-digit'});
  
    return [year, month, day].join('-');
  })
   
  const formatedDate = formatDate() 

  const overdueProject = allProjects.filter(allProject => (allProject.completionDate < formatedDate) && (allProject.status !== 'Completed'))

  if(isLoading) {
    <div className='mt-[45vh] mx-auto'>{isLoading && <PulseLoader color="#12A1E9" />} </div>
  }

  return (
    <Fragment>
    <Head>
    <title>ACTION BOARD - Dashboard</title>
        <meta name="description" content="ACTION BOARD - Project Management Solution" />
        <meta name="description" content="ACTION BOARD - Stats and summary of all projects and by all users" />
    </Head>
    <Layout>
    <div className=' bg-gradient-to-r from-sky-500 to-indigo-500 grid lg:grid-cols-2 rounded'>

    <div className='pl-4 my-4 lg:border-r-2 border-white w-full'>
    <div className='flex justify-center lg:justify-start items-center gap-4'>
    <StatsChart />
    <p className='space-x-1 text-white font-semibold'><span>Total:</span><span>{allProjects.length}</span></p>
    </div>

    <div className='flex w-full justify-around items-center mt-4'>
    <div className='flex gap-3 items-center'><div className='w-3 h-3 bg-slate-300'></div><p>Not Started</p></div>
    <div className='flex gap-3 items-center'><div className='w-3 h-3 bg-orange-500'></div><p>In Progress</p></div>
        <div className='flex gap-3 items-center'><div className='w-3 h-3 bg-green-400'></div><p>Completed</p></div>

      </div>
    </div>

  
    <div className='grid grid-cols-2 mx-4 my-6 gap-4 lg:gap-8'>

    <div className='bg-white max-h-16 rounded-lg flex mt-4 p-2 gap-2 items-center'>
    <div className='w-6 h-6 rounded-full bg-orange-500'></div>
    <div className='w-[1px] h-6 bg-slate-400'></div>
    <div className=''>In progress</div>
    <div>{inProgressProject.length}</div>
    </div>

    <div className='bg-white max-h-16 rounded-lg flex mt-4 p-2 gap-2 items-center'>
    <div className='w-6 h-6 rounded-full bg-green-400'></div>
    <div className='w-[1px] h-6 bg-slate-400'></div>
    <div className=''>Completed</div>
    <div>{completedProject.length}</div>
    </div>
    <div className='bg-white max-h-16 rounded-lg flex mt-4 p-2 gap-2 items-center'>
    <div className='w-6 h-6 rounded-full bg-red-500'></div>
    <div className='w-[1px] h-6 bg-slate-400'></div>
    <div className=''>Overdue</div>
    <div>{overdueProject.length}</div>
    </div>
    <div className='bg-white max-h-16 rounded-lg flex mt-4 p-2 gap-2 items-center'>
    <div className='w-6 h-6 rounded-full bg-gray-400'></div>
    <div className='w-[1px] h-6 bg-slate-400'></div>
    <div className=''>Not started</div>
    <div>{notStartedProject.length}</div>
    </div>

    </div>
    </div>

      <AllProjectSummaryList />
    </Layout>
    </Fragment>
  )
}

export default Dashboard

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