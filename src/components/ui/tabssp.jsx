'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export const HoverEffectContainer = ({
  tabs,
  setTabs,
  currentTab,
  setCurrentTab,
  containerClassName,
  contentClassName,
  switchTab,
}) => {
  const [hovering, setHovering] = useState(false)
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-center relative h-full overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-[700px]',
        containerClassName
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <FadeInDiv
        tabs={tabs}
        setCurrentTab={setCurrentTab}
        setTabs={setTabs}
        hovering={hovering}
        currentTab={currentTab} // Pass the current tab to FadeInDiv
        switchTab={switchTab} // Pass the switchTab function
        className={cn('mt-32', contentClassName)}
      />
    </div>
  )
}

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
  currentTab,
  switchTab,
  setTabs,
  setCurrentTab,
}) => {
  return (
    <div className={`relative flex justify-center w-[700px] h-full`}>
      {tabs.map((tab, idx) => {
        // When currentTab is 3, render the content without animation
        if (currentTab === 3) {
          return (
            <div
              key={tab.value}
              className={cn(
                'w-full h-full flex justify-center absolute top-0 left-0 cursor-pointer', // Add cursor pointer for interactivity
                className
              )}
            >
              {tab.content}
            </div>
          )
        }

        // Otherwise, render the motion div with animation
        return (
          <motion.div
            key={tab.value}
            layoutId={tab.value}
            style={{
              scale: 1 - idx * 0.1,
              top: hovering ? idx * -50 : 0,
              zIndex: idx === currentTab ? 10 : 0, // Ensure the selected tab is on top
              opacity: idx < 3 ? 1 - idx * 0.1 : 0,
            }}
            animate={{
              y: hovering ? [0, 40, 0] : 0,
              opacity: idx === currentTab ? 1 : 0.5, // Show the current tab clearly
            }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
            className={cn(
              'w-full h-full flex justify-center absolute top-0 left-0 cursor-pointer', // Add cursor pointer for interactivity
              className
            )}
            onClick={() => switchTab(idx, tabs, setTabs, setCurrentTab)} // Switch tab on click
          >
            {tab.content}
          </motion.div>
        )
      })}
    </div>
  )
}
