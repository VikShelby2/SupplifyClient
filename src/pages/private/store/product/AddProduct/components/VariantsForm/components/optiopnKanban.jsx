import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { Trash2 } from 'lucide-react';
import { PlusCircle } from "lucide-react";

import { RxDragHandleDots2 } from "react-icons/rx";
import {Button} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import { Input } from "../../../../../../../public/Home/components/input";

const ItemType = "OPTION_VALUE";

const DraggableOptionValue = ({ optionValue, isLast , index, moveOptionValue, handleOptionValueChange, deleteOptionValue }) => {
  const [isDropped, setIsDropped] = useState(false);
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemType,
    drop: () => {
      setIsDropped(true); // Set dropped state to true
    },  
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveOptionValue(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className="">

     <div ref={drag} className={`flex items-center py-2   ${isDragging ? 'cursor-grabbing' : ''}
`}> 
      <Input
        type="text"
        variant="primaryWhite"
        name="optionValue"
        
        outerBg={`${isOver && canDrop ? 'white' : ''}`}
        value={optionValue.name}
        outerStyle={` ${isOver && canDrop ? ' rounded-sm bg-gray-100 w-full h-[38px]'   : 'w-full'}`}
        id="dnd-op-v"
        placeholder="Black , Red , Large , Small"
        onChange={(e) => handleOptionValueChange(index, e)}
        required
      />
      <Button
        isIconOnly
        radius="full"
        variant="light"
        className="ml-2 text-black"
    
      >
        <RxDragHandleDots2 className="w-6 h-6" />
      </Button>
      <Button
        variant="light"
        isIconOnly
        radius="full"
        onClick={() => deleteOptionValue(index)}
        className="ml-2 text-red-600 hover:text-red-800"
      >
        <Trash2 />
      </Button>
    </div> 
    </div>
    
  );
};

const OptionValuesList = ({ variantIndex, optionValues, handleOptionValueChange, addOptionValue, moveOptionValue, deleteOptionValue }) => {
  return (
    <div className="mt-2">
    {optionValues.length > 0 && (<label className="block mb-2 text-sm font-medium text-black">{optionValues.length > 0  ? 'Option Values' : ''}</label>)}
      
      {optionValues.map((optionValue, index) => (
        <DraggableOptionValue
          key={index}
          index={index}
          isLast={index === optionValues.length - 1}
          optionValue={optionValue}
          moveOptionValue={(fromIndex, toIndex) => moveOptionValue(variantIndex, fromIndex, toIndex)}
          handleOptionValueChange={(optionIndex, e) => handleOptionValueChange(variantIndex, optionIndex, e)}
          deleteOptionValue={(optionIndex) => deleteOptionValue(variantIndex, optionIndex)}
        />
      ))}
      <button
        onClick={() => addOptionValue(variantIndex)}
        className="text-xs pl-2 text-[#8c52fe] flex items-center gap-1 mt-2"
      >
        <PlusCircle className="h-3.5 w-3.5" />
        Add Option Value
      </button>
    </div>
  );
};

