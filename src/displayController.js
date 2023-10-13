import { projectList, createProject } from "./project.js";
import { toDoList } from "./index.js";
import { intlFormatDistance, startOfDay } from 'date-fns'


export function render() {
    
    //Reset the container
    let contentContainer = document.querySelector('#content-container');
    contentContainer.replaceChildren();

    //Create container and title for projects
    for(let project of projectList) {    
        
        let projectContainer = createElementInDOM('div', contentContainer, 'project-container');
        let projectTitle = createElementInDOM('h2', projectContainer, 'title');
        projectTitle.textContent = project.name;
        let projectToDoContainer = createElementInDOM('div', projectContainer, 'project-to-dos-container');
        projectToDoContainer.dataset.projectId = project.id;

        let projectAddToDoButton = createElementInDOM('button', projectContainer,'add-to-do-button');
        projectAddToDoButton.textContent = 'Add To-Do';
        projectAddToDoButton.addEventListener('click', openCreateOverlay.bind(project));
        projectAddToDoButton.dataset.projectId = project.id;


        
    }

    //Create cards for tasks in the project container
    for(let toDo of toDoList) {
        //Don't render if deleted
        if(toDo.deleted === false){
        
            //Get the linked project using the project id
            let linkedProjectToDosContainer = document.querySelector(`.project-to-dos-container[data-project-id="${toDo.project.id}"]`);
            
            //Create the to-do card
            let toDoCard = createElementInDOM('div', linkedProjectToDosContainer, 'to-do-card');
            
            //Add card contents
            addCardContents(toDo, toDoCard);
        } 
    }
    

    //Create 'Add Project' button and initialise
    let newProjectContainer = createElementInDOM('div', contentContainer, 'project-container')
    newProjectContainer.classList.add('new');
    let newProjectButton = createElementInDOM('button', newProjectContainer, 'new-project-button');
    newProjectButton.textContent = '+ Add Project';
    newProjectButton.addEventListener('click', openNewProjectEntry)


};

function addCardContents(toDo, toDoCard) {

    //Add checkbox
    let toDoCheckbox = createElementInDOM('input',toDoCard, 'to-do-checkbox');
    toDoCheckbox.type = 'checkbox';
    
    //Set checkbox to checked and strikethrough text if to-do is completed
    if(toDo.completed === true){
        toDoCard.classList.add('completed');
        toDoCheckbox.checked = true;
    } 

    toDoCheckbox.addEventListener('change', () => {
        //Flip completed status
        toDo.completed = !toDo.completed;
        toDoCard.classList.toggle('completed');
    });
    
    //Add title
    let toDoTitle = createElementInDOM('div', toDoCard, 'to-do-title');
    toDoTitle.textContent = toDo.title;

    //Add due date if present
    if(toDo.dueDate !== "") {
    let toDoDueDate = createElementInDOM('div', toDoCard, 'to-do-due-date');
        let dueDateFormatted = ''
        //If due date is today display 'today'
        if(startOfDay(toDo.dueDate) - startOfDay(new Date()) === 0) dueDateFormatted = 'today';
        //Else we return the distance
        else dueDateFormatted =  intlFormatDistance(startOfDay(toDo.dueDate), startOfDay(new Date()), { addSuffix: true });
        toDoDueDate.textContent = `Due: ${dueDateFormatted}`
    }

    //Add more details panel
    let toDoMoreDetails = createElementInDOM('div', toDoCard, 'to-do-more-details')
    toDoMoreDetails.classList.add('hidden');

    //Toggle more details panel when to do card clicked (but not any of the buttons/checkbox)
    toDoCard.addEventListener('click', (e) => {
        //check we haven't clicked a button or checbox via the DOM tagName
        if(!['BUTTON','INPUT'].includes(e.target.tagName)) {
            toDoMoreDetails.classList.toggle('hidden');
            toDoCard.classList.toggle('expanded');
        }
        });

    //Add Description if present
    if(toDo.description !== "") {
        let toDoDescription = createElementInDOM('div', toDoMoreDetails, 'to-do-description');
        toDoDescription.textContent = `Description: ${toDo.description}`;
    }

    //Add Priority if present
    if(toDo.priority !== "") {
        let toDoPriority = createElementInDOM('div', toDoMoreDetails, 'to-do-priority');
        toDoPriority.textContent = `Priority: ${toDo.priority}`;
    }

    //Add Notes if present 
    if(toDo.notes !== "") {
    let toDoNotes = createElementInDOM('div', toDoMoreDetails, 'to-do-notes');
    toDoNotes.textContent = `Notes: ${toDo.notes}`;
    }

    //Add Edit Button
    let toDoEditButton = createElementInDOM('button', toDoMoreDetails, 'to-do-edit-button');
    toDoEditButton.textContent = `Edit`;
    toDoEditButton.addEventListener('click', openEditOverlay.bind(toDo)); 

    //Add Delete Button
    let toDoDeleteButton = createElementInDOM('button', toDoMoreDetails, 'to-do-delete-button');
    toDoDeleteButton.textContent = `Delete`;
    toDoDeleteButton.addEventListener('click', () => {toDo.delete(); render()})
}

