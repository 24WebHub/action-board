import { useState, useEffect } from 'react'
import {signIn, getSession} from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {RiLoginCircleLine} from 'react-icons/ri'
import {PulseLoader } from 'react-spinners'
import {FiUserPlus} from 'react-icons/fi'
import Brand from '../ui/login/Brand'
import FormInput from '../ui/forms/FormInput'
import { useAppContext } from '../context/AppContext'
import Alert from '../ui/Alert'


export default function Login() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const {createUser, handleIsRegistered, isRegistered, displayAlert, showModalAlert, isModalLoading, toggleIsModalLoading, loginUserError, getUser, user } = useAppContext()

  useEffect(() => {
    getSession().then(session =>{
      if(session) {
        router.replace('/')
      }
    })
  }, [router])

  const userFormSubmitHandler = async (event) => {
    event.preventDefault();

    if((!isRegistered && !fullname || !isRegistered && fullname.trim() === '') ||!email || email.trim() === '' ||!password || password.trim() === '') {
      displayAlert('Please provide all values')
      return
    }

    

    if(isRegistered) {
      toggleIsModalLoading();
      const result = await signIn('credentials', {
          redirect: false,
          email: email,
          password: password,
        });
        if(!result.error){
          toggleIsModalLoading();
          router.replace('/');
        }else {
        loginUserError(result.error)
        }
        
    }else {
      if(password.length < 8) {
        displayAlert("Password lenght must be at least eight (8) character long")
        return 
      }
      if(!password.match(/[0-9]/)) {
        displayAlert("Password must contain at least one numeric value")
        return 
      }
      if(!password.match(/[a-z]/) ||!password.match(/[A-Z]/)) {
        displayAlert("Password must contain at least one lowercase and one uppercase character")
        return 
      }
      if(!password.match(/[!\@\#\$\%\^\&\*\_\-\+\=\?\.\,]/)) {
        displayAlert("Pawssword must contain at least one special character !#$%&()*+,-./<=>?@\^_~")
       return 
      }
      const newUser = {
        fullname, email, password
      }
      createUser('api/auth/signup', newUser)
    }
    }
    
  return (
    <>
      <Head>
      
        <title>ACTION BOARD - Login</title>
        <meta name="description" content="ACTION BOARD - Project Management Solution" />
        <meta name="description" content="ACTION BOARD - Login Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className='w-[100%] h-[100vh] bg-gradient-to-r from-sky-500 to-indigo-500 cursor-pointer z-10'></div>
      <div className='items-center left-[25%] w-[50vw] top-[7vh] bottom-[5vh] text-black z-30 absolute'>

        <div className='flex items-center justify-center gap-4'><Brand  />
        <div className='text-4xl text-white font-bold '><h1>ACTION BOARD</h1></div>
        </div>

        <div className='rounded shadow-lg mt-12 text-gray-600  bg-white text-center'>
       
       <div className='px-10 py-2'>  

       {isRegistered ? <div className='flex items-center gap-2 justify-center py-8'>
         <div className='flex justify-center'>
         <RiLoginCircleLine className='w-8 h-8 text-[#3C83ED]' />
         </div>
         <h1>Login</h1>
         </div> :
       <div className='flex items-center gap-2 justify-center py-8'>
         <div className='flex justify-center'>
         <FiUserPlus className='w-8 h-8 text-[#3C83ED]' />
         </div>
         <h1>Create New User</h1>
         </div>}

         </div>
         
         <div className='py-4 px-12 bg-slate-100 border-t border-t-gray-200'>
           <form onSubmit={userFormSubmitHandler} className='w-[40vw]'>
          {!isRegistered && <FormInput id='full-name' type='text' label='Full Name' placeholder='Enter your names' onChange={e => setFullname(e.target.value)} />}
           <FormInput id='email' type='email' label='Email' placeholder='Enter your email' onChange={e => setEmail(e.target.value)} />
           <FormInput id='password' type='password' label='Password' placeholder='Enter your passowrd' onChange={e => setPassword(e.target.value)} />
           {!isRegistered && <p className='text-[13px] text-gray-500'>Password must contain at least one numeric value 0-9, one lowercase character a-z, one uppercase character A-Z, and one special character !#$%&*+,-./=?@\^_~</p>}

            {isModalLoading && <div className='flex justify-center items-center'><PulseLoader color="#12A1E9"/></div>}
            {showModalAlert && <Alert />}
           <div className='bg-[#3C83ED] rounded text-white py-3 mt-4 mb-2'>
           <button type='submit' className='w-full'>{isRegistered ? 'Sign In' : 'Create Account'}</button>
           </div>
           
           
           </form>
           {isRegistered ? <p className='text-gray-500'>Not yet registered? <button onClick={handleIsRegistered} className='text-green-600'>Create an account</button></p> : <p className='text-gray-500'>Already has an account? <button onClick={handleIsRegistered} className='text-blue-500'>Sign In</button></p>}           
         </div>
 
         </div>
      </div>
    </>
  )
}
