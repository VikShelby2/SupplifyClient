import { Eye, Upload } from 'lucide-react'
import React from 'react'

const Heading = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-[1.25rem] font-semibold text-[#303030]">Theme</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="pr-up-btn">
          <div className="flex items-center gap-2 ">
            <span className="">Genearte Theme ✨</span>
          </div>
        </button>
        <button className="pr-up-btn">
          <div className="flex items-center gap-2 ">
            <span className="">Import theme</span>
            <Upload className="size-5 text-violet-500" />
          </div>
        </button>
        <button className="pr-up-btn">
          <div className="flex items-center gap-2 ">
            <span className="">View store</span>
            <Eye className="size-5 text-violet-500" />
          </div>
        </button>
      </div>
    </div>
  )
}

export default Heading