function openNewProjectEntry(newprojectContainer) {
    
    //Update container view
    let newProjectButton = document.querySelector('.new-project-button') ;
    newProjectButton.classList.add('hidden')

    let newProjectContainer = document.querySelector('.project-container.new');
    newProjectContainer.classList.add('project-container');

    //Create a form for creating a new project
    let newProjectForm = createElementInDOM('form', newProjectContainer, 'new-project-form', 'new-project-form');
    newProjectForm.action = '';
    newProjectForm.addEventListener('submit', addNewProject);

    //Create an input field for user to enter project name, and focus it
    let newProjectNameLabel = createElementInDOM('label', newProjectForm, 'new-project-name-label');
    newProjectNameLabel.textContent = 'New project name:';
    newProjectNameLabel.htmlFor = 'new-project-name';

    let newProjectNameInput = createElementInDOM('input', newProjectForm, 'new-project-name','new-project-name');
    newProjectNameInput.focus();

    //Create buttons to save or cancel the new project addition
    let newProjectButtonContainer = createElementInDOM('div', newProjectForm, 'button-container');

    let newProjectSaveButton = createElementInDOM('input', newProjectButtonContainer, 'save-new-project-button', 'save-new-project-button')
    newProjectSaveButton.type = 'submit';
    newProjectSaveButton.value = 'Save';


    let newProjectCancelButton = createElementInDOM('button', newProjectButtonContainer, 'cancel-new-project-button', 'cancel-new-project-button')
    newProjectCancelButton.textContent = 'Cancel';
    newProjectCancelButton.addEventListener('click', render);
}

function addNewProject(e) {
        //Prevent any standard form actions that might cause unintentional behaviour
        e.preventDefault();

        //Fetch the name input and create a new project with this name
        let newProjectNameInput = document.querySelector('#new-project-name');
        createProject(newProjectNameInput.value);
        
        //Re-render the page
        render(projectList, toDoList);
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

    //Render and clear/close the overlay
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

export function initOverlay() {

    //Overlay initilisation, could move this out if there's a better place
    let closeOverlayButton = document.getElementById("close-overlay-button");
    let overlay = document.getElementById("overlay");
    overlay.addEventListener('click', (e) => {if(e.target === overlay) closeOverlay()});
    closeOverlayButton.addEventListener('click', closeOverlay);
 
}


function openCreateOverlay(e) {

    //Find out which project we're adding into
    let projectInput = document.getElementById("new-to-do-project");
    projectInput.value = this.name;
    projectInput.dataset.projectId = this.id;

    //Open overlay
    let overlay = document.getElementById("overlay");
    overlay.classList.add("open");

    //Select the form
    let toDoForm = document.getElementById('add-to-do-form');
    //Clone to reset any event listeners
    let newToDoForm = toDoForm.cloneNode(true);
    toDoForm.parentNode.replaceChild(newToDoForm, toDoForm);

    //Focus on title
    let title = document.getElementById("title");
    title.focus();
        
    newToDoForm.addEventListener('submit', addToDoWithForm); 
    console.log('adding add to-do event listener')
    

}

function closeOverlay() {
    overlay.classList.remove("open");
}


function openEditOverlay() {
    
    //Open the overlay
    let overlay = document.getElementById("overlay");
    overlay.classList.add("open");

    //Hook up submitting the form to the edit to-do api
    let toDoForm = document.getElementById('add-to-do-form');

    //Clone to reset any event listeners
    let newToDoForm = toDoForm.cloneNode(true);
    toDoForm.parentNode.replaceChild(newToDoForm, toDoForm);

    //Add the event listener
    newToDoForm.addEventListener('submit', (e) => editToDoWithForm(e, inputFields));

    //Fill in the current values
    let inputFields = {};

    //set the source ToDo for the fields we're editing
    inputFields.toDo = this;

    inputFields.projectInput = document.getElementById("new-to-do-project");
    inputFields.projectInput.value = this.project.name;

    inputFields.title = document.getElementById("title");
    inputFields.title.value = this.title;

    inputFields.description = document.getElementById("description")
    inputFields.description.value = this.description;

    inputFields.dueDate = document.getElementById("due-date")
    if(this.dueDate !== "") inputFields.dueDate.valueAsDate = this.dueDate;

    inputFields.priority = document.getElementById("priority")
    // Loop through the options to find and select the one matching this.priority
    for (let i = 0; i < inputFields.priority.options.length; i++) {
        if (inputFields.priority.options[i].value === this.priority) {
            inputFields.priority.options[i].selected = true;
            break; // Exit the loop once a match is found
        }
    }

    inputFields.notes = document.getElementById("notes")
    inputFields.notes.value = this.notes;


    // focus on the title and change the button text to 'save'
    title.focus();

}

function editToDoWithForm(e, inputFields) {
    //Prevent any standard form actions that might cause unintentional behaviour
    e.preventDefault();

    // should never happen as title is required, but stops weird double form submission bugs
    if(inputFields.title.value === "") return;

    //Update the to-do with the new values
    inputFields.toDo.multiEdit(
                        inputFields.title.value,
                        inputFields.description.value,
                        inputFields.dueDate.valueAsDate,
                        inputFields.priority.value,
                        inputFields.notes.value);


    //Render and clear/close the overlay
    render(projectList, toDoList);
    closeOverlay();
    let toDoForm = document.getElementById('add-to-do-form');
    toDoForm.reset();
}