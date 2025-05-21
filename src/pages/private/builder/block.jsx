// src/components/DraggableBlock.jsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableBlock({ id, type, label, ...blockData }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: id, // This is the unique ID for the *draggable source*
    data: { // We can attach data to the draggable item
      type: type,
      label: label,
      ...blockData // Include any other data needed to create the element
    },
  });

  const style = {
    // Apply transform for visual dragging feedback
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    display: 'inline-block', // Style button correctly
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-2 m-1 bg-green-500 text-white rounded text-sm
        hover:bg-green-600 active:bg-green-700
        ${isDragging ? 'z-50' : ''}
      `}
    >
      {label || type}
    </button>
  );
}

export default DraggableBlock;