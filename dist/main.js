const htmlClass = document.querySelector('html');
const themeBtn = document.querySelector('.theme-switcher');
const backgroundImg = document.querySelector('.background');
const inputToDo = document.querySelector('.create-todo');
const checkbox = document.querySelector('.todo-input');
const mainCardDiv = document.querySelector('.main-card');
const todoCount = document.querySelector('#count');

const allClickable = document.querySelector('#status-all');
const activeClickable = document.querySelector('#status-active');
const completeClickable = document.querySelector('#status-complete');
const clearClickable = document.querySelector('#clear-complete');


let toDos = [];



class ToDo {
    constructor(active, complete, info) {
        this.active = active;
        this.complete = complete;
        this.info = info;
    }
}

//Toggle light/dark theme
themeBtn.addEventListener('click', () => {
    if (htmlClass.classList.contains("light")) {
        htmlClass.setAttribute('class', 'dark');
        backgroundImg.src = "images/bg-desktop-dark.jpg";
    } else {
        htmlClass.setAttribute('class', 'light');
        backgroundImg.src = "images/bg-desktop-light.jpg";
    }
})

inputToDo.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && inputToDo.value !== "") {
        let newToDo = new ToDo(true, false, inputToDo.value);
        toDos.unshift(newToDo);

        //create new row
        createRow(newToDo, newToDo.info);

        //update to do count
        updateCount();

        inputToDo.value = "";
    }
})

activeClickable.addEventListener('click', () => {
    displayActive();
})

completeClickable.addEventListener('click', () => {
    displayCompleted();
})

allClickable.addEventListener('click', () => {
    displayAll();
})

clearClickable.addEventListener('click', () => {
    displayClear();
})

function createRow(newToDo, inputValue) {
    //create to do row
    let todoDiv = document.createElement('div');
    todoDiv.setAttribute('class', 'todo');
    // todoDiv.setAttribute('draggable', 'true');
    mainCardDiv.prepend(todoDiv);

    let todoCheckbox = document.createElement('input')
    todoCheckbox.setAttribute('type', 'checkbox');
    todoCheckbox.setAttribute('class', 'todo-checkbox');
    todoDiv.appendChild(todoCheckbox);

    let todoLabel = document.createElement('label');
    todoLabel.setAttribute('for', 'todo');
    todoLabel.setAttribute('data-content', `${inputValue}`);
    todoLabel.setAttribute('class', 'todo-text');
    todoLabel.innerText = `${inputValue}`;
    todoDiv.appendChild(todoLabel);

    let todoClose = document.createElement('button');
    todoClose.setAttribute('class', 'close-todo clickable');
    todoClose.innerText = "X";
    todoDiv.appendChild(todoClose);

    todoClose.addEventListener('click', () => {
        deleteRow(todoDiv, newToDo);
    });

    todoCheckbox.addEventListener('click', () => {
        updateStatus(todoCheckbox, newToDo);
        updateCount();
    })

}

function updateStatus(todoCheckbox, newToDo) {
    if (todoCheckbox.checked === true) {
        newToDo.complete = true;
        newToDo.active = false;
    } else {
        newToDo.complete = false;
        newToDo.active = true;
    }
}

function updateCount() {
    let activetoDos = [];
    for (let i = 0; i < toDos.length; i++) {
        if (toDos[i].active) {
            activetoDos.unshift(toDos[i]);
        }
    }
    todoCount.innerText = `${activetoDos.length} items left`
}

function displayAll() {
    let todoRows = document.querySelectorAll('.todo');
    for (let i = 0; i < todoRows.length; i++) {
        todoRows[i].style.display = "flex";
    }
}

function displayActive() {
    let todoRows = document.querySelectorAll('.todo');
    for (let i = 0; i < todoRows.length; i++) {
        if (toDos[i].active == true) {
            todoRows[i].style.display = "flex";
        } else {
            todoRows[i].style.display = "none";
        }
    }
}

function displayCompleted() {
    let todoRows = document.querySelectorAll('.todo');
    for (let i = 0; i < todoRows.length; i++) {
        if (toDos[i].active == true) {
            todoRows[i].style.display = "none";
        } else {
            todoRows[i].style.display = "flex";
        }
    }
}

function displayClear() {
    let completedToDos = [];

    for (let i = 0; i < toDos.length; i++) {
        if (!toDos[i].active) {
            completedToDos.push(toDos[i]);
        }
    }

    for (let i = 0; i < completedToDos.length; i++) {
        let index = toDos.indexOf(completedToDos[i]);

        clearCompleted(completedToDos[i], index);
    }
    console.log(completedToDos);
}

function clearCompleted(completed, index) {
    let todoRows = document.querySelectorAll('.todo');

    toDos.splice(toDos.indexOf(completed), 1);
    todoRows[index].remove();
    updateCount();
}

function deleteRow(todoDiv, newToDo) {
    toDos.splice(toDos.indexOf(newToDo), 1);
    todoDiv.remove();
    updateCount();
}

function init() {
    updateCount();
}

init();
