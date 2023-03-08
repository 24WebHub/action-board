import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import {RiLogoutCircleLine} from 'react-icons/ri'
import {BiUserCircle} from 'react-icons/bi'
import {MdCircleNotifications} from 'react-icons/md'
import { useAppContext } from '../../context/appContext'
import Logo from './Logo'

const Navigation =  () => {
  const {getUser, user} = useAppContext()

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])


    return (
      <header className='bg-gradient-to-r from-[#1C9BEB] to-[#5570EF] shadow drop-shadow-md px-8 flex justify-center items-center'>
  
      <nav className='max-w-[1100px] my-2 flex justify-between w-full text-white'>
      <div className='flex gap-2 items-center cursor-pointer' >
      <Logo />
  
  
      <h2 className='font-semibold'>ACTION BOARD</h2>
      </div>
      {user &&
      <div className='flex items-center gap-8 text-slate-200'>
      <div className='flex gap-2 items-center text-gray-400 rounded border border-gray-400 py-1 px-4'><div className='relative'>
        <p className='text-[13px] absolute ml-[-4px] mt-[-6px]'>3</p>
        <MdCircleNotifications className='h-5 w-5' />
      </div><p>Notifications</p></div>
      <div className='flex items-center gap-2 font-semibold rounded border border-white py-1 px-4'>
      <BiUserCircle className='h-5 w-5' />
      <p>{user.fullname}</p>
      </div>
      <button onClick={() => signOut()} className='flex gap-2 items-center rounded border border-white py-1 px-4'><RiLogoutCircleLine /><h3 className='font-semibold'>Logout</h3></button>
      </div>}
  
      </nav>
      </header>
    )

 
}

export default Navigation