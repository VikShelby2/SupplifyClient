import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';

import { Checkbox } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { Label } from '../../../../../pages/public/Home/components/label';
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { handleAddTag, handleListTags } from '../../../../../api/store/products';

import { useSelector } from 'react-redux';
export default function TagsCombobox({ placeholder, autoStyle, selectedOptions, setSelectedOptions, styles, noLabel  , isDropdownOpen , setIsDropdownOpen , AddTagOpt = false}) {
  const [options, setOptions] = useState([]);
  const {user} = useSelector((state)=>state.user)

  const [query, setQuery] = useState('');
  const effectiveAdd = AddTagOpt !== false;

  useEffect(() => {
    if (user?._id) {
      handleListTags(user._id, setOptions);
    }
  }, [user]);



  const filteredOptions = query === ''
    ? options || []
    : (options || []).filter((option) => {
      return option.name.toLowerCase().includes(query.toLowerCase());
    });

  const handleCheckboxChange = (option, e) => {
    if (isSelected(option)) {
      setSelectedOptions(selectedOptions.filter((selected) => selected.id !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isSelected = (option) => {
    return selectedOptions.some((selected) => selected.id === option.id);
  };

  const handleInputChange = (value) => {
    setQuery(value);
  };

  const handleAddNewTag = () => {
    if (query.trim() !== '') {
      handleAddTag(user._id, query, options, setOptions);
    }
  };

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
    <Combobox multiple >
      <div className={`relative mt-[1rem] ${autoStyle}`} style={{ justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
        {!noLabel && (<Label className="text-black">Tags</Label>)}
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
group-hover/input:shadow-none transition duration-400
                ${styles}
              `}
              value={query}
              onClick={(e) => e.stopPropagation()}
              placeholder={placeholder}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </ComboboxButton>
        </motion.div>
      </div>
      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        style={{ zIndex: '10000000000000000000000000000000' }}
       
      >
        <ComboboxOptions
          anchor="bottom"
          style={{ zIndex: '10000000000000000000000000000000' }}
          className="w-[var(--input-width)] relative z-10000000000 rounded-xl border border-black/5 bg-white p-1 mt-[.5rem] max-h-[300px] empty:hidden"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                style={{ zIndex: '10000000000000000000000000000000' }}
                className="group relative z-10000000000000000 hover:bg-gray-100 flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none"
              >
                <label className="flex items-center justify-between w-full">
                  <span className="text-sm text-black">{option.name}</span>
                  <Checkbox
                    id="default-checkbox"
                    isSelected={isSelected(option)}
                    onChange={(e) => handleCheckboxChange(option, e)}
                    radius='small'
                    color="secondary"
                  >
                  </Checkbox>
                </label>
              </ComboboxOption>
            ))
          ) : effectiveAdd === true ? (
            <>
            <div
           
              className="cursor-pointer text-sm px-3 py-2 text-black hover:bg-gray-100 rounded-lg"
            >
              Tag "{query}" does not exist
            </div>
          </>)  : (
            <div
              onClick={handleAddNewTag}
              className="cursor-pointer text-sm px-3 py-2 text-black hover:bg-gray-100 rounded-lg"
            >
              Add "{query}" as a new tag
            </div>
          )}
        </ComboboxOptions>
      </Transition>
    </Combobox>
  );
}
