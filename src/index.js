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
        toDo.project = this;
        this.toDos.push(toDo);
    },

    unlinkToDo: function(toDo) {
        let index = this.toDos.indexOf(toDo)
        if(index !== -1) {
            this.toDos.splice(index, 1);
            toDo.project = 'default';
        }
    }

    //getProject: function  {} - Do I need this?
    //updateProject: function  {}
    //deleteProject: function  {}
}




//Prototype for toDo objects
const toDo = {
    
    init: function(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.project = 'default';
        this.completed = false
        this.deleted = false;
        toDoList.push(this);
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

//Initiate


//Testing
//Add a few bits into the global scope to allow me to mess around in the console
window.toDo = toDo;
window.toDoList = toDoList;
window.project = project;
window.projectList = projectList;

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




//update to-do item

// view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)


// Implement localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API



// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"
