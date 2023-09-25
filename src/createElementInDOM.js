//Creates an element in the DOM, with optional ID and className
//Attaches it to the specified parent element, or body if not specified

export function createElementInDOM(elementType, parentElement, className, id) {
    let element = {}
    //Optional parameters
    element.parentElement = parentElement || document.body;
    element.className = className || null;
    element.id = id || null;


    //Create element
    element.DOMObject = document.createElement(elementType);

    //Add ID and className if present
    if(element.className != null) element.DOMObject.classList.add(element.className); 
    if(element.id != null) element.DOMObject.setAttribute("id",element.id);
    
    //Add new element to DOM
    element.parentElement.appendChild(element.DOMObject);
    return element.DOMObject;
};