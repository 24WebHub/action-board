import { useAppContext } from "../context/appContext"
const OptionsButton = (props) => {

  const {isLoading}  = useAppContext()

  return (
    <div className={`group cursor-pointer relative ${isLoading && 'text-gray-300'}`}>
    <div className='leading-[30%]'>.</div>
    <div className='leading-[30%]'>.</div>
    <div className='leading-[30%]'>.</div>
    <div>{props.children}</div>
    </div>
  )
}

export default OptionsButton