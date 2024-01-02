/* eslint-disable react/prop-types */
import React ,{ useId } from 'react'

// function Select({
//     options,
//     label,
//     className = '',
//     ...props
// }, ref) {
    
const Select = React.forwardRef(function Select( {
    options,
    label,
    className='',
    ...props
}, ref) {

    const id = useId()
  
    return (
    <div className=' w-full'>
        {label && <label htmlFor={id} className=''></label>}
        {/* <select id={id} className={`w-full h-12 text-base rounded appearance-none bg-white border border-
        gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset
        focus:ring-indigo-500 block pl-8 pr-6 py-2 shadow-sm text-left cursor-default
        ${className}`} {...props} ref={ref}></select> */}

        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
         >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
})

export default Select