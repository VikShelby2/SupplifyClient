import React from 'react'
import { Checkbox, CheckboxGroup, User, cn } from '@nextui-org/react'

const Crads = ({
  base,
  conent,
  noAvatar = false,
  grid = 'grid-cols-2', // Change default grid to 2 columns
  items,
}) => {
  const [groupSelected, setGroupSelected] = React.useState([])

  return (
    <div className={cn('w-full items-center grid gap-4', grid, base)}>
      {items.map((item) => (
        <CheckboxGroup
          classNames={{
            base: 'w-full flex items-center',
            wrapper: 'w-full',
          }}
          value={groupSelected}
          onChange={setGroupSelected}
        >
          <CustomCheckbox item={item} noAvatar={noAvatar} value={item.name} />
        </CheckboxGroup>
      ))}
    </div>
  )
}

export default Crads

export const CustomCheckbox = ({ item, value, noAvatar }) => {
  return (
    <Checkbox
      classNames={{
        base: cn(
          'inline-flex max-w-md w-full group group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:  bg-content1 m-0',
          'bg-content2 items-center justify-start',
          'cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent', // Reduced padding and border size
          'data-[selected=true]:border-primary'
        ),
        label: 'w-full',
        wrapper: 'group-data-[focus-visible=true]:ring-0 border-0',
      }}
      value={value}
    >
      {!noAvatar && (
        <div className="w-full items-center ">
          <div className="grid gap-0 w-full py-2 pr-2 text-[#303030]">
            <h1 className="text-small leading-tight">{item.name}</h1>
            <p
              style={{ fontWeight: '500' }}
              className="text-tiny   leading-tight"
            >
              {item.desc}
            </p>
          </div>
        </div>
      )}
      {noAvatar && (
        <div className="w-full items-center ">
          <div className="grid gap-0 w-full py-2 pr-2 text-[#303030]">
            <h1 className="text-small leading-tight">{item.name}</h1>
            <p
              style={{ fontWeight: '500' }}
              className="text-tiny   leading-tight"
            >
              {item.desc}
            </p>
          </div>
        </div>
      )}
    </Checkbox>
  )
}
