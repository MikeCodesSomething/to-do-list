export const projectList = [];

// Prototype for projects
export const project = {

    init: function(name) {
        this.name = name || `Project ${projectList.length + 1}`;
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


    }
}

export function createProject(projectName) {
    let newProject = Object.create(project);
    newProject.init(projectName);
    return newProject;
}