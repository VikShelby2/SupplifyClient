
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition  } from '@headlessui/react';
import { Checkbox } from '@nextui-org/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../../../../../context/atoms/userAtom';
import { handleAddCollection, handleListCollections} from '../../../../../api/store/products';
import { storeAtom } from '../../../../../context/atoms/storeAtom';
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { Label } from '@headlessui/react';
import { Link } from 'react-router-dom';

export default function CollectionCombobox({ placeholder  ,   selectedOptions , setSelectedOptions}) {
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');
 const store = useRecoilValue(storeAtom)

  useEffect(() => {
    if (store?._id) {
      handleListCollections(store._id, setOptions);
    }
  }, [store]);

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
    if (value === '') {
      setSelectedOptions([]);
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
    <Combobox multiple>
       <div className="relative"
       style={{

justifyContent:'center' ,
alignItems:'center' ,
gap: '5px' ,
marginTop: '1rem'

     }}>
       <Label className="text-black" >Collection</Label>
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
            `}
            value={query}
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
      >
        <ComboboxOptions
          anchor="bottom"
          className="w-[var(--input-width)] rounded-xl border border-black/5 bg-white p-1 mt-[.5rem] max-h-[300px] empty:hidden"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                onClick={()=>{isSelected(option)}}
                className="group hover:bg-gray-100 flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none"
              >
                <label className="flex items-center justify-between w-full">
                 <span className="text-sm text-black">{option.name}</span>
                   <Checkbox
                   id="default-checkbox"
                   onChange={(e) => handleCheckboxChange(option, e)}
                   color='secondary'
                   radius='small'
                   ></Checkbox>
                 </label>
              </ComboboxOption>
            ))
          ) : (
            <div 
              className="grid  text-sm text-black items-center justify-center"
            >
            <span style={{textAlign: 'center'}}>No collection matching</span>
            <Link><span className='text-blue-700 hover-underline-animation-link'>Create new collections here</span></Link>
            </div>
          )}
        </ComboboxOptions>
      </Transition>
      
    </Combobox>
  );
}
