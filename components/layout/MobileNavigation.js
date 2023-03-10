import Link from 'next/link'
import {RxDashboard} from 'react-icons/rx'
import {CgList} from 'react-icons/cg'
import {RiListCheck} from 'react-icons/ri'
 
const MobileNavigation = () => {
  return (
    <div className='flex items-center text-[15px] justify-between py-2 bg-slate-100 my-2 mx-4 rounded-sm  md:hidden text-gray-600'>

      <Link href='/' className='flex gap-2 items-center font-semibold cursor-pointer w-full mx-[2px] py-[2px] px-2'>
      <RxDashboard  className='' /><h3 className='text-[14px]'>Dashboard</h3>
      </Link>
      <div className='h-6 w-2 bg-white'></div>
      <Link href='/my-projects' className='flex gap-2 items-center font-semibold cursor-pointer w-full mx-[2px] py-[2px] px-2'>
      <CgList className='' /> <h3 className='text-[14px]'>My Projects</h3>
      </Link>
      <div className='h-6 w-2 bg-white'></div>
      <Link href='/my-tasks' className=' w-full flex gap-2 items-center font-semibold cursor-pointer mx-[2px] py-[2px] px-2'>
      <RiListCheck className='' /> <h3 className='text-[14px]'>My Tasks</h3>
      </Link>
    </div>
  )
}

export default MobileNavigation