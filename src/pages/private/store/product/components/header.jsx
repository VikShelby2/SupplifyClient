import { Button } from '@heroui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../../../../components/ui/basics/Icon'

const Header = ({ products, loading , title , col}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-[1.8rem] font-bold text-black">{title || 'Products'}</h1>
      </div>
      {!loading && products.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          <Button className="border-black bg-white"
                radius="sm"
                color="black"
                size={'sm'}>
                  <div className="flex items-center gap-2">
                    Export
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-[1rem]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                      />
                    </svg>
                  </div>
                </Button>
          <Button className="border-black bg-white"
                radius="sm"
                color="white"
                size={'sm'}>
                  <div className="flex items-center gap-2">
                    Import
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-[1rem]">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
</svg>

                  </div>
                </Button>
          <Link to={`/store-panel/products/add`}>
          <Button radius="sm" color="secondary" size="sm">
                  <div className="flex items-center gap-2">
                   {col ? "Add Collection" : " Add Product"}
                
                  </div>
                </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
