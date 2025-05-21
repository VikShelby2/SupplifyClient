import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ElementType class definition
class ElementType {
  constructor(type, contentTemplate, className, value, canHaveChildren) {
    this.type = type;
    this.contentTemplate = contentTemplate;
    this.className = className;
    this.value = value;
    this.canHaveChildren = canHaveChildren;
    this.children = [];
  }

  setValue(newValue) {
    this.value = newValue;
  }

  setClassName(newClassName) {
    this.className = newClassName;
  }

  // Generate content including nested children
  getRenderedContent() {
    // Replace className and value in the contentTemplate
    let renderedContent = this.contentTemplate
      .replace("${className}", this.className)
      .replace("${value}", this.value);

    // If this element has children, recursively render them
    if (this.children.length > 0) {
      const renderedChildren = this.children
        .map((child) => child.getRenderedContent())
        .join("");  // Join all the children into a single string
      renderedContent = renderedContent.replace("${value}", renderedChildren);
    }

    return renderedContent;
  }

  addChild(childElement) {
    this.children.push(childElement);
  }

  createNewChild(type, contentTemplate, className, value, canHaveChildren) {
    const newChild = new ElementType(type, contentTemplate, className, value, canHaveChildren);
    this.addChild(newChild);
    return newChild;
  }
}


// Helper to parse HTML string into ElementType instances
const createElementFromHTML = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString.trim();

  const parseElement = (element) => {
    const type = element.tagName.toLowerCase();
    const className = element.className || "";
    const value = element.innerHTML || element.src || "";
    const newElement = new ElementType(
      type,
      `<${type} class='${"${className}"}'>${"${value}"}</${type}>`,
      className,
      value,
      true
    );
    console.log(newElement)
    if (element.children && element.children.length > 0) {
      newElement.canHaveChildren = true;
      Array.from(element.children).forEach((child) => {
        const childElement = parseElement(child);
        newElement.addChild(childElement);
      });
    }
   
    return newElement;
  };

  return Array.from(tempDiv.children).map((child) => parseElement(child));
};

const navbarHTML = `
<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <h1>My Navbar</h1>
  </div>
</nav>
`;

const ELEMENT_TYPES = [
  ...createElementFromHTML(navbarHTML),
  new ElementType(
    "h1",
    "<h1 class='${className}'>${value}</h1>",
    "text-3xl font-bold underline",
    "Hello World!",
    false
  ),
];

// Recursive Element Renderer
const Element = ({
  element,
  index,
  selectElement,
  selectedElement,
  level = 0,
  parentPath = [],
  updateElementsAtPath,
}) => {
  const path = [...parentPath, index];

  const [{ isDragging }, drag] = useDrag({
    type: "ELEMENT",
    item: { path },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
console.log(element)
  const [, drop] = useDrop({
    accept: "ELEMENT",
    drop: (draggedItem) => {
      if (JSON.stringify(draggedItem.path) !== JSON.stringify(path)) {
        updateElementsAtPath(draggedItem.path, path);
      }
    },
  });

  const isSelected = JSON.stringify(selectedElement) === JSON.stringify(path);

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(path);
      }}
      style={{
        border: isSelected ? "2px solid blue" : "1px solid #ccc",
        marginTop: "8px",
        paddingLeft: `${level * 20}px`,
        backgroundColor: "white",
        cursor: "move",
      }}
      dangerouslySetInnerHTML={{ __html: element.getRenderedContent() }}
    >
    </div>
  );
};

// Recursive render helper
const RenderElements = ({
  elements,
  selectElement,
  selectedElement,
  level = 0,
  parentPath = [],
  updateElementsAtPath,
}) =>
  elements.map((element, index) => (
    <div key={index}>
      <Element
        element={element}
        index={index}
        selectElement={selectElement}
        selectedElement={selectedElement}
        level={level}
        parentPath={parentPath}
        updateElementsAtPath={updateElementsAtPath}
      />
      {element.canHaveChildren && (
        <RenderElements
          elements={element.children}
          selectElement={selectElement}
          selectedElement={selectedElement}
          level={level + 1}
          parentPath={[...parentPath, index, "children"]}
          updateElementsAtPath={updateElementsAtPath}
        />
      )}
    </div>
  ));

const PageBuilder = () => {
  const [elements, setElements] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  useEffect(() => {console.log(elements)} , [elements] )
  const selectElement = (path) => setSelectedPath(path);

  const getElementAtPath = (elements, path) => {
    return path.reduce((acc, curr) => acc[curr], elements);
  };

  const updateElementsAtPath = (fromPath, toPath) => {
    const clonedElements = structuredClone(elements);
    const dragged = getElementAtPath(clonedElements, fromPath);
    let sourceParent = clonedElements;
    for (let i = 0; i < fromPath.length - 1; i++) {
      sourceParent = sourceParent[fromPath[i]];
    }
    sourceParent.splice(fromPath[fromPath.length - 1], 1);

    let targetParent = clonedElements;
    for (let i = 0; i < toPath.length - 1; i++) {
      targetParent = targetParent[toPath[i]];
    }

    if (Array.isArray(targetParent)) {
      targetParent.splice(toPath[toPath.length - 1], 0, dragged);
    } else if (targetParent.canHaveChildren) {
      targetParent.children.push(dragged);
    }

    setElements(clonedElements);
  };

  const updateSelectedElement = (key, value) => {
    if (!selectedPath) return;
    const updated = [...elements];
    let target = updated;
    for (let i = 0; i < selectedPath.length - 1; i++) {
      target = target[selectedPath[i]];
    }
    const el = target[selectedPath[selectedPath.length - 1]];
    if (key === "value") el.setValue(value);
    if (key === "className") el.setClassName(value);
    setElements(updated);
  };

  const addElement = (elementType) => {
   console.log(elementType)
    setElements([...elements, elementType]);
  };

  const selectedElement =
    selectedPath && getElementAtPath(elements, selectedPath);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <div className="w-1/4 p-4 bg-gray-100">
          <h3 className="font-bold text-lg mb-4">Element Settings</h3>
          {selectedElement && (
            <>
              <label>Value:</label>
              <input
                type="text"
                className="w-full border p-2"
                value={selectedElement.value}
                onChange={(e) => updateSelectedElement("value", e.target.value)}
              />
              <label className="mt-4 block">Class Name:</label>
              <input
                type="text"
                className="w-full border p-2"
                value={selectedElement.className}
                onChange={(e) =>
                  updateSelectedElement("className", e.target.value)
                }
              />
            </>
          )}
        </div>
        <div className="w-3/4 p-4 border-l bg-white">
          <h3 className="mb-2">Page Builder</h3>
          <div className="mb-4 space-x-2">
            {ELEMENT_TYPES.map((el, i) => (
              <button
                key={i}
                onClick={() => addElement(  ...createElementFromHTML(navbarHTML))}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Add {el.type}
              </button>
            ))}
          </div>
          <div>
            <RenderElements
              elements={elements}
              selectElement={selectElement}
              selectedElement={selectedPath}
              updateElementsAtPath={updateElementsAtPath}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default PageBuilder;    