import React from 'react'
import { cn } from '../../../../../../lib/utils'

const FormLabel = ({
  children ,
  style ,
  inputName ,
  className , 
  weight ,
  font
}) => {
  return (
    <label for={inputName} className={cn("block  text-[1rem] font-medium text-white dark:text-white" , className)} 
   >{children}</label>
  )
}

export default FormLabel
