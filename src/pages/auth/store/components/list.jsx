import React from 'react'
export default function ListStore({ className, title, svg, col, edit }) {
  return (
    <div
      className={`${
        className || ''
      } flex items-center  p-4 pr-6 bg-transparent  rounded-[.5rem] group  transition duration-200 shadow-input gap-3  hover:backdrop-blur relative`}
    >
      {svg}
      <div className="flex-1 group-hover:translate-x-2 transition duration-200">
        <h6 className=" font-semibold text-base">{title}</h6>
      </div>
      {edit ? (
        <button className="absolute right-4 h-5 w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 text-n-13 opacity-0 group-hover:opacity-100 transition duration-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      ) : (
        <svg
          className={`absolute right-4 h-5 w-5 text-n-13 opacity-0 group-hover:opacity-100 transition duration-200 ${col}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  )
}
