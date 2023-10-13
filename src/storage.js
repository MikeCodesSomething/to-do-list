import { parse, parseISO } from "date-fns";

export function saveDataToLocalStorage(toDoList, projectList) {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    localStorage.setItem('projectList', JSON.stringify(projectList));

  }
  
  export function getLocalStorageProjectList() {
    let projectList = localStorage.getItem('projectList');
    return projectList ? JSON.parse(projectList) : [];

  }

  export function getLocalStorageToDoList() {
    let toDoList = localStorage.getItem('toDoList');
    if(!toDoList) return [];
    let parsedToDoList = JSON.parse(toDoList);
    //Need to do a special parse for the date as it doesn't like being a string
    for(let toDo of parsedToDoList) {
        toDo.dueDate ? toDo.dueDate = parseISO(toDo.dueDate): '';
    }
    return parsedToDoList;

  }
  
  export function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
  