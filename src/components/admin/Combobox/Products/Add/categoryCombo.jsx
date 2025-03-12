import { useEffect, useState } from 'react'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { Minus  , MoveRight } from 'lucide-react';
import { useRecoilValue } from 'recoil'
import userAtom from '../../../../../context/atoms/userAtom'
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { handleAddTag } from '../../../../../api/store/products'
import { Label } from '@headlessui/react'
import { useSelect } from '@nextui-org/react';
import { useSelector } from 'react-redux';

export default function CategoryCombobox({ option, placeholder, selected, setSelected , tags , setTags , styles  , Wrapper , noLabel   }) {
  const [query, setQuery] = useState('')
  const [hoveredPerson, setHoveredPerson] = useState(null)
  
 const {user} = useSelector((state)=>state.user)
 const userId = user._id
console.log(option)
 console.log(user)
  const filteredPeople = query === ''
    ? option || [] // Ensure option is defined, default to an empty array if not
    : (option || []).filter((option) => {
        return option.name.toLowerCase().includes(query)
      })
   
  const handleMouseEnter = (person) => {
    setHoveredPerson(person.id)
  }

  const handleMouseLeave = () => {
    setHoveredPerson(null)
  }

  const handleChange = (value) => {
    setSelected(value)
    setQuery(value ? value.name : '')
  
  }

  const radius = 100; // change this to increase the radius of the hover effect
  const [visible, setVisible] = useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Combobox value={selected} onChange={handleChange}>
  
      <div className={`relative ${Wrapper}`} style={{

justifyContent:'center' ,
alignItems:'center' ,
gap: '5px' ,


     }}>
      {!noLabel && (<Label className="text-black" >Categories</Label>)}
    
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? `${radius}px` : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <ComboboxButton className="w-full">
          <ComboboxInput
            className={`
            bg-gray-50
w-full h-[38px] border  text-black text-sm rounded-lg 
focus:outline-none focus:ring-2 focus:ring-[#8a50fe] focus:ring-offset-2 focus:border-black 
block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 :placeholder-gray-400 dark:text-white 
dark:focus:ring-black dark:focus:border-black 
group-hover/input:shadow-none transition duration-400 ${styles}
            `}
            value={query}
            displayValue={(option) => option?.name || ''}
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ComboboxButton>
      </motion.div>
    </div>
      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        
      >
        <ComboboxOptions
          anchor="bottom"
          className="w-[var(--input-width)] rounded-xl border border-black/5 bg-white p-1 mt-[.5rem] max-h-[300px] empty:hidden"
        >
          {}  
          {filteredPeople.length > 0 ? (
            filteredPeople.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className="group hover:bg-gray-100 flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none"
              >
                <div
                  className="flex items-center justify-between w-full"
                  onMouseEnter={() => handleMouseEnter(option)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="text-sm text-black">{option.name}</div>
                  <div>
                    {hoveredPerson === option.id ? <MoveRight  style={{ width: '2rem' }} /> : <Minus />}
                  </div>
                </div>
              </ComboboxOption>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-700">No results found</div>
          )}
          { placeholder ==='Tags' && query && !filteredPeople.some(option => option.name.toLowerCase() === query.toLowerCase()) && (
            <div
              onClick={()=>{handleAddTag(userId , query , setSelected  ,setQuery , setTags)}}
              className="cursor-pointer px-3 py-2 text-blue-500 hover:bg-gray-100 rounded-lg"
            >
              Add "{query}" as a new tag  
            </div>
          )}
        </ComboboxOptions>
      </Transition>
    </Combobox>
  )
}