const DraggableInput = ({
  variant,
  index,
  handleInputChange,
  handleOptionValueChange,
  addOptionValue,
  moveOptionValue,
  deleteVariant,
  addVariantToArray,
  deleteOptionValue
}) => {
  return (
    <div className="h-auto border-b p-2 mb-2">
      <div className="grid grid-cols-1 py-2 gap-4 px-4">
        <div className="flex items-center justify-content">
          <form className="w-full">
            <label
              htmlFor={`optionName-${index}`}
              className="block mb-2 text-sm font-medium text-black"
            >
              Option Name
            </label>
            <div className="relative">
              <Input
                type="text"
                id={`optionName-${index}`}
                variant="primaryWhite"
                name="optionName"
                value={variant.optionName}
                onChange={(e) => handleInputChange(index, e)}
                outerStyle="w-full"
                placeholder="Sizes  , Color , Material "
                required
              />
            </div>
          </form>
        </div>
        <OptionValuesList
          variantIndex={index}
          optionValues={variant.optionValues}
          handleOptionValueChange={handleOptionValueChange}
          addOptionValue={addOptionValue}
          moveOptionValue={moveOptionValue}
          deleteOptionValue={deleteOptionValue}
        />
        <div className="w-full text-xs flex px-[2px] mb-[1.3rem] items-center justify-between">
          <button onClick={() => deleteVariant(index)} className="ovl-pr-btn">
            Delete
          </button>
          <button
            onClick={() => addVariantToArray(index)}
            className="-btn-op-ad text-white bg-[#1a1a1a] border border-solid border-red hover:bg-black active:bg-black font-bold  text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
const DraggableVariant = ({ variant, index, moveVariant , editVariant , deleteOptionValue}) => {
  const [, drag] = useDrag({
    type: "VARIANT",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "VARIANT",
    hover(item) {
      if (!dragRef.current || index === item.index) {
        return;
      }
      moveVariant(item.index, index);
      item.index = index;
    },
  });

  const dragRef = React.useRef(null);
  drag(drop(dragRef));

  return (
    <div ref={dragRef} className="">
    <div className="w-full px-2 flex items-center " style={{justifyContent:'space-between'}}>
     <h4 className="font-medium text-xl text-black" style={{fontWeight:'650'}}>{variant.optionName}</h4>
       <button className="pr-up-btn" onClick={() => editVariant(index)}><span className="text-sm" style={{fontWeight:'650'}} >Edit</span></button>
    </div>
    <div className="w-full px-2 flex mt-1 justify-start items-start gap-2"> 
      
        {variant.optionValues.map((optionValue, idx) => (
        <Chip key={idx}  variant="bordered" 
    classNames={{
        base: "bg-white",
        content: "drop-shadow shadow-black text-black",
      }}
    >
  {optionValue.name}
</Chip>
        ))}
    
     </div> 
    </div>
  );
};

const AddedVariantsList = ({ addedVariants, setAddedVariants, editVariant , deleteOptionValue }) => {
  const moveVariant = (fromIndex, toIndex) => {
    const newVariants = [...addedVariants];
    const [movedVariant] = newVariants.splice(fromIndex, 1);
    newVariants.splice(toIndex, 0, movedVariant);
    setAddedVariants(newVariants);
  };

 

  return (
    <div className="mt-4 ">
      {addedVariants.map((variant, index) => (
        <div key={index} className="border p-2 mb-2 rounded-[.5rem] shadow-sm">
          <DraggableVariant
            index={index}
            variant={variant}
            moveVariant={moveVariant}
            editVariant={editVariant}
            deleteOptionValue={deleteOptionValue}
          />
          
        </div>
      ))}
    </div>
  );

};

const OptionKanban = ({variants , setVariants , addedVariants , setAddedVariants}) => {
  

  const addVariant = () => {
    setVariants([...variants, { optionName: "", optionValues: [{ name: ""  ,photo: null, price: '', compareAt: '', sku: '', barcode: '' , quantity: 0 , country: '' , location: '' , weight: '' , sellStock: false  }] }]);
  };

  const handleInputChange = (index, event) => {
    const newVariants = [...variants];
    newVariants[index][event.target.name] = event.target.value;
    setVariants(newVariants);
  };

  const handleOptionValueChange = (variantIndex, optionIndex, event) => {
    const newVariants = [...variants];
    newVariants[variantIndex].optionValues[optionIndex].name = event.target.value;
    setVariants(newVariants);
  };
  const deleteOptionValue = (variantIndex, optionIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].optionValues = newVariants[variantIndex].optionValues.filter((_, i) => i !== optionIndex);
    setVariants(newVariants);
  };
  const addOptionValue = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].optionValues.push({ name: "" });
    setVariants(newVariants);
  };

  const moveOptionValue = (variantIndex, fromIndex, toIndex) => {
    const newVariants = [...variants];
    const [movedOptionValue] = newVariants[variantIndex].optionValues.splice(fromIndex, 1);
    newVariants[variantIndex].optionValues.splice(toIndex, 0, movedOptionValue);
    setVariants(newVariants);
  };

  const deleteVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const addVariantToArray = (index) => {
    const variantToAdd = variants[index];
    setAddedVariants((prevAddedVariants) => [...prevAddedVariants, variantToAdd]);
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const editVariant = (index) => {
    const variantToEdit = addedVariants[index];
    setVariants([...variants, variantToEdit]);
    setAddedVariants(addedVariants.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full px-3  pb-2">
      <div className={`${variants.length > 0 ? "h-auto  shadow-input mb-[1rem] p-[20px] mt-[.75rem] rounded-[.5rem]" : ''}`} >
        {variants.map((variant, index) => (
          <DraggableInput
            key={index}
            index={index}
            variant={variant}
            handleInputChange={handleInputChange}
            handleOptionValueChange={handleOptionValueChange}
            addOptionValue={addOptionValue}
            moveOptionValue={moveOptionValue}
            deleteVariant={deleteVariant}
            addVariantToArray={addVariantToArray}
            deleteOptionValue={deleteOptionValue}
          />
        ))}
        <div className="justify-center flex items-center px-2 py-2">
          <button onClick={addVariant} className="flex items-center w-full justify-center gap-1 text-md text-[#fff]" style={{ fontWeight: '650' }}>
            <PlusCircle className="h-5 w-5 text-black fill-white" />
           <span className="mr-3 text-black" > Add Variant</span>
          </button>
        </div>
        <AddedVariantsList addedVariants={addedVariants} setAddedVariants={setAddedVariants} editVariant={editVariant} deleteOptionValue={deleteOptionValue}/>
      </div>
    </div>
  );
};

export default OptionKanban;
