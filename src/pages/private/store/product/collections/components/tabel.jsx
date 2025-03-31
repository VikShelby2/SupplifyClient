import React, { useState } from 'react'
import { Checkbox } from '@heroui/react'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { storeAtom } from '../../../../../../context/atoms/storeAtom'
import { cn } from '../../../../../../lib/utils'

const Table = ({
  filteredProducts,
  setIsSelected,
  isSelected,
  selectedProjects,
  setSelectedProjects,
}) => {
  const store = useRecoilValue(storeAtom)
  useEffect(() => {
    if (selectedProjects.length > 0) {
      setIsSelected(false)
    } else {
      setIsSelected(true)
    }
  }, [selectedProjects])
  const areAllSelected =
    filteredProducts.length > 0 &&
    selectedProjects.length === filteredProducts.length

  // Toggle individual project selection
  const handleProjectChange = (id) => {
    setSelectedProjects((prev) =>
      prev.includes(id)
        ? prev.filter((projectId) => projectId !== id)
        : [...prev, id]
    )
  }

  // Handle the header checkbox to select/deselect all projects
  const handleSelectAll = () => {
    if (areAllSelected) {
      setSelectedProjects([]) // Deselect all
    } else {
      setSelectedProjects(filteredProducts.map((product) => product._id)) // Select all
    }
  }
 

  const [enterTable, setEnterTable] = useState('')
 
 

  return (
    <table className="w-full table-auto   border-separate border-spacing-0   p-[1px]  text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs font-light  ">
        <tr className="text-gray-500 rounded-xl color-th shadow-table   ">
          <th scope="col" className="px-[12px] py-[8px]">
            <Checkbox
              defaultSelected
              color="secondary"
              isSelected={areAllSelected}
              size="md"
              radius="sm"
              onValueChange={handleSelectAll}
            ></Checkbox>
          </th>
          {isSelected ? (
                  <>
                  <th scope="col" className="px-[12px] py-[8px]">
                    <span>Collection</span>
                  </th>
                  <th scope="col" className="px-[12px] py-[8px]">
                    Products
                  </th>
                  <th scope="col" className="px-[12px] py-[8px]">
                    Product condition
                  </th>
                </>
          ) : (
            <>
              <th
                scope="col"
                colSpan={3}
                style={{ userSelect: 'none' }}
                className="text-[#fff] px-[12px] font-normal  py-[8px]"
              >
               
              </th>
             
            </>
          )}
        </tr>
        <tr
          tabindex="-1"
          aria-hidden="true"
          class="w-px h-px block"
          style={{ marginLeft: '0.25rem', marginTop: '0.25rem' }}
        ></tr>
      </thead>
      <tbody className=" border-collapse rounded-xl color-th crusor-poiter">
      {filteredProducts.map((product, index) => {
  const isSelected = selectedProjects.includes(product._id);
  const prevSelected = index > 0 && selectedProjects.includes(filteredProducts[index - 1]._id);
  const nextSelected = index < filteredProducts.length - 1 && selectedProjects.includes(filteredProducts[index + 1]._id);
  const isFirstSelected = isSelected && !prevSelected; // First in a contiguous selection
  const isLastSelected = isSelected && !nextSelected; // Last in a contiguous selection
  const isFirst = index === 0;
  const isLast = index === filteredProducts.length - 1;
  return (
    <>
      {isFirstSelected && !isFirst && (
      <tr
      tabindex="-1"
      aria-hidden="true"
      class="w-px h-px block"
      style={{ marginLeft: '0.25rem', marginTop: '0.25rem' }}
    ></tr>
      )}

      <tr
        onMouseEnter={() => setEnterTable(product._id)}
        onMouseLeave={() => setEnterTable('')}
        key={product._id}
        className="hover:opacity-[var(--nextui-hover-opacity)] text-[#333] cursor-pointer"
      >
        <td className={cn(
          'p-3 w-2 border-b border-l',
          
          nextSelected && !isSelected && 'rounded-bl-[.5rem] border-b',
          isFirst && 'rounded-tl-xl border border-r-0', 
          isLast && 'rounded-bl-xl',
          isSelected && 'bg-[#f2f2f2] border-b ',
          (isFirstSelected && selectedProjects.length - 1 === 0 ) && ' rounded-l-xl border-none' ,
          isFirstSelected && 'rounded-tl-xl' ,
          prevSelected  && !isSelected && 'rounded-tl-xl border-t ' ,
          isLastSelected && 'rounded-bl-xl'
        )}>
          <div className="flex items-center">
            <Checkbox
              isSelected={isSelected}
              color="secondary"
              className='outline-none focus:outline-none focus:ring-0'
              size="md"  classNames={{
                wrapper: "focus:ring-0 focus:ring-offset-0"
              }}
              radius="sm"
              onValueChange={() => handleProjectChange(product._id)}
            ></Checkbox>
          </div>
        </td>
        
        <th className={cn(
          'px-3 py-2 border-b text-[#333]', 
          isFirst && 'border-t border-r-0 '  ,
          prevSelected && !isSelected && 'border-t ',
          isSelected && 'bg-[#f2f2f2] border-b ',
          (isFirstSelected && selectedProjects.length - 1 === 0 ) && '  border-none' ,
          isFirstSelected && '' , )}>
          <div className="flex items-center mr-3  font-[550]">
            <span className={`mr-3  ${isSelected ? 'shadow-input' : 'shadow-table' } `} style={{
              width: '40px', height: '40px',
              justifyContent: 'center', borderRadius: '.5rem',
              alignItems: 'center', display: 'flex'
            }}>
              {product.photoUrls && product.photoUrls.length > 0 ? (
                <img src={product.photoUrls[0]} alt="img" className="h-8 w-auto" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              )}
            </span>
            <span className="first-letter:uppercase "> {product.name} </span>
          </div>
        </th>

        <td className={cn(
          'px-3 py-2 border-b',
           isFirst && 'border-t border-r-0',
           prevSelected && !isSelected && 'border-t ',
           isSelected && 'bg-[#f2f2f2] border-b ',
           (isFirstSelected && selectedProjects.length - 1 === 0 ) && '  border-none' ,)}>
         <span className=" text-primary-800 text-xs font-medium py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                {product.products || '0'}
              </span>
        </td>

     
        <td className={cn(
            'px-3 py-2 border-b border-r', 
            isFirst && !isSelected && 'border-t border-r rounded-tr-xl', 
            isLast && !isSelected &&'rounded-br-xl' , 
            isSelected && 'bg-[#f2f2f2] border-b ',
          (isFirstSelected && selectedProjects.length - 1 === 0 ) && ' rounded-r-xl border-none' ,
          isFirstSelected && 'rounded-tr-xl' ,
          isLastSelected && 'rounded-br-xl' ,
            prevSelected && !isSelected && 'border-t rounded-tr-xl ' ,

            nextSelected && !isSelected &&'rounded-br-xl border-b',)}>
           {product.condition || 'Unset'}
        </td>
      </tr> 

      {isLastSelected && (
       <tr
       tabindex="-1"
       aria-hidden="true"
       class="w-px h-px block"
       style={{ marginLeft: '0.25rem', marginTop: '0.25rem' }}
     ></tr>
      )}
    </>
  );
})}


      </tbody>
    </table>
  )
}
export default Table
