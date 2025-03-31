'use client'
import React, { useState } from 'react'
import { cn } from '../../../../lib/utils'
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion'

const Input = React.forwardRef(function Input(
  {
    outerStyle,
    outerBg,
    outerRad,
    className,
    type,
    value,
    variant = 'default',
    ...props
  },
  ref
) {
  const radius = 100 // Change this to increase the radius of the hover effect
  const [visible, setVisible] = useState(false)

  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Define your variants
  const variants = {
    default: `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm 
      file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 
      dark:placeholder:text-neutral-600 focus-visible:outline-none 
      focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 
      disabled:cursor-not-allowed disabled:opacity-50 
      dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] 
      group-hover/input:shadow-none transition duration-400`,
    primary: ` bg-[#1d1d1d]
    w-full h-[38px] border  text-white text-sm rounded-lg 
focus:outline-none focus:ring-2 focus:ring-[#8a50fe] focus:ring-offset-2 focus:border-black 
block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 :placeholder-gray-400 dark:text-white 
dark:focus:ring-black dark:focus:border-black 
group-hover/input:shadow-none transition duration-400`,
    primaryWhite: ` bg-gray-50
w-full h-[38px] border  text-black text-sm rounded-lg 
focus:outline-none focus:ring-2 focus:ring-[#8a50fe] focus:ring-offset-2 focus:border-black 
block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 :placeholder-gray-400 dark:text-white 
dark:focus:ring-black dark:focus:border-black 
group-hover/input:shadow-none transition duration-400`,
    primaryWhiteSmall: ` bg-gray-50
w-full h-[38px] border  text-black text-sm rounded-lg 
focus:outline-none focus:ring-2 focus:ring-[#8a50fe] focus:ring-offset-2 focus:border-black 
block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 :placeholder-gray-400 dark:text-white 
dark:focus:ring-black dark:focus:border-black 
group-hover/input:shadow-none transition duration-400`,
    priceWhite: ` bg-gray-50
w-full h-[38px] border  text-black text-sm rounded-lg 
focus:outline-none focus:ring-2 focus:ring-[#8a50fe] focus:ring-offset-2 focus:border-black 
block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 :placeholder-gray-400 dark:text-white 
dark:focus:ring-black dark:focus:border-black 
group-hover/input:shadow-none transition duration-400 ps-[3.5rem]`,
  }

  return React.createElement(
    motion.div,
    {
      className: outerStyle,
      style: {
        borderRadius: outerRad,
        backgroundColor: outerBg,
        width: outerStyle,
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
            var(--blue-500),
            transparent 80%
          )
        `,
      },
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
      className: cn(
        'p-[2px] rounded-lg transition duration-300 group/input',
        outerStyle
      ),
    },
    React.createElement('input', {
      type: type,
      className: cn(
        variants[variant], // Use the variant prop to select styles
        className
      ),
      ref: ref,
      value: value,
      ...props,
    })
  )
})
Input.displayName = 'Input'

export { Input }
