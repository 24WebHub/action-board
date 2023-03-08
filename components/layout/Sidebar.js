import Link from 'next/link';
import {RxDashboard} from 'react-icons/rx';
import {CgList} from 'react-icons/cg';
import {RiListCheck} from 'react-icons/ri';

const Sidebar = () => {
  return (
    <div className='hidden md:flex w-[200px] min-h-[700px] bg-slate-200 rounded-tl rounded-bl p-6 text-gray-600  font-semibold'>
      <div className='w-full'>
        <div className='my-8 text-md'><h3>MENU</h3></div>
        <ul>
          <li className='py-3 mt-4  border-b-2 border-white cursor-pointer '><Link className='flex gap-3 items-center' href='/'>
          <RxDashboard className=''/> <p >Dashboard</p>
          </Link></li>
          <li className='py-3 mt-4 border-b-2 border-white cursor-pointer'><Link className=' flex gap-3 items-center' href='/my-projects'><CgList /><p>My Projects</p></Link></li>
          <li className='py-3 mt-4 border-b-2 border-white'><Link className='flex gap-3 items-center' href='/my-tasks'><RiListCheck /><p>My Tasks</p></Link></li>
          <li className='py-3 mt-4 border-b-2 border-gray-200'><p className='text-gray-400'>Calendar</p></li>
          <li className='py-3 mt-4 border-b-2 border-gray-200'><p className='text-gray-400'>Teams</p></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar