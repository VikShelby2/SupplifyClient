import React from 'react'
import Aurora from '../../components/ui/animations/auraBackground'

export default function AuthLayout({
  children,
  classNames,
  animationTime = '5s',
}) {
  let style = {
    minHeight: '100vh',
  }

  return (
    <div
      className="relative bg-black overflow-hidden max-h-screen"
      style={style}
    >
      <Aurora
        colorStops={['#a51aff', '#a51aff', '#a51aff']}
        blend={0.2}
        amplitude={4.0}
        speed={0.7}
      />
      <div className="absolute z-10 inset-0 h-screen max-h-screen w-full flex items-center justify-center ">
        <div
          className={`max-w-md max-h-[800px] relative z-10   w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ${classNames} `}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
