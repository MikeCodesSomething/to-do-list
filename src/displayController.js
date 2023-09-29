export function render(projectList, toDoList) {
    //Reset the container
    let contentContainer = document.querySelector('#content-container');
    contentContainer.replaceChildren();

    //Create container and title for projects
    for(let project of projectList) {
        let projectContainer = createElementInDOM('div', contentContainer, 'project-container', project.name)
        let projectTitle = createElementInDOM('h2', projectContainer, 'title', project.name)
        projectTitle.textContent = project.name;
        let projectAddToDoButton = createElementInDOM('button',projectContainer,'add-to-do-button',project.name)
        projectAddToDoButton.textContent = 'Add To-Do'
        projectAddToDoButton.addEventListener('click', openOverlay)
    }

    //Create cards for tasks in the project container
    console.log(toDoList)
    for(let toDo of toDoList) {
        //Get the linked project (using name, so this will break if two project have the same name!)
        let linkedProject = document.querySelector(`#${toDo.project.name}`);
        let toDoCard = createElementInDOM('div', linkedProject, 'to-do-card', toDo.title);
        
        toDoCard.textContent = toDo.title;
    }

};

export function initOverlay() {

    //Overlay initilisation, could move this out if there's a better place
    let closeOverlayButton = document.getElementById("close-overlay-button");
    let overlay = document.getElementById("overlay");
    overlay.addEventListener('click', (e) => {if(e.target === overlay) closeOverlay()});
    closeOverlayButton.addEventListener('click', closeOverlay);
    
    let addToDoForm = document.getElementById('add-to-do-form');
    addToDoForm.addEventListener('submit', addToDoWithForm);   
    console.log("init overlay was called") 
}

function addToDoWithForm(e) {
    //Stop the form actually getting submitted as we don't do anything with that right now
    e.preventDefault();
    
    //Get all the form values and link them to toDo item properties
    let projectName = document.getElementById("new-to-do-project").value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("due-date").value;
    let priority = document.getElementById("priority").value;
    let notes = document.getElementById("notes").value;
    
    //Create our object
    let newToDo = Object.create(toDo);
    newToDo.init(title, description, dueDate, priority, notes);

    //Figure out what project we've got from name, this won't work if you make 2 projects with the same name
    let defaultProjectName = projectList[0].name
    if(projectName !== defaultProjectName) {
        let projectObject = projectList.find(obj => obj.name === projectName);
        projectObject.linkToDo(newToDo);
    }
    
    render(projectList, toDoList);
    
    console.log(title)
}


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

function openOverlay(e) {
    let project = e.target.id;
    console.log(project);
    let projectInput = document.getElementById("new-to-do-project");
    projectInput.value = project;
    let overlay = document.getElementById("overlay");
    overlay.classList.add("open");
}

function closeOverlay() {
    overlay.classList.remove("open");
}