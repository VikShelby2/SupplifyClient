import React from 'react'
import P2card from './components/p2card'

const DashHome = () => {
  return (
    <div className="w-full h-fit gap-3 grid  justify-center  p-6">
      {/* First Row */}
      <div className="grid grid-cols-3 items-center gap-3">
        <div
          className={
            'flex items-center p-1 w-full h-[150px] bg-white  rounded-xl '
          }
        ></div>
        <div
          className={
            'flex items-center p-1 w-full h-[150px] bg-white  rounded-xl '
          }
        ></div>
        <div
          className={
            'flex items-center p-1 w-full h-[150px] bg-white  rounded-xl '
          }
        ></div>
      </div>
      <div className="flex gap-6">
        <P2WideCard className="flex-1" />
        <P2card className="flex-1" />
      </div>
    </div>
  )
}

export default DashHome
const P2WideCard = () => {
  return (
    <div className="w-[40rem] h-[20rem] bg-white rounded-xl ">
      <div className=" p-3  w-full grid gap-3">
        <div className="justify-between items-start flex w-full max-h-[20px] gap-0">
          <h1 className="text-[1.4rem] font-bold">Welcome back 👋</h1>
          <button className="p-1 shadow-input active:scale-90  rounded-[.5rem] hover:bg-slate-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-start w-full">
          <p className="text-gray-400">
            Find out what you missed in a click , check out your sales ,
            progress and new added features
          </p>
        </div>
      </div>
      <div className="flex items-end justify-end h-full max-w-[20rem] w-[20rem]  "></div>
    </div>
  )
}
