import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { CiStar } from 'react-icons/ci'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { cn } from '../../../lib/utils'

export default function Dropdown({ trigger, items = [], className }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'bg-white w-[250px] p-4 grid gap-3 shadow-input',
          className
        )}
      >
        {items.map((item, index) => (
          <>
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              className={cn(' w-full py-0')}
            >
              {item.type === 'sales' && (
                <>
                  <div className="flex w-full items-center gap-2 justify-start">
                    {item.label === 'Online Store ' ||
                      ('Albanian' && <FaStar fill="yellow" />)}
                    {item.label !== 'Online Store' ||
                      ('Albanian' && <CiStar />)}
                    {item.label}
                  </div>
                </>
              )}
            </DropdownMenuItem>
            {items.length - 1 !== index && <DropdownMenuSeparator />}
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
