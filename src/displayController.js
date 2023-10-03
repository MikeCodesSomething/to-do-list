import { projectList, createProject } from "./project.js";
import { toDoList } from "./index.js";

export function render() {
    
    //Reset the container
    let contentContainer = document.querySelector('#content-container');
    contentContainer.replaceChildren();

    //Create container and title for projects
    for(let project of projectList) {    
        
        //We replace spaces in the project name with '-' for the purposes of setting the 
        let projectNameInHTML = project.name.split(' ').join('-');
        let projectContainer = createElementInDOM('div', contentContainer, 'project-container');
        let projectTitle = createElementInDOM('h2', projectContainer, 'title');
        projectTitle.textContent = project.name;
        let projectToDoContainer = createElementInDOM('div', projectContainer, 'project-to-dos-container');
        projectToDoContainer.dataset.projectId = project.id;

        let projectAddToDoButton = createElementInDOM('button', projectContainer,'add-to-do-button');
        projectAddToDoButton.textContent = 'Add To-Do';
        projectAddToDoButton.addEventListener('click', openOverlay);
        projectAddToDoButton.dataset.projectId = project.id;


        
    }

    //Create cards for tasks in the project container
    console.log(toDoList)
    for(let toDo of toDoList) {
        //Get the linked project using the project id
        let linkedProjectToDosContainer = document.querySelector(`.project-to-dos-container[data-project-id="${toDo.project.id}"]`);
        let toDoCard = createElementInDOM('div', linkedProjectToDosContainer, 'to-do-card');
        toDoCard.textContent = toDo.title;
    }
    

    //Create 'Add Project' button and initialise
    let newProjectContainer = createElementInDOM('div', contentContainer, 'new-project-container')
    let newProjectButton = createElementInDOM('button', newProjectContainer, 'new-project-button');
    newProjectButton.textContent = '+ Add Project';
    newProjectButton.addEventListener('click', openNewProjectEntry)


};

function openNewProjectEntry(newprojectContainer) {
    
    //Update container view
    let newProjectButton = document.querySelector('.new-project-button') ;
    newProjectButton.classList.add('hidden')

    let newProjectContainer = document.querySelector('.new-project-container');
    newProjectContainer.classList.add('project-container');

    //Create an input field for user to enter project name, and focus it
    let newProjectNameLabel = createElementInDOM('label', newProjectContainer, 'new-project-name-label');
    newProjectNameLabel.textContent = 'New project name:';
    newProjectNameLabel.htmlFor = 'new-project-name';

    let newProjectNameInput = createElementInDOM('input', newProjectContainer, 'new-project-name');
    newProjectNameInput.focus();

    //Create buttons to save or cancel the new project addition
    let newProjectButtonContainer = createElementInDOM('div', newProjectContainer, 'button-container');

    let newProjectSaveButton = createElementInDOM('button', newProjectButtonContainer, 'save-new-project-button', 'save-new-project-button')
    newProjectSaveButton.textContent = 'Save';
    newProjectSaveButton.addEventListener('click', () =>  {
        createProject(newProjectNameInput.value);
        render(projectList, toDoList);
    });

    let newProjectCancelButton = createElementInDOM('button', newProjectButtonContainer, 'cancel-new-project-button', 'cancel-new-project-button')
    newProjectCancelButton.textContent = 'Cancel';
    newProjectCancelButton.addEventListener('click', render);
}

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
    let project = document.getElementById("new-to-do-project");
    let projectId = project.dataset.projectId;
    let projectName = project.value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("due-date").value;
    let priority = document.getElementById("priority").value;
    let notes = document.getElementById("notes").value;
    
    //Create our object
    let newToDo = Object.create(toDo);
    newToDo.init(title, description, dueDate, priority, notes);

    //Link to the relevant project
    if(projectName !== 0) {
        projectList[projectId].linkToDo(newToDo);
    }

    //Reload and close the overlay
    render(projectList, toDoList);
    closeOverlay();
    let addToDoForm = document.getElementById('add-to-do-form');
    addToDoForm.reset();
    
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
    let id = e.target.dataset.projectId;
    console.log(id);
    let projectInput = document.getElementById("new-to-do-project");
    projectInput.value = projectList[id].name;
    projectInput.dataset.projectId = id;

    let overlay = document.getElementById("overlay");
    overlay.classList.add("open");
    let title = document.getElementById("title");
    title.focus();
}

function closeOverlay() {
    overlay.classList.remove("open");
}