import React, { useState } from 'react'
import CollectionCombobox from '../../../../../../components/admin/Combobox/Products/Add/collectionCombo'
import { Label } from '../../../../../public/Home/components/label'
import { Input } from '../../../../../public/Home/components/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../../components/ui/card'
import { productCategories } from '../../../../../../data/constants'
import TagsCombobox from '../../../../../../components/admin/Combobox/Products/Add/tagsCombo'
import CategoryCombobox from '../../../../../../components/admin/Combobox/Products/Add/categoryCombo'
import FormLabel from './label-form'

export default function ProductOrganizationForm({
  input,
  selected,
  setSelected,
  selectedCollection,
  setSelectedCollection,
  selectedTag,
  handleChange,
  setSelectedTag,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  return (
    <Card
      className="overflow-hidden bg-white shadow-input rounded-[.75rem]"
      x-chunk="dashboard-07-chunk-4"
    >
      <CardContent className="px-[12px] mt-[1.3rem]">
        <div className=" gap-2">
          <FormLabel className="text-black mb-2">
            Product Organization
          </FormLabel>
          <ul className="grid gap-2">
            <li className="">
              <div class="relative h-10 w-full min-w-[200px]">
                <CategoryCombobox
                  selected={selected}
                  setSelected={setSelected}
                  option={productCategories}
                />
              </div>
            </li>
            <li className="pt-[.8rem]">
              <div class="relative h-10 w-full min-w-[200px]">
                <div
                  className="relative text-white"
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '1rem',
                  }}
                >
                  {' '}
                  <Label className="text-black">Type</Label>
                  <button className="w-full">
                    <Input
                      name="type"
                      value={input.type}
                      onChange={handleChange}
                      type="text"
                      id="small-input"
                      variant="primaryWhite"
                    />
                  </button>
                </div>
              </div>
            </li>
            <li className="pt-[.8rem]">
              <div class="relative h-10 w-full min-w-[200px]">
                <div
                  className="relative"
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '1rem',
                  }}
                >
                  <Label className="text-black">Vendor</Label>
                  <button className="w-full">
                    <Input
                      name="vendor"
                      value={input.vendor}
                      onChange={handleChange}
                      type="text"
                      id="small-input"
                      variant="primaryWhite"
                    />
                  </button>
                </div>
              </div>
            </li>
            <li className="pt-[.8rem]">
              <div class="relative h-10 w-full min-w-[200px]">
                <CollectionCombobox
                  selectedOptions={selectedCollection}
                  setSelectedOptions={setSelectedCollection}
                />
              </div>
            </li>

            {selectedCollection.length > 0 &&
              selectedCollection.map((option) => (
                <li className="pt-[.8rem]">
                  <div className="mt-2 p-[2px] pb-0 flex flex-wrap gap-2">
                    <div
                      key={option.id}
                      className="bg-gray-100 px-2 py-1 rounded-lg flex items-center"
                    >
                      <span className="text-sm text-gray-800">
                        {option.name}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedCollection(
                            selectedCollection.filter(
                              (selected) => selected.id !== option.id
                            )
                          )
                        }}
                        className="ml-1 text-gray-500 hover:text-[#8C52f1] focus:outline-none"
                      >
                        &times;
                      </button>
                    </div>{' '}
                  </div>
                </li>
              ))}

            <li
              className={`${selectedCollection.length > 0 ? 'pt-0' : 'pt-[.8rem]'}`}
            >
              <div class="relative h-10 w-full min-w-[200px]">
                <TagsCombobox
                  isDropdownOpen={isDropdownOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                  selectedOptions={selectedTag}
                  setSelectedOptions={setSelectedTag}
                />
              </div>
            </li>
            <li className="pt-[.3rem] ">
              <div className="mt-2 p-[2px] flex flex-wrap gap-2">
                {selectedTag.length > 0 &&
                  selectedTag.map((option) => (
                    <li className="">
                      <div className="mt-2 p-[2px] pb-0 flex flex-wrap gap-2">
                        <div
                          key={option.id}
                          className="bg-gray-100 px-2 py-1 rounded-lg flex items-center"
                        >
                          <span className="text-sm text-gray-800">
                            {option.name}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedTag(
                                selectedTag.filter(
                                  (selected) => selected.id !== option.id
                                )
                              )
                            }}
                            className="ml-1 text-gray-500 hover:text-[#8c52f1] focus:outline-none"
                          >
                            &times;
                          </button>
                        </div>{' '}
                      </div>
                    </li>
                  ))}
              </div>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
