// src/components/Element.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function Element({ element, selectedElementId, onSelect }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver, // Use isOver for potential drop indicator
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    // Add some visual feedback when dragging over
    // backgroundColor: isOver ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
  };

  // Use the element type as the HTML tag
  const Tag = element.type || 'div'; // Default to div if type is missing

  const isSelected = selectedElementId === element.id;
  // Use a transparent border when not selected to prevent layout shifts
  const selectionClass = isSelected ? 'border-2 border-blue-500' : 'border border-transparent';

  // Determine if the element can contain children (is a container)
  const isContainer = Array.isArray(element.children);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group p-1 my-1 rounded
        ${selectionClass}
        ${element.props?.className || ''}
        ${isDragging ? 'z-10' : 'z-auto'}
        ${isOver ? 'outline outline-blue-500 outline-dashed' : ''} // Basic drop target indicator
      `}
      // Attach listeners and attributes to the main div or a specific handle
      // Attaching to the whole div makes the whole element draggable
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation(); // Prevent clicking child from selecting parent too
        onSelect(element.id);
      }}
      // dnd-kit requires the data-attributes for keyboard accessibility etc.
      // These are spread via {...attributes}
    >
      {/* Optional: Add a visual drag handle icon */}
       <div className="absolute top-0 right-0 mt-1 mr-1 p-1 bg-blue-500 text-white text-xs rounded opacity-0 group-hover:opacity-100 cursor-grab z-20">
           ⠿
       </div>


      {/* Render the actual HTML tag */}
      <Tag {...element.props}>
        {/* Render text content if it exists */}
        {element.props?.textContent || ''}

        {/* Recursively render children if it's a container and has children */}
        {isContainer && element.children.length > 0 && (
          // IMPORTANT: Wrap children in their OWN SortableContext to allow sorting within this container
          <SortableContext items={element.children.map(child => child.id)} strategy={verticalListSortingStrategy}>
            {element.children.map(child => (
              <Element
                key={child.id} // Use id as key
                element={child}
                selectedElementId={selectedElementId}
                onSelect={onSelect}
              />
            ))}
          </SortableContext>
        )}

        {/* Optional: Placeholder for empty containers */}
         {isContainer && element.children.length === 0 && (
              <div className="text-gray-400 text-sm italic p-2 border border-dashed border-gray-300">
                  Drop elements here...
              </div>
         )}
           {/* Optional: Placeholder for non-container elements with no text */}
         {!isContainer && !element.props?.textContent && (
              <div className="text-gray-400 text-sm italic p-2">Empty {element.type}</div>
         )}
      </Tag>
    </div>
  );
}

export default Element;