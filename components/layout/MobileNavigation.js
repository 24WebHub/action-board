import Link from 'next/link'
import {RxDashboard} from 'react-icons/rx'
import {CgList} from 'react-icons/cg'
import {RiListCheck} from 'react-icons/ri'
 
const MobileNavigation = () => {
  return (
    <div className='flex items-center justify-between p-1 bg-white my-1 mx-10 sm:mx-20 rounded-sm  md:hidden text-gray-600'>

      <Link href='/' className='flex gap-3 items-center font-semibold cursor-pointer bg-slate-100 w-full mx-[2px] py-[2px] px-2'>
      <RxDashboard  className='' /><h3>Dashboard</h3>
      </Link>
      
      <Link href='/my-projects' className='flex gap-3 items-center font-semibold cursor-pointer bg-slate-100 w-full mx-[2px] py-[2px] px-2'>
      <CgList className='' /> <h3>My Projects</h3>
      </Link>
      <Link href='/my-tasks' className='bg-slate-100 w-full flex gap-3 items-center font-semibold cursor-pointer mx-[2px] py-[2px] px-2'>
      <RiListCheck className='' /> <h3>My Tasks</h3>
      </Link>
    </div>
  )
}

export default MobileNavigation