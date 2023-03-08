const OptionsButton = (props) => {


  return (
    <div className='group cursor-pointer relative '>
    <div className='leading-[30%]'>.</div>
    <div className='leading-[30%]'>.</div>
    <div className='leading-[30%]'>.</div>
    <div>{props.children}</div>
    </div>
  )
}

export default OptionsButton