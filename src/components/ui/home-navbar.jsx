import React from 'react'
import { motion } from 'framer-motion'

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
}

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <a
      onMouseEnter={() => setActive(item)}
      className=""
      style={{ padding: '.6rem .5rem .5rem', fontSize: '20.8px' }}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="group flex justify-center gap-5 items-center relative"
      >
        <h1
          className="text-base text-[1rem] font-medium text-white  line-clamp-1"
          style={{ fontSize: '1.2rem' }}
        >
          {item}
        </h1>
        <div className="absolute top-[23px] h-[2px] w-[0%] bg-white transition-all duration-300 group-hover:w-[50%]"></div>
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                // layoutId ensures smooth animation
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  // layout ensures smooth animation
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </a>
  )
}

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      // resets the state
      style={{ boxShadow: ' 0 1px #00000014', maxWidth: '1000px' }}
      onMouseLeave={() => setActive(null)}
      className="backdrop-blur-[.6rem] max-w-[1000px] lg:mt-[20px]  rounded-b-[.5rem] lg:rounded-[.5rem] cursor-pointer w-full transition-all duration-300 mx-auto  bg-[#de94ffd9] dark:bg-[#000000d0] max-w-[1500px] py-[1rem] px-5 2xl:rounded-[1rem] lg:px-10 fixed top-0 z-[99]"
    >
      {children}
    </nav>
  )
}
export const MenuItemWrapper = ({ children }) => {
  return (
    <div className="flex flex-row justify-between items-center">{children}</div>
  )
}
export const MenuItems = ({ children }) => {
  return (
    <div className="lg:flex hidden justify-center gap-10 items-center mx-[30px] w-full md:w-auto  menu-items">
      {children}
    </div>
  )
}
export const ProductItem = ({ title, description, href, src }) => {
  return (
    <div className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </div>
  )
}

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </div>
  )
}
