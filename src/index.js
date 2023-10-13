import css from "./style.css";
import { storageAvailable, getLocalStorageToDoList, getLocalStorageProjectList } from "./storage.js";
import { projectList, project, createProject } from "./project.js"
import { initOverlay, render, createElementInDOM } from "./displayController.js";


// To-dolistception:
// Implement localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// - Make a function to load to-do objects from localStorage if it's there
// - Make a function to save to-dos to localStorage when a to-do is updated or added (also projects)



//Create some arrays for all the projects and to-do's we create to be stored in
export let toDoList = [];


//Prototype for toDo objects
const toDo = {
    
    init: function(title, description, dueDate, priority, notes) {
        
        //Initialise properties
        this.id = toDoList.length //only works if we never remove items from toDoList
        this.title = title;
        this.description = description;
        //store "" if no date provided, else store the date
        dueDate === "" ? this.dueDate = "" : this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.notes = notes;
        this.completed = false
        this.deleted = false;
        toDoList.push(this);

        //Put it in the default project by default
        this.project = defaultProject;
        defaultProject.linkToDo(this);
        
    },

    multiEdit: function(title, description, dueDate, priority, notes) {
        //lets you edit the standard properties in one method
        this.title = title;
        this.description = description;
        ["", null].includes(dueDate) ? this.dueDate = "" : this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.notes = notes;
    },

    read: function() {
        return this;
        //Not sure if this will be needed

    },

    delete: function() {
        this.project.unlinkToDo(this); //unlink from the project
        this.deleted = true;
    }

};

// Initiate

//Load projects from local storage
let storedProjectList = getLocalStorageProjectList();
if(storedProjectList.length > 0){
    for(let project of storedProjectList) {
    createProject(project.name);
}
}

// Create a default project if there aren't any
if(projectList.length === 0) createProject('Inbox');
let defaultProject = projectList[0];

//Load to-dos from local storage
let storedToDoList = getLocalStorageToDoList();
if(storedToDoList.length > 0) {
    for(let item of storedToDoList) {
        let linkedProjectID = item.project.id
        const newToDo = Object.create(toDo);
        newToDo.init(item.title, item.description, item.dueDate, item.priority, item.notes);
        projectList[linkedProjectID].linkToDo(newToDo);

    }
}


render(projectList, toDoList);
initOverlay();


//Testing
//Add a few bits into the global scope to allow me to mess around in the console
window.toDo = toDo;
window.toDoList = toDoList;
window.project = project;
window.projectList = projectList;
window.defaultProject = defaultProject;
window.render = render;



//Add some example data if there are no to-dos
if(toDoList.length === 0) {
    //Create an example project
    const exampleProject = createProject('example project');

    //Create an example todo
    const exampleToDo = Object.create(toDo);
    exampleToDo.init('example to-do', 'desc', new Date(), 'High', "here's some notes");

    //Link example toDo to example project
    exampleProject.linkToDo(exampleToDo);

    //Create a second example todo (unlinked)
    const exampleToDo2 = Object.create(toDo);
    exampleToDo2.init('example to-do2', 'desc', new Date(), 'Medium', "here's some notes");

    //Create a third example todo (unlinked)
    const exampleToDo3 = Object.create(toDo);
    exampleToDo3.init('example to-do3', 'desc', new Date(), 'Medium', "here's some notes");



    //add the examples to the 'window' object so I can manipulate them from the console.
    window.exampleToDo = exampleToDo;
    window.exampleToDo2 = exampleToDo2;
    window.exampleProject = exampleProject;
    render(projectList, toDoList);
}


// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"
