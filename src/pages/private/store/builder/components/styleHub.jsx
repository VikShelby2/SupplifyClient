import React from 'react'
import wireframe from '../../../../../assets/private/store/products/wireframe2.png'
import { Settings, Settings2 } from 'lucide-react'
import { MdSettings } from 'react-icons/md'
import { IconSettings } from '@tabler/icons-react'
const StyleHub = () => {
  return (
    <div className="w-full flex items-center flex-col  p-0 rounded-xl bg-white">
      <div className="grid w-full items-center custom-tr p-5 ">
        <h2 style={{ fontWeight: '550' }}>Styling Hub</h2>
        <p className="text-gray-500 leading-tight">
          Styling hub is the collection of your themes , there only visible to
          you
        </p>
      </div>

      <div className="w-full grid p-5 ">
        <div className="flex w-full items-cener justify-between">
          <div className="flex items-center gap-2 ">
            <img src={wireframe} className="w-[100px] max-w-[150px]" />
            <div className="grid items-cetnter">
              <h3
                className="text-[.85rem] leading-tight"
                style={{ fontWeight: '550' }}
              >
                Classic Theme
              </h3>
              <span className="text-gray-500 text-[.85rem] leading-tight">
                Added: Today
              </span>
              <span className="text-gray-500 text-[.85rem] leading-tight">
                Status:{' '}
                <span className="text-[.85rem] leading-tight text-green-400">
                  Active
                </span>{' '}
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button className="pr-up-btn">
              <IconSettings className="" />
            </button>
            <button className="pr-up-btn">
              <span className="text-[.85rem] text-violet-500">Publish</span>
            </button>
            <button className="pr-up-btn">
              <span className="text-[.85rem] ">Costumize</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StyleHub
