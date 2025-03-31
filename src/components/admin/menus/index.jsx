import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@nextui-org/dropdown'
import { cn } from '../../../lib/utils'

const ProductsTabMenu = ({ trigger, toggleEdit, tab }) => {
  return (
    <Dropdown
      disableAnimation
      classNames={{
        content:
          'p-0 border-none border-divider bg-background w-auto    min-w-[8rem]',
      }}
      placement="bottom-start"
      key={tab._id}
    >
      <DropdownTrigger>{trigger}</DropdownTrigger>

      <DropdownMenu>
        <DropdownItem
          onClick={() => {
            toggleEdit(tab.name)
          }}
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          }
          key="action1"
        >
          Rename View
        </DropdownItem>
        <DropdownItem
          color="secondary"
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          }
          key="action2"
        >
          Dublicate View
        </DropdownItem>
        <DropdownItem
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          }
          color="danger"
          key="action4"
        >
          Delete View
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
const ProductsTableMenu = ({
  setHovered,
  handleCount,
  item,
  enterTable,
  product,
  hovered,
}) => {
  return (
    <Dropdown
      placement="bottom-start"
      triggerScaleOnOpen={false}
      classNames={{
        content:
          'p-0 border-none border-divider bg-background w-auto   min-w-[13rem]',
      }}
    >
      <DropdownTrigger>
        <div
          className={`flex items-center gap-2 group hover:bg-[#f4f4f4]  p-2   rounded-[.75rem] max-w-[4rem]`}
        >
          <span className="ml-2">{handleCount(product)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={cn(
              'size-6 hidden text-violet-500',
              enterTable === product._id ? 'flex' : 'group-hover:flex'
            )}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        itemClasses={{
          base: 'data-[hover=true]:bg-transparent p-2 m-0',
        }}
      >
        <DropdownItem
          startContent={
            <div className="flex items-center gap-1 ">
              {
                //  index < hovered ? `${(index - hovered) * 1.2}rem` : "0rem", //
                item.map((items, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      marginLeft:
                        index === 0
                          ? '0rem' // No margin for the first item
                          : hovered === null
                            ? `${index * 1.2}rem` // Apply normal margin for non-hovered state
                            : index === hovered
                              ? `${index * 1.2}rem` // Increase margin for hovered item
                              : `${index * 4.7}rem`, // Apply increased margin to other items when hovered
                    }}
                    className={`z-50 ${index === 0 ? 'absolute' : ''}   bg-white flex items-center p-1 shadow-input gap-1 justify-center rounded-[.5rem] transition-all duration-300 `}
                  >
                    {items.icon}
                    {hovered === index && (
                      <div className={`   text-black`}>
                        <span>{items.name}</span>
                      </div>
                    )}
                  </div>
                ))
              }
            </div>
          }
        ></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
const ProductsFilterMenu = ({}) => {
  return (
    <Dropdown
      classNames={{
        content:
          'p-0 border-none border-divider bg-background w-auto    min-w-[8rem]',
      }}
    >
      <DropdownTrigger>
        <div className="p-1 cursor-pointer  border-dotted rounded-md flex items-center justify-between gap-2 px-2 border-2 text-[.75rem]">
          Add filter{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-black hover:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        bottomContent={
          <div className="px-2 cursor-pointer hover:text-violet-400 py-2 border-t border-default-300">
            Clear
          </div>
        }
        classNames={{
          base: 'p-0', // Remove padding from the base dropdown
          content: 'p-0', // Remove padding from the content
        }}
        aria-label="Static Actions"
        variant="faded"
      >
        <DropdownSection className="p-1">
          <DropdownItem className="text-[.75rem] " key="new">
            Sales Channel
          </DropdownItem>
          <DropdownItem key="copy">Market</DropdownItem>
          <DropdownItem key="dfsd">Product Type</DropdownItem>
          <DropdownItem key="edsdfsit">Collection</DropdownItem>
          <DropdownItem key="edfsdfsdit">Gift Card</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
const InventoryDropown = ({
  enterTable ,
  productId
}) => {
  return (
    <Dropdown
    placement="bottom-start"
    triggerScaleOnOpen={false}
    classNames={{
      content:
        'p-0 border-none border-divider bg-background w-auto   min-w-[13rem]',
    }}
  >
    <DropdownTrigger>
      <div
        className={`flex items-center gap-2 group hover:bg-[#f4f4f4]  p-2   rounded-[.75rem] max-w-[4rem]`}
      >
        <span className="ml-2">0</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className={cn(
            'size-6 hidden text-violet-500',
            enterTable === productId ? 'flex' : 'group-hover:flex'
          )}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </DropdownTrigger>
    <DropdownMenu
      closeOnSelect={false}
      itemClasses={{
        base: 'data-[hover=true]:bg-transparent p-2 m-0',
      }}
    >
      <DropdownItem></DropdownItem>
    </DropdownMenu>
  </Dropdown>
  )
}
export { ProductsTabMenu, ProductsTableMenu,InventoryDropown , ProductsFilterMenu }
