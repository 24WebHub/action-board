import Link from "next/link"
import { useAppContext } from "../../context/appContext"
import {BarLoader} from 'react-spinners'



const ProjectOptions = (props) => {
  const {deleteProject, isLoading} = useAppContext()

  const deleteProjectHandler = () => {
    const deleteId = props.id
    deleteProject(deleteId, 'index')
  }

  return (
    <div>
    <div className="absolute hidden group-hover:block hover:block active:blcok group-active:block z-30">
    <div className="p-5"> 
    <div className="bg-white w-4 h-4 mt-[-10px] left-[6px] rotate-45 absolute"></div>

    <ul className='cursor-default bg-white rounded-b-md rounded-tr-md shadow-pink-200 shadow-lg p-3 space-y-1 absolute text-[14px] right-3 mt-[-2px]'>
          {isLoading && <BarLoader color="#36d7b7" height={2} width={80} />}
         <li><Link href={`my-projects/${props.id}`}>...More</Link></li>
         <li><button onClick={deleteProjectHandler}>Delete</button></li>
         <li className="text-gray-400">Assign</li>
       </ul>

    </div>

    </div>

    

    </div>
  )
}

export default ProjectOptions