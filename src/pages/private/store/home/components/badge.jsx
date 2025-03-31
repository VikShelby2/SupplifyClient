import React from 'react'

const Badge = ({ text }) => {
  return (
    <div className="p-2 flex items-center rounded-[.5rem] bg-white border-violet-500">
      <span className="text-[.75rem]">{text}</span>
    </div>
  )
}

export default Badge
