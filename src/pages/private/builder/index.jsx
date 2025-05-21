// src/components/PageBuilder.jsx
import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Element from './Element';
import DraggableBlock from './block'; // Import the new component
import { findItem, removeItem, insertItem, flattenTree } from './tree';

// Sample initial page data (tree structure) - Keep this
const initialPageData = [
    {
        id: 'section-1',
        type: 'div',
        props: { className: 'bg-gray-100 p-4 mb-4 rounded shadow min-h-[100px]' }, // Added min-height to make empty div droppable visually
        children: [
          {
            id: 'heading-1',
            type: 'h1',
            props: { textContent: 'Welcome to the Builder', className: 'text-2xl font-bold mb-2' },
            children: []
          },
          {
            id: 'paragraph-1',
            type: 'p',
            props: { textContent: 'Drag and drop elements to build your page layout.', className: 'text-gray-700' },
            children: []
          },
        ]
      },
      {
        id: 'nav-1',
        type: 'nav',
        props: { className: 'bg-blue-600 p-2 rounded min-h-[50px]' }, // Added min-height
        children: [
          {
            id: 'ul-1',
            type: 'ul',
            props: { className: 'flex space-x-4 text-white' },
            children: [
              { id: 'li-1', type: 'li', props: { textContent: 'Home', className: 'cursor-pointer hover:underline' }, children: [] },
              { id: 'li-2', type: 'li', props: { textContent: 'About', className: 'cursor-pointer hover:underline' }, children: [] },
              { id: 'li-3', type: 'li', props: { textContent: 'Contact', className: 'cursor-pointer hover:underline' }, children: [] },
            ]
          }
        ]
      },
        {
        id: 'section-2',
        type: 'div',
        props: { className: 'bg-white p-4 mb-4 rounded shadow min-h-[100px]' }, // Added min-height
        children: [
             { id: 'paragraph-2', type: 'p', props: { textContent: 'Another Section Below', className: 'text-gray-700' }, children: [] },
        ]
      },
];

