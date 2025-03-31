import React, { useEffect, useState } from 'react'
import FormCard from '../../../../../../components/ui/basics/form-card'
import FormLabel from './label-form'
import {
  Tooltip,
  Checkbox,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { Input } from '../../../../../public/Home/components/input'
import { useEditor } from '@tiptap/react'

const ShippingForm = () => {
  const [checked, setChecked] = useState(false)
  const [weightUnit, setWeightUnit] = useState(new Set(['kg']))
  const [shopLocations, setShopLocations] = useState(0)
  const weights = [
    { label: 'kg' },
    { label: 'oz' },
    { label: 'lb' },
    { label: 'g' },
  ]
  const incrementLocations = () => setShopLocations((prev) => prev + 1)
  const decrementLocations = () =>
    setShopLocations((prev) => (prev > 0 ? prev - 1 : 0)) // Prevent going below 0
  useEffect(() => {
    console.log(weightUnit)
  }, [weightUnit])
  return (
    <FormCard
      cardStyle={'bg-white shadow-input rounded-[.75rem] gap-2'}
      contentStyle={'mt-[1.3rem] gap-2'}
      footerStyle={'border-t pt-4'}
      cardFooter={
        !checked && (
          <div className="w-full flex items-center justify-start text-gray-500 text-[.8rem]">
            <h1>
              Customers won’t enter shipping details at checkout. Learn how to
              set up your store for digital products or services.
            </h1>
          </div>
        )
      }
    >
      <div className="w-full flex items-center justify-between mb-4">
        <FormLabel className="text-black">Shipping</FormLabel>
      </div>
      <div className="w-full flex items-center flex-col">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center justify-start mb-2">
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              radius="sm"
              color="secondary"
            />
            <label
              htmlFor="default-checkbox"
              className="text-sm font-medium text-black"
            >
              This is a physical product
            </label>
          </div>
        </div>
      </div>

      {checked && (
        <div className="w-full flex flex-col gap-4 mt-3">
          <div className="w-full grid grid-cols-2 gap-8 items-center">
            <div className="flex flex-col">
              <FormLabel className="text-black">Weight</FormLabel>
              <div className="flex gap-2">
                <div className="relative">
                  <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <span className="text-sm text-[#616161]">{weightUnit}</span>
                  </div>
                  <Input variant="priceWhite" className="flex-1" />
                </div>

                <Select
                  className="w-24 text-sm"
                  variant="bordered"
                  selectedKeys={weightUnit}
                  onSelectionChange={setWeightUnit}
                >
                  {weights.map((item, index) => (
                    <SelectItem key={item.label}>{item.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex flex-col">
              <FormLabel className="text-black">Shop Locations</FormLabel>
              <div className="flex  gap-2 ">
                <Input
                  type="number"
                  variant="primaryWhite"
                  value={shopLocations}
                  readOnly
                  className=" flex-1"
                />

                <div
                  class="py-2 px-3 inline-block  border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
                  data-hs-input-number=""
                >
                  <div class="flex items-center gap-x-1.5">
                    <button
                      onClick={decrementLocations}
                      disabled={shopLocations === 0}
                      type="button"
                      class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200  text-black shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                      data-hs-input-number-decrement=""
                    >
                      <svg
                        class="flex-shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                      </svg>
                    </button>

                    <button
                      onClick={incrementLocations}
                      type="button"
                      class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200  text-black shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                      data-hs-input-number-increment=""
                    >
                      <svg
                        class="flex-shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </FormCard>
  )
}

export default ShippingForm
