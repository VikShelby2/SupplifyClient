import React from 'react'
import { cva } from 'class-variance-authority'

// Define the button outer and inner style variants
const outerButtonStyles = cva(
  'group p-[4px] btn-shd rounded-[.5rem] shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]',
  {
    variants: {
      intent: {
        primary: 'bg-gradient-to-b from-violet-400 to-violet-500 text-white',
        secondary: 'bg-gradient-to-b from-green-500 to-green-700',
        tertiary: 'bg-gradient-to-b from-red-500 to-red-700',
        stone: 'bg-gradient-to-b from-white to-stone-200/40',
      },
    },
    defaultVariants: {
      intent: 'stone',
    },
  }
)

const innerButtonStyles = cva('bg-gradient-to-b rounded-[.4rem] ', {
  variants: {
    intent: {
      primary: 'from-violet-500 to-violet-400',
      secondary: 'from-green-400 to-green-600',
      tertiary: 'from-red-400 to-red-600',
      stone: 'from-stone-200/40 to-white/80',
    },
    size: {
      default: 'px-[1rem] py-2',
      sm: 'px-[.5rem] py-[.2rem]',
    },
  },
  defaultVariants: {
    intent: 'stone',
    size: 'default',
  },
})

const Button = ({ children, intent = 'stone', size }) => {
  return (
    <button className={outerButtonStyles({ intent })}>
      <div className={innerButtonStyles({ intent, size })}>
        <div className="flex gap-2 items-center">
          <span className="">{children}</span>
        </div>
      </div>
    </button>
  )
}

export default Button