// Define the ready-to-drop blocks
const readyBlocks = [
    {
        sourceId: 'block-section', // Unique ID for the draggable source
        label: 'Section (Div)',
        type: 'div', // The HTML element type to create
        props: { className: 'bg-white p-4 mb-4 rounded shadow min-h-[100px]' },
        children: [] // Sections can contain children
    },
    {
        sourceId: 'block-heading',
        label: 'Heading (h2)',
        type: 'h2',
        props: { textContent: 'New Heading', className: 'text-xl font-semibold mb-2' },
        children: [] // Headings usually don't contain other elements
    },
     {
        sourceId: 'block-paragraph',
        label: 'Paragraph (p)',
        type: 'p',
        props: { textContent: 'New Paragraph', className: 'text-gray-700' },
        children: []
    },
     {
        sourceId: 'block-button',
        label: 'Button',
        type: 'button',
        props: { textContent: 'Click Me', className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' },
        children: []
    },
      {
        sourceId: 'block-nav',
        label: 'Nav',
        type: 'nav',
        props: { className: 'bg-purple-600 p-2 rounded min-h-[50px]' },
        children: [{
             id: 'temp-ul', // Use a temporary ID during creation, will be replaced
             type: 'ul',
             props: { className: 'flex space-x-2 text-white' },
             children: [
                 { id: 'temp-li-1', type: 'li', props: { textContent: 'Link 1', className: 'cursor-pointer hover:underline' }, children: [] },
                 { id: 'temp-li-2', type: 'li', props: { textContent: 'Link 2', className: 'cursor-pointer hover:underline' }, children: [] },
             ]
        }]
    },
    // Add more block types as needed
];

// Assign a unique ID to the builder container so it can be a drop target for root elements
const BUILDER_CONTAINER_ID = 'page-builder-canvas';

function PageBuilder() {
  const [pageData, setPageData] = useState(initialPageData);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [activeId, setActiveId] = useState(null); // State to track dragged item for DragOverlay

  // Flattened list is useful for finding items quickly and for DragOverlay lookup
  // We flatten the *current* page data to find existing items
  const flattenedItems = useMemo(() => flattenTree(pageData), [pageData]);

  // Also create a map for quick lookup of active item data for DragOverlay
  const activeItemData = useMemo(() => {
       if (!activeId) return null;

       // Check if the active item is from the ready blocks
       const draggedNewBlock = readyBlocks.find(block => block.sourceId === activeId);
       if (draggedNewBlock) {
            // Return a representation of the block being dragged
            return {
                id: activeId, // Use the sourceId for the overlay
                type: draggedNewBlock.type,
                props: { textContent: draggedNewBlock.label || draggedNewBlock.type }, // Show block label/type in overlay
                isNewBlock: true, // Flag it as a new block
            };
       }

       // If not a new block, find it in the current page data
       const existingItem = flattenedItems.find(item => item.id === activeId);
       if (existingItem) {
            return { ...existingItem, isNewBlock: false };
       }

       return null; // Should not happen if activeId is valid
  }, [activeId, flattenedItems]);


  // Setup Dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start event
  function handleDragStart(event) {
    setActiveId(event.active.id);
    setSelectedElementId(null); // Deselect when dragging starts
  }

  // Handle drag end event
  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null); // Clear active item

    if (!over) return; // Dropped outside any droppable area

    const activeId = active.id;
    const overId = over.id;

    // 1. Determine if the dragged item is a new block or an existing page element
    const draggedNewBlockDefinition = readyBlocks.find(block => block.sourceId === activeId);

    let itemToInsert = null;
    // We'll work with the state *after* potential removal for calculations
    let itemsAfterPotentialRemove = [...pageData]; // Start with a copy

    if (draggedNewBlockDefinition) {
        // It's a NEW block being added
        // Generate a unique ID for the new element instance
        const newElementId = `${draggedNewBlockDefinition.type}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`; // More robust unique ID

        itemToInsert = {
            id: newElementId,
            type: draggedNewBlockDefinition.type,
            props: { ...draggedNewBlockDefinition.props }, // Copy props
            children: Array.isArray(draggedNewBlockDefinition.children)
                ? JSON.parse(JSON.stringify(draggedNewBlockDefinition.children)) // Deep clone children structure
                : [],
        };

         // Recursively generate unique IDs for any default children
         const assignUniqueIds = (items) => {
             return items.map(item => {
                 const newItem = {
                     ...item,
                     id: `${item.type}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
                 };
                 if (Array.isArray(newItem.children)) {
                     newItem.children = assignUniqueIds(newItem.children);
                 }
                 return newItem;
             });
         };
         if (Array.isArray(itemToInsert.children)) {
              itemToInsert.children = assignUniqueIds(itemToInsert.children);
         }


        // No removal needed from the pageData state for new blocks
        itemsAfterPotentialRemove = [...pageData]; // Work with a fresh copy of current state

    } else {
        // It's an EXISTING element being reordered
        if (activeId === overId) return; // Dropped on itself

        const removeResult = removeItem(pageData, activeId);
        if (!removeResult.removedItem) {
            console.error("Dragged item not found in state (internal drag)");
            return;
        }
        itemToInsert = removeResult.removedItem;
        itemsAfterPotentialRemove = removeResult.newItems; // This is the tree state *after* removing the item
    }

    // 2. Determine the target parent and index in the state *after* potential removal
    let newParentId = null; // Default to root level
    let newIndex = 0;

    const overItem = findItem(pageData, overId); // Find the target item in the *original* tree state for context

     if (!overItem) {
         // Dropped onto the main builder container itself (root level)
         if (overId === BUILDER_CONTAINER_ID) {
              newParentId = null; // Root
              newIndex = itemsAfterPotentialRemove.length; // Insert at the end of the root list
         } else {
            console.warn(`Dropped onto an unknown element with ID: ${overId}. Reverting...`);
             // If it was an internal drag, revert state by adding the item back where it was
            if (!draggedNewBlockDefinition && itemToInsert) {
                 // Need to find the original position. Requires storing parentId/index during drag start or lookup before removal.
                 // A simpler revert: just reset state to before the drag started.
                 // For now, we'll just stop. A more robust solution would use the flattened items state from before the drag.
                 setPageData([...pageData]); // Quick way to revert to original state on invalid drop
            }
            return; // Dropped somewhere invalid
         }
     } else {
        // Dropped onto an existing element (`overItem`)
        const isOverAContainer = Array.isArray(overItem.children);
        // Find the over item's parent in the tree state *after* potential removal
        const parentOfOverInCurrentState = findItem(itemsAfterPotentialRemove, overId)?.parentId || null;


        // Simplified drop logic:
        // - If dropped directly on an element that *can* contain children, drop *inside* at the end.
        // - Otherwise (dropped on non-container, or potentially the edge of a container), drop *after* the over item.

        if (isOverAContainer) { // overItem can contain children
             newParentId = overId;
             // Find the overItem in the state *after* removal to get correct children count
             const overItemInCurrentState = findItem(itemsAfterPotentialRemove, overId);
             newIndex = overItemInCurrentState?.children?.length || 0; // Insert as the last child

        } else { // overItem cannot contain children, or we are inserting next to it
            newParentId = parentOfOverInCurrentState; // Insert next to the over item, in its parent
            const parentItemInCurrentState = newParentId === null
                ? { children: itemsAfterPotentialRemove } // Root level has items directly
                : findItem(itemsAfterPotentialRemove, newParentId);

            const overIndex = parentItemInCurrentState?.children?.findIndex(item => item.id === overId) || 0;
            newIndex = overIndex + 1; // Insert AFTER the over item
        }
     }


    // 3. Prevent dropping a container inside itself or its descendants (only relevant for internal drags)
      if (!draggedNewBlockDefinition && Array.isArray(itemToInsert?.children)) { // Check if the item being inserted is a container (and it's not a new block)
           // Check if the intended new parent ID is a descendant of the itemToInsert
           // We can check this by flattening the subtree of itemToInsert and seeing if newParentId exists within it.
           const itemToInsertOriginal = findItem(pageData, activeId); // Find the item in the state *before* removal
           if (itemToInsertOriginal) {
               const flattenedDraggedSubtree = flattenTree([itemToInsertOriginal]);
               const isDroppingIntoDescendant = flattenedDraggedSubtree.some(item => item.id === newParentId);

                if (isDroppingIntoDescendant) {
                    console.warn("Cannot drop an item into its own descendant.");
                    // Revert state by inserting the item back where it came from
                     setPageData([...pageData]); // Simple revert
                    return;
                }
           }
      }


    // 4. Insert the item into the new position
    if (itemToInsert) { // Only insert if we have an item to insert
        const finalItems = insertItem(itemsAfterPotentialRemove, itemToInsert, newParentId, newIndex);
        setPageData(finalItems);
         // Optional: Select the newly added/moved element
        setSelectedElementId(itemToInsert.id);
    }
  }

  // Handle drag cancellation - Revert state if it was an internal drag
  function handleDragCancel() {
     // If the activeId was from an existing element (not a new block sourceId),
     // the state might have been temporarily altered (item removed). Revert it.
      if (activeId && !readyBlocks.some(block => block.sourceId === activeId)) {
           console.log("Drag cancelled - Reverting state");
           setPageData([...pageData]); // Reset to state before drag started
      }
      setActiveId(null);
  }

  // Handle element selection
  const handleSelectElement = (id) => {
    setSelectedElementId(id);
  };


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
        <div className="flex">
            {/* Ready Blocks Sidebar */}
            <div className="w-60 bg-gray-200 p-4 overflow-y-auto flex-shrink-0">
                <h3 className="text-lg font-semibold mb-4">Blocks</h3>
                <div className="flex flex-wrap gap-2">
                    {readyBlocks.map(block => (
                        <DraggableBlock
                            key={block.sourceId}
                            id={block.sourceId} // Use the sourceId here
                            type={block.type}
                            label={block.label}
                            // Pass other data needed for creating the element instance
                            props={block.props}
                            children={block.children} // Pass default children structure
                        />
                    ))}
                </div>
            </div>

            {/* Page Builder Canvas */}
            {/* This SortableContext is for the ROOT level elements */}
            {/* Items must be the IDs of the direct children being rendered in this context */}
          <SortableContext items={pageData.map(item => item.id)} strategy={verticalListSortingStrategy}>
            <div
               id={BUILDER_CONTAINER_ID} // Assign the container ID
               className="flex-grow page-builder-canvas p-4 border border-dashed border-gray-300 min-h-[600px] relative" // Added relative for overlay positioning
               onClick={() => setSelectedElementId(null)} // Deselect when clicking canvas background
            >
              {/* Render root level elements recursively */}
              {pageData.length === 0 && (
                 <p className="text-gray-500 text-center italic absolute inset-0 flex items-center justify-center pointer-events-none">
                     Drag elements here to start building...
                 </p>
              )}
              {pageData.map(element => (
                <Element
                  key={element.id} // Use id as key
                  element={element}
                  selectedElementId={selectedElementId}
                  onSelect={handleSelectElement}
                />
              ))}
            </div>
          </SortableContext>
        </div>


      {/* Drag Overlay: Shows a visual representation of the item being dragged */}
      {/* Render a simple preview based on activeItemData */}
      <DragOverlay>
         {activeItemData ? (
            <div
                className={`p-2 rounded border ${activeItemData.isNewBlock ? 'border-green-600 bg-green-100' : 'border-blue-600 bg-blue-100'} shadow-lg cursor-grabbing`}
                 style={{ width: 'auto', height: 'auto' }} // Basic style override for overlay
            >
               <strong className="mr-2">{activeItemData.type}:</strong>
               {activeItemData.props?.textContent || (activeItemData.children?.length > 0 ? `(${activeItemData.children.length} children)` : 'Empty')}
            </div>
         ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default PageBuilder;