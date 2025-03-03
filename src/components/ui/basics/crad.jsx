import React from 'react'

const Card = ({children}) => {
  return (
    <div className='border rounded-[.5rem]'>
      {children}   
    </div>
  )
}

export default Card
