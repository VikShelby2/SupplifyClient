import React, { useState } from 'react'
import blackLogo from '../../../assets/public/home/home-logo-black.svg'
import logo from '../../../assets/public/home/home-logo-purple.svg'

import { useRecoilValue } from 'recoil'
import { storeAtom } from '../../../context/atoms/storeAtom'
import { Avatar } from '@nextui-org/react'
import { Badge, Button } from '@nextui-org/react'
import { AuroraText } from '../../ui/animations/auratext'
import { NotificationIcon, SearchIcon } from '../../ui/dashboard/icon'
import { Bell } from 'lucide-react'
import { useSidebar } from '../../ui/shadcn/sidebar'

export default function Navbar({ openMobile, backgroundColor }) {
  const store = useRecoilValue(storeAtom)

  const svgToDataUri = (svg) => {
    // Option 1: Direct SVG data URI (URL encoded)
    const encodedSvg = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')

    return `data:image/svg+xml,${encodedSvg}`
  }
  const dataUri = svgToDataUri(store.svgData)
  return (
    <div className="fixed bg-transparent top-0 min-w-[100vw] min-w-[100vw] z-[100] ">
      <nav
        className=" mt-[10px] rounded-[.75rem] mr-4 ml-1 md:ml-64 z-2000"
        style={{
          background: backgroundColor ? backgroundColor : 'fff',
          fontFamily:
            'sora ,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        }}
      >
        <div className="px-2 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start ">
              <button
                onClick={() => {
                  openMobile()
                }}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-5">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  {' '}
                  <img
                    src={backgroundColor === 'white' ? blackLogo : logo}
                    className="h-8 me-3"
                    alt="FlowBite Logo"
                  />
                </span>
              </a>
            </div>

            <div className="flex items-center">
              <div
                className="flex ml-1 items-center   p-[5px] pr-up-btn rounded-[.5rem]"
                style={{ padding: '5px' }}
              >
                <SearchIcon className={'text-violet-400'} />
              </div>
              <div
                className="hidden sm:flex ml-1 items-center p-[5px] pr-up-btn rounded-[.5rem]"
                style={{ padding: '5px' }}
              >
                <NotificationIcon className={'text-violet-400'} />
              </div>
              <div className="hidden sm:flex cursor-pointer pr-up-btn ml-1 items-center justify-center p-[5px] px-[10px] alpha rounded-[.5rem] gap ">
                <h1 className="text-[1rem] font-bold tracking-tighter ">
                  <AuroraText className={''}>{store.storeName}</AuroraText>{' '}
                  <span className="text-violet-600 ml-1">Store</span>
                </h1>
              </div>
              <div className="flex items-center ms-3">
                <div>
                  {store.image === '' ? (
                    <div className="relative w-8 h-8 bg-red-100 flex justify-center items-center rounded-lg">
                      <img src={store.image} />
                    </div>
                  ) : (
                    <div className="">
                      {store.svgData ? (
                        <Button isIconOnly radius="full">
                          {' '}
                          <Avatar
                            isBordered
                            color="secondary"
                            radius="full"
                            className="w-[30px] h-[30px]"
                            src={dataUri}
                          />
                        </Button>
                      ) : (
                        <div className="relative w-8 h-8 bg-red-100 flex justify-center items-center rounded-lg">
                          <span>MS</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
