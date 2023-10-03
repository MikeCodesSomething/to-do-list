import { projectList, createProject } from "./project.js";
import { toDoList } from "./index.js";

export function render() {
    
    //Reset the container
    let contentContainer = document.querySelector('#content-container');
    contentContainer.replaceChildren();

    //Create container and title for projects
    for(let project of projectList) {
        //We replace spaces in the project name with '-' for the purposes of setting the ID
        let projectNameInHTML = project.name.split(' ').join('-');
        let projectContainer = createElementInDOM('div', contentContainer, 'project-container', projectNameInHTML);
        let projectTitle = createElementInDOM('h2', projectContainer, 'title', project.name);
        projectTitle.textContent = project.name;
        let projectToDoContainer = createElementInDOM('div', projectContainer, 'project-to-dos-container', `${projectNameInHTML}-to-dos`);
        let projectAddToDoButton = createElementInDOM('button', projectContainer,'add-to-do-button', projectNameInHTML);
        projectAddToDoButton.textContent = 'Add To-Do';
        projectAddToDoButton.addEventListener('click', openOverlay);

        
    }

    //Create cards for tasks in the project container
    console.log(toDoList)
    for(let toDo of toDoList) {
        //Get the linked project (using name, so this will break if two project have the same name!)
        let projectToDosContainerID = `${toDo.project.name.split(' ').join('-')}-to-dos`
        let linkedProjectToDosContainer = document.querySelector(`#${projectToDosContainerID}`);
        let toDoCard = createElementInDOM('div', linkedProjectToDosContainer, 'to-do-card', toDo.title);
        
        toDoCard.textContent = toDo.title;
    }
    

    //Create 'Add Project' button and initialise
    let newProjectContainer = createElementInDOM('div', contentContainer, 'new-project-container', 'new-project-container')
    let newProjectButton = createElementInDOM('button', newProjectContainer, 'new-project-button', 'new-project-button');
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
        let projectObject = projectList.find(obj => obj.name.split(' ').join('-') === projectName);
        projectObject.linkToDo(newToDo);
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
    let project = e.target.id;
    console.log(project);
    let projectInput = document.getElementById("new-to-do-project");
    projectInput.value = project;
    let overlay = document.getElementById("overlay");
    overlay.classList.add("open");
    let title = document.getElementById("title");
    title.focus();
}

function closeOverlay() {
    overlay.classList.remove("open");
}