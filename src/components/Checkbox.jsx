import React from 'react'

const Checkbox = ({ checked, onChange }) => {
    return (
        <>
            <input
                type="checkbox" checked={checked} onChange={onChange}
                className="appearance-none relative cursor-pointer rounded-full transition-colors duration-500 w-12 h-6 bg-gray-200 checked:bg-neutral-800 before:content-[''] before:absolute before:rounded-full before:transition-all before:duration-500 before:w-4 before:h-4 before:top-1 before:left-1 before:bg-neutral-800 checked:before:bg-gray-200 checked:before:translate-x-6
  "
            />
        </>
    )
}

export default Checkbox