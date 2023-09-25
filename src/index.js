import { formatDistance, subDays } from 'date-fns'
import css from "./style.css";
import { createElementInDOM } from "./createElementInDOM.js";


// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"

// Prototype for projects
const project = {
    init: function(name) {
        this.name = name;
        this.toDos = [];
    },

    linkToDo: function(toDo) {
        toDo.project = this;
        this.toDos.push(toDo);
    },

    unlinkToDo: function(toDo) {
        let index = this.toDos.indexOf(toDo)
        if(index !== -1) {
            this.toDos.splice(index, 1);
            toDo.project = null;
        }
    }

    //getProject: function  {} - Do I need this?
    //updateProject: function  {}
    //deleteProject: function  {}
}

const toDoList = [];

//Prototype for toDo objects
const toDo = {
    
    init: function(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.project = null;
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
window.toDo = toDo;
window.toDoList = toDoList;
window.project = project;


const exampleProject = Object.create(project);
exampleProject.init('exampleProject');
console.log(`Created project: ${exampleProject.name}`);


//Use Object.create to create a new object with the toDo prototype.
const exampleToDo = Object.create(toDo);
console.log(exampleToDo.title);
exampleToDo.init('example to-do', 'desc', 'tomorrow', 'high', "here's some notes");
console.log(exampleToDo.title);

//Link to a project
exampleProject.linkToDo(exampleToDo);
console.log(`exampleProject has the following linked toDos: ${exampleProject.toDos[0].title}`);
console.log(`exampleTodo is linked to ${exampleToDo.project.name}`);

//Read the details
console.table(exampleToDo.read());
// console.log(exampleToDo.project);


exampleToDo.delete();
console.log(`after delete exampleProject has the following linked toDos: ${exampleProject.toDos[0]}`);
console.log(`after delete exampleTodo is linked to ${exampleToDo.project}`);


//read to-do item


//update to-do item



// view all projects


// view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)


// Implement localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
