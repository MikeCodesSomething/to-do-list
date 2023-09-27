//Creates an element in the DOM, with optional ID and className
//Attaches it to the specified parent element, or body if not specified

export function render(projectList, toDoList) {
    //Reset the container
    let contentContainer = document.querySelector('#content-container');
    contentContainer.replaceChildren();

    //Create container and title for projects
    for(let project of projectList) {
        let projectContainer = createElementInDOM('div', contentContainer, 'project', project.name)
        let projectTitle = createElementInDOM('h2', projectContainer, 'title', project.name)
    }

    //Create cards for tasks in the project container
    console.log(toDoList)
    for(let toDo of toDoList) {
        //Get the linked project (using name, so this will break if two project have the same name!)
        let linkedProject = document.querySelector(`#${toDo.project.name}`);
        let toDoCard = createElementInDOM('div', linkedProject, 'to-do-card', toDo.title);
    }

};


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