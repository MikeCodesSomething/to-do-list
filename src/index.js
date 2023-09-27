import { formatDistance, subDays } from 'date-fns'
import css from "./style.css";
import { createElementInDOM } from "./createElementInDOM.js";

//Create some arrays for all the projects and to-do's we create to be stored in
const projectList = [];
const toDoList = [];

// Prototype for projects
const project = {

    init: function(name) {
        this.name = name;
        this.toDos = [];
        this.deleted = false;
        projectList.push(this);
    },

    linkToDo: function(toDo) {
        //Remove old link if one exists
        toDo.project.unlinkToDo(toDo)

        //Create new link to this project
        toDo.project = this;
        this.toDos.push(toDo);
    },

    unlinkToDo: function(toDo) {
        let index = this.toDos.indexOf(toDo)
        if(index !== -1) {
            this.toDos.splice(index, 1);
            toDo.project = 'default';
        }
    },

    delete: function() {
        this.deleted = true;
        //unlink all todos
        //Need to go backwards here to workaround the fact to toDo array gets smaller with each loop
        for(let i = this.toDos.length - 1; i >= 0; i--) {
            this.unlinkToDo(this.toDos[i]);
        }

    //getProject: function  {} - Do I need this?
    //updateProject: function  {}        

    }
}




//Prototype for toDo objects
const toDo = {
    
    init: function(title, description, dueDate, priority, notes) {
        
        //Initialise properties
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false
        this.deleted = false;
        toDoList.push(this);

        //Put it in the default project by default
        this.project = defaultProject;
        defaultProject.linkToDo(this);
        
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


// To-dolistception:
// Create a default project
// Display module for the DOM
// Implement localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// Update to-do items
// Update projects


// Initiate
const defaultProject = Object.create(project);
defaultProject.init('default');





//Testing
//Add a few bits into the global scope to allow me to mess around in the console
window.toDo = toDo;
window.toDoList = toDoList;
window.project = project;
window.projectList = projectList;
window.defaultProject = defaultProject;





//Create an example project
const exampleProject = Object.create(project);
exampleProject.init('exampleProject');

//Create an example todo
const exampleToDo = Object.create(toDo);
exampleToDo.init('example to-do', 'desc', 'tomorrow', 'high', "here's some notes");

//Link example toDo to example project
exampleProject.linkToDo(exampleToDo);

//add the examples to the 'window' object so I can manipulate them from the console.
window.exampleToDo = exampleToDo;
window.exampleProject = exampleProject;



// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"
