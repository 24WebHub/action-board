import React from 'react'

const FormInput = (props) => {
  return (
<div className='mb-2 border-b  border-b-white text-left'>
            <label htmlFor={props.id} className='block py-2 text-[14px] font-semibold capitalize'>{props.label}</label>
            <input 
            type={props.type} 
            id={props.id} 
            placeholder={props.placeholder || ''}
            value={props.value}  
            onChange={props.onChange}
            className={`block w-full py-1 mb-2 rounded px-2 outline-none text-lg text-gray-400 ${props.type === 'date' ? 'uppercase' : ''}`}/>
          </div>)
}
export default FormInput