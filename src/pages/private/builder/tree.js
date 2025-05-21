// src/components/tree-utilities.js

// Finds an item by ID within the nested tree structure
export function findItem(items, id) {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItem(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

// Removes an item by ID and returns the new tree and the removed item
export function removeItem(items, id) {
  let removedItem = null;
  const newItems = items.filter(item => {
    if (item.id === id) {
      removedItem = item;
      return false; // Remove this item
    }
    if (item.children) {
      // Recursively process children and update the children array if something was removed below
      const result = removeItem(item.children, id);
      if (result.removedItem) {
        removedItem = result.removedItem; // Propagate removed item up
        item.children = result.newItems; // Update children
        return true; // Keep the parent as its child was found/removed
      } else {
         item.children = result.newItems; // Update children even if nothing removed (due to filter creating new array)
      }
    }
    return true; // Keep the item if it wasn't removed and no child was removed
  });
  return { newItems, removedItem };
}


// Inserts an item into the tree at a specific parent ID and index
export function insertItem(items, itemToInsert, parentId, index) {
  // Ensure items array is not mutated directly if called recursively
  // For robustness, you might deep clone arrays/objects before modifying
   const itemsCopy = [...items]; // Shallow clone for root level

  if (parentId === null) { // Insert at the root level
    itemsCopy.splice(index, 0, itemToInsert);
    return itemsCopy;
  }

  return itemsCopy.map(item => {
    if (item.id === parentId) {
      // Found the parent, insert into its children
      if (!Array.isArray(item.children)) {
        item.children = []; // Initialize children array if it doesn't exist
      }
       // Ensure children array is cloned before splicing
      const newChildren = [...item.children];
      newChildren.splice(index, 0, itemToInsert);
      return { ...item, children: newChildren }; // Return new object with updated children
    }
    // Recursively search in children
    if (item.children && item.children.length > 0) {
       const newChildren = insertItem(item.children, itemToInsert, parentId, index);
        // Only return a new item object if children were updated
       if (newChildren !== item.children) {
         return { ...item, children: newChildren };
       }
    }
    return item; // Return original item if no changes needed below
  });
}

// Flattens the tree into a list, adding parentId for easier lookup
export function flattenTree(items, parentId = null, depth = 0) {
  let flat = [];
  items.forEach((item, index) => {
    flat.push({ ...item, parentId, index, depth, droppable: Array.isArray(item.children) });
    if (item.children) {
      flat = flat.concat(flattenTree(item.children, item.id, depth + 1));
    }
  });
  return flat;
}

// (buildTree is often needed to convert flat back to tree, but dnd-kit's
// getNewTree or manual manipulation in handleDragEnd is often more direct)