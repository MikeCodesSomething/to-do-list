/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/displayController.js":
/*!**********************************!*\
  !*** ./src/displayController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElementInDOM: () => (/* binding */ createElementInDOM),
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
//Creates an element in the DOM, with optional ID and className
//Attaches it to the specified parent element, or body if not specified

function render(projectList, toDoList) {
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

    //Overlay initilisation, could move this out if there's a better place
    let closeOverlayButton = document.getElementById("close-overlay-button");
    let overlay = document.getElementById("overlay");
    overlay.addEventListener('click', (e) => {if(e.target === overlay) closeOverlay()});
    closeOverlayButton.addEventListener('click', closeOverlay);
    
    let addToDoForm = document.getElementById('add-to-do-form');
    addToDoForm.addEventListener('submit', addToDoWithForm);

};

function addToDoWithForm(e) {
    //Stop the form actually getting submitted as we don't do anything with that right now
    e.preventDefault();
    
    //Get all the form values and link them to toDo item properties
    let formValues = document.querySelectorAll('input')
    console.log(formValues)
}


function createElementInDOM(elementType, parentElement, className, id) {
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _displayController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayController.js */ "./src/displayController.js");




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
// Display module for the DOM
// Implement localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// Update to-do items from UI
// Update projects from UI


// Initiate
const defaultProject = Object.create(project);
defaultProject.init('Inbox');
(0,_displayController_js__WEBPACK_IMPORTED_MODULE_1__.render)(projectList, toDoList);





//Testing
//Add a few bits into the global scope to allow me to mess around in the console
window.toDo = toDo;
window.toDoList = toDoList;
window.project = project;
window.projectList = projectList;
window.defaultProject = defaultProject;
window.render = _displayController_js__WEBPACK_IMPORTED_MODULE_1__.render;





//Create an example project
const exampleProject = Object.create(project);
exampleProject.init('exampleProject');

//Create an example todo
const exampleToDo = Object.create(toDo);
exampleToDo.init('example to-do', 'desc', 'tomorrow', 'high', "here's some notes");

//Link example toDo to example project
exampleProject.linkToDo(exampleToDo);

//Create a second example todo (unlinked)
const exampleToDo2 = Object.create(toDo);
exampleToDo2.init('example to-do2', 'desc', 'tomorrow', 'med', "here's some notes");

//Create a third example todo (unlinked)
const exampleToDo3 = Object.create(toDo);
exampleToDo3.init('example to-do3', 'desc', 'tomorrow', 'med', "here's some notes");



//add the examples to the 'window' object so I can manipulate them from the console.
window.exampleToDo = exampleToDo;
window.exampleToDo2 = exampleToDo2;

window.exampleProject = exampleProject;

(0,_displayController_js__WEBPACK_IMPORTED_MODULE_1__.render)(projectList, toDoList);

// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsa0JBQWtCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx3Q0FBd0M7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7OztVQ2hGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNwQjtBQUNzQzs7QUFFcEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxRQUFRO0FBQ25EO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsNkRBQU07Ozs7OztBQU1OO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHlEQUFNOzs7Ozs7QUFNdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsNkRBQU07O0FBRU4sd0RBQXdELGlCQUFpQjtBQUN6RSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3R5bGUuY3NzP2UzMjAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kaXNwbGF5Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvL0NyZWF0ZXMgYW4gZWxlbWVudCBpbiB0aGUgRE9NLCB3aXRoIG9wdGlvbmFsIElEIGFuZCBjbGFzc05hbWVcbi8vQXR0YWNoZXMgaXQgdG8gdGhlIHNwZWNpZmllZCBwYXJlbnQgZWxlbWVudCwgb3IgYm9keSBpZiBub3Qgc3BlY2lmaWVkXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIocHJvamVjdExpc3QsIHRvRG9MaXN0KSB7XG4gICAgLy9SZXNldCB0aGUgY29udGFpbmVyXG4gICAgbGV0IGNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudC1jb250YWluZXInKTtcbiAgICBjb250ZW50Q29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbigpO1xuXG4gICAgLy9DcmVhdGUgY29udGFpbmVyIGFuZCB0aXRsZSBmb3IgcHJvamVjdHNcbiAgICBmb3IobGV0IHByb2plY3Qgb2YgcHJvamVjdExpc3QpIHtcbiAgICAgICAgbGV0IHByb2plY3RDb250YWluZXIgPSBjcmVhdGVFbGVtZW50SW5ET00oJ2RpdicsIGNvbnRlbnRDb250YWluZXIsICdwcm9qZWN0LWNvbnRhaW5lcicsIHByb2plY3QubmFtZSlcbiAgICAgICAgbGV0IHByb2plY3RUaXRsZSA9IGNyZWF0ZUVsZW1lbnRJbkRPTSgnaDInLCBwcm9qZWN0Q29udGFpbmVyLCAndGl0bGUnLCBwcm9qZWN0Lm5hbWUpXG4gICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgICAgICAgbGV0IHByb2plY3RBZGRUb0RvQnV0dG9uID0gY3JlYXRlRWxlbWVudEluRE9NKCdidXR0b24nLHByb2plY3RDb250YWluZXIsJ2FkZC10by1kby1idXR0b24nLHByb2plY3QubmFtZSlcbiAgICAgICAgcHJvamVjdEFkZFRvRG9CdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIFRvLURvJ1xuICAgICAgICBwcm9qZWN0QWRkVG9Eb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5PdmVybGF5KVxuICAgIH1cblxuICAgIC8vQ3JlYXRlIGNhcmRzIGZvciB0YXNrcyBpbiB0aGUgcHJvamVjdCBjb250YWluZXJcbiAgICBjb25zb2xlLmxvZyh0b0RvTGlzdClcbiAgICBmb3IobGV0IHRvRG8gb2YgdG9Eb0xpc3QpIHtcbiAgICAgICAgLy9HZXQgdGhlIGxpbmtlZCBwcm9qZWN0ICh1c2luZyBuYW1lLCBzbyB0aGlzIHdpbGwgYnJlYWsgaWYgdHdvIHByb2plY3QgaGF2ZSB0aGUgc2FtZSBuYW1lISlcbiAgICAgICAgbGV0IGxpbmtlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0b0RvLnByb2plY3QubmFtZX1gKTtcbiAgICAgICAgbGV0IHRvRG9DYXJkID0gY3JlYXRlRWxlbWVudEluRE9NKCdkaXYnLCBsaW5rZWRQcm9qZWN0LCAndG8tZG8tY2FyZCcsIHRvRG8udGl0bGUpO1xuICAgICAgICBcbiAgICAgICAgdG9Eb0NhcmQudGV4dENvbnRlbnQgPSB0b0RvLnRpdGxlO1xuICAgIH1cblxuICAgIC8vT3ZlcmxheSBpbml0aWxpc2F0aW9uLCBjb3VsZCBtb3ZlIHRoaXMgb3V0IGlmIHRoZXJlJ3MgYSBiZXR0ZXIgcGxhY2VcbiAgICBsZXQgY2xvc2VPdmVybGF5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1vdmVybGF5LWJ1dHRvblwiKTtcbiAgICBsZXQgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3ZlcmxheVwiKTtcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtpZihlLnRhcmdldCA9PT0gb3ZlcmxheSkgY2xvc2VPdmVybGF5KCl9KTtcbiAgICBjbG9zZU92ZXJsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU92ZXJsYXkpO1xuICAgIFxuICAgIGxldCBhZGRUb0RvRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdG8tZG8tZm9ybScpO1xuICAgIGFkZFRvRG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFkZFRvRG9XaXRoRm9ybSk7XG5cbn07XG5cbmZ1bmN0aW9uIGFkZFRvRG9XaXRoRm9ybShlKSB7XG4gICAgLy9TdG9wIHRoZSBmb3JtIGFjdHVhbGx5IGdldHRpbmcgc3VibWl0dGVkIGFzIHdlIGRvbid0IGRvIGFueXRoaW5nIHdpdGggdGhhdCByaWdodCBub3dcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgLy9HZXQgYWxsIHRoZSBmb3JtIHZhbHVlcyBhbmQgbGluayB0aGVtIHRvIHRvRG8gaXRlbSBwcm9wZXJ0aWVzXG4gICAgbGV0IGZvcm1WYWx1ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXG4gICAgY29uc29sZS5sb2coZm9ybVZhbHVlcylcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudEluRE9NKGVsZW1lbnRUeXBlLCBwYXJlbnRFbGVtZW50LCBjbGFzc05hbWUsIGlkKSB7XG4gICAgbGV0IGVsZW1lbnQgPSB7fVxuICAgIC8vT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgIGVsZW1lbnQucGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xuICAgIGVsZW1lbnQuaWQgPSBpZCB8fCBudWxsO1xuXG5cbiAgICAvL0NyZWF0ZSBlbGVtZW50XG4gICAgZWxlbWVudC5ET01PYmplY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcblxuICAgIC8vQWRkIElEIGFuZCBjbGFzc05hbWUgaWYgcHJlc2VudFxuICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lICE9IG51bGwpIGVsZW1lbnQuRE9NT2JqZWN0LmNsYXNzTGlzdC5hZGQoZWxlbWVudC5jbGFzc05hbWUpOyBcbiAgICBpZihlbGVtZW50LmlkICE9IG51bGwpIGVsZW1lbnQuRE9NT2JqZWN0LnNldEF0dHJpYnV0ZShcImlkXCIsZWxlbWVudC5pZCk7XG4gICAgXG4gICAgLy9BZGQgbmV3IGVsZW1lbnQgdG8gRE9NXG4gICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQuRE9NT2JqZWN0KTtcbiAgICByZXR1cm4gZWxlbWVudC5ET01PYmplY3Q7XG59O1xuXG5mdW5jdGlvbiBvcGVuT3ZlcmxheShlKSB7XG4gICAgbGV0IHByb2plY3QgPSBlLnRhcmdldC5pZDtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcbiAgICBsZXQgcHJvamVjdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdG8tZG8tcHJvamVjdFwiKTtcbiAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSBwcm9qZWN0O1xuICAgIGxldCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdmVybGF5XCIpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XG59XG5cbmZ1bmN0aW9uIGNsb3NlT3ZlcmxheSgpIHtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2UsIHN1YkRheXMgfSBmcm9tICdkYXRlLWZucydcbmltcG9ydCBjc3MgZnJvbSBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgeyByZW5kZXIsIGNyZWF0ZUVsZW1lbnRJbkRPTSB9IGZyb20gXCIuL2Rpc3BsYXlDb250cm9sbGVyLmpzXCI7XG5cbi8vQ3JlYXRlIHNvbWUgYXJyYXlzIGZvciBhbGwgdGhlIHByb2plY3RzIGFuZCB0by1kbydzIHdlIGNyZWF0ZSB0byBiZSBzdG9yZWQgaW5cbmNvbnN0IHByb2plY3RMaXN0ID0gW107XG5jb25zdCB0b0RvTGlzdCA9IFtdO1xuXG4vLyBQcm90b3R5cGUgZm9yIHByb2plY3RzXG5jb25zdCBwcm9qZWN0ID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRvRG9zID0gW107XG4gICAgICAgIHRoaXMuZGVsZXRlZCA9IGZhbHNlO1xuICAgICAgICBwcm9qZWN0TGlzdC5wdXNoKHRoaXMpO1xuICAgIH0sXG5cbiAgICBsaW5rVG9EbzogZnVuY3Rpb24odG9Ebykge1xuICAgICAgICAvL1JlbW92ZSBvbGQgbGluayBpZiBvbmUgZXhpc3RzXG4gICAgICAgIHRvRG8ucHJvamVjdC51bmxpbmtUb0RvKHRvRG8pXG5cbiAgICAgICAgLy9DcmVhdGUgbmV3IGxpbmsgdG8gdGhpcyBwcm9qZWN0XG4gICAgICAgIHRvRG8ucHJvamVjdCA9IHRoaXM7XG4gICAgICAgIHRoaXMudG9Eb3MucHVzaCh0b0RvKTtcbiAgICB9LFxuXG4gICAgdW5saW5rVG9EbzogZnVuY3Rpb24odG9Ebykge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnRvRG9zLmluZGV4T2YodG9EbylcbiAgICAgICAgaWYoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnRvRG9zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0b0RvLnByb2plY3QgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgLy91bmxpbmsgYWxsIHRvZG9zXG4gICAgICAgIC8vTmVlZCB0byBnbyBiYWNrd2FyZHMgaGVyZSB0byB3b3JrYXJvdW5kIHRoZSBmYWN0IHRvIHRvRG8gYXJyYXkgZ2V0cyBzbWFsbGVyIHdpdGggZWFjaCBsb29wXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMudG9Eb3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMudW5saW5rVG9Ebyh0aGlzLnRvRG9zW2ldKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG59XG5cblxuXG5cbi8vUHJvdG90eXBlIGZvciB0b0RvIG9iamVjdHNcbmNvbnN0IHRvRG8gPSB7XG4gICAgXG4gICAgaW5pdDogZnVuY3Rpb24odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMpIHtcbiAgICAgICAgXG4gICAgICAgIC8vSW5pdGlhbGlzZSBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLmRlbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdG9Eb0xpc3QucHVzaCh0aGlzKTtcblxuICAgICAgICAvL1B1dCBpdCBpbiB0aGUgZGVmYXVsdCBwcm9qZWN0IGJ5IGRlZmF1bHRcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gZGVmYXVsdFByb2plY3Q7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0LmxpbmtUb0RvKHRoaXMpO1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgcmVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAvL05vdCBzdXJlIGlmIHRoaXMgd2lsbCBiZSBuZWVkZWRcblxuICAgIH0sXG5cbiAgICBkZWxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb2plY3QudW5saW5rVG9Ebyh0aGlzKTsgLy91bmxpbmsgZnJvbSB0aGUgcHJvamVjdFxuICAgICAgICB0aGlzLmRlbGV0ZWQgPSB0cnVlO1xuICAgIH1cblxufTtcblxuXG4vLyBUby1kb2xpc3RjZXB0aW9uOlxuLy8gRGlzcGxheSBtb2R1bGUgZm9yIHRoZSBET01cbi8vIEltcGxlbWVudCBsb2NhbFN0b3JhZ2UgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9TdG9yYWdlX0FQSS9Vc2luZ190aGVfV2ViX1N0b3JhZ2VfQVBJXG4vLyBVcGRhdGUgdG8tZG8gaXRlbXMgZnJvbSBVSVxuLy8gVXBkYXRlIHByb2plY3RzIGZyb20gVUlcblxuXG4vLyBJbml0aWF0ZVxuY29uc3QgZGVmYXVsdFByb2plY3QgPSBPYmplY3QuY3JlYXRlKHByb2plY3QpO1xuZGVmYXVsdFByb2plY3QuaW5pdCgnSW5ib3gnKTtcbnJlbmRlcihwcm9qZWN0TGlzdCwgdG9Eb0xpc3QpO1xuXG5cblxuXG5cbi8vVGVzdGluZ1xuLy9BZGQgYSBmZXcgYml0cyBpbnRvIHRoZSBnbG9iYWwgc2NvcGUgdG8gYWxsb3cgbWUgdG8gbWVzcyBhcm91bmQgaW4gdGhlIGNvbnNvbGVcbndpbmRvdy50b0RvID0gdG9EbztcbndpbmRvdy50b0RvTGlzdCA9IHRvRG9MaXN0O1xud2luZG93LnByb2plY3QgPSBwcm9qZWN0O1xud2luZG93LnByb2plY3RMaXN0ID0gcHJvamVjdExpc3Q7XG53aW5kb3cuZGVmYXVsdFByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcbndpbmRvdy5yZW5kZXIgPSByZW5kZXI7XG5cblxuXG5cblxuLy9DcmVhdGUgYW4gZXhhbXBsZSBwcm9qZWN0XG5jb25zdCBleGFtcGxlUHJvamVjdCA9IE9iamVjdC5jcmVhdGUocHJvamVjdCk7XG5leGFtcGxlUHJvamVjdC5pbml0KCdleGFtcGxlUHJvamVjdCcpO1xuXG4vL0NyZWF0ZSBhbiBleGFtcGxlIHRvZG9cbmNvbnN0IGV4YW1wbGVUb0RvID0gT2JqZWN0LmNyZWF0ZSh0b0RvKTtcbmV4YW1wbGVUb0RvLmluaXQoJ2V4YW1wbGUgdG8tZG8nLCAnZGVzYycsICd0b21vcnJvdycsICdoaWdoJywgXCJoZXJlJ3Mgc29tZSBub3Rlc1wiKTtcblxuLy9MaW5rIGV4YW1wbGUgdG9EbyB0byBleGFtcGxlIHByb2plY3RcbmV4YW1wbGVQcm9qZWN0LmxpbmtUb0RvKGV4YW1wbGVUb0RvKTtcblxuLy9DcmVhdGUgYSBzZWNvbmQgZXhhbXBsZSB0b2RvICh1bmxpbmtlZClcbmNvbnN0IGV4YW1wbGVUb0RvMiA9IE9iamVjdC5jcmVhdGUodG9Ebyk7XG5leGFtcGxlVG9EbzIuaW5pdCgnZXhhbXBsZSB0by1kbzInLCAnZGVzYycsICd0b21vcnJvdycsICdtZWQnLCBcImhlcmUncyBzb21lIG5vdGVzXCIpO1xuXG4vL0NyZWF0ZSBhIHRoaXJkIGV4YW1wbGUgdG9kbyAodW5saW5rZWQpXG5jb25zdCBleGFtcGxlVG9EbzMgPSBPYmplY3QuY3JlYXRlKHRvRG8pO1xuZXhhbXBsZVRvRG8zLmluaXQoJ2V4YW1wbGUgdG8tZG8zJywgJ2Rlc2MnLCAndG9tb3Jyb3cnLCAnbWVkJywgXCJoZXJlJ3Mgc29tZSBub3Rlc1wiKTtcblxuXG5cbi8vYWRkIHRoZSBleGFtcGxlcyB0byB0aGUgJ3dpbmRvdycgb2JqZWN0IHNvIEkgY2FuIG1hbmlwdWxhdGUgdGhlbSBmcm9tIHRoZSBjb25zb2xlLlxud2luZG93LmV4YW1wbGVUb0RvID0gZXhhbXBsZVRvRG87XG53aW5kb3cuZXhhbXBsZVRvRG8yID0gZXhhbXBsZVRvRG8yO1xuXG53aW5kb3cuZXhhbXBsZVByb2plY3QgPSBleGFtcGxlUHJvamVjdDtcblxucmVuZGVyKHByb2plY3RMaXN0LCB0b0RvTGlzdCk7XG5cbi8vIGZvcm1hdERpc3RhbmNlKHN1YkRheXMobmV3IERhdGUoKSwgMyksIG5ldyBEYXRlKCksIHsgYWRkU3VmZml4OiB0cnVlIH0pXG4vLz0+IFwiMyBkYXlzIGFnb1wiXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=