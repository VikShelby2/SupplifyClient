


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
  
    getRenderedContent() {
      return this.contentTemplate.replace("${className}", this.className).replace("${value}", this.value);
    }
  }


const createElementFromHTML = (htmlString) => {
    // Create a temporary div to parse the HTML string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString.trim();
  
    // Get the element's tag name, class name, and content
    const element = tempDiv.firstChild;
  
    if (!element) return null;
  
    const type = element.tagName.toLowerCase();
    const className = element.className || '';
    const value = element.innerHTML || element.src || '';  // Handles image src as value if it's an image tag
  
    // Create and return the new element based on parsed data
    return new ElementType(type, `<${type} class='${className}'>${value}</${type}>`, className, value, false);
  };
  