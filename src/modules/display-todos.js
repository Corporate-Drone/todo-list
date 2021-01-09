import { toDos } from './create-todos.js'

const todoCount = document.querySelector('#count');

//update todo complete status when checkbox is checked
function updateStatus(todoCheckbox, newToDo) {
    if (todoCheckbox.checked === true) {
        newToDo.complete = true;
        newToDo.active = false;
    } else {
        newToDo.complete = false;
        newToDo.active = true;
    }
}

//count & display todos that aren't checked
function updateCount() {
    let activetoDos = [];
    for (let i = 0; i < toDos.length; i++) {
        if (toDos[i].active) {
            activetoDos.unshift(toDos[i]);
        }
    }
    todoCount.innerText = `${activetoDos.length} items left`
}

//display all active & completed todos
function displayAll() {
    let todoRows = document.querySelectorAll('.todo');
    for (let i = 0; i < todoRows.length; i++) {
        todoRows[i].style.display = "flex";
    }
}

//display all unchecked todos
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

//display all finished todos
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

//display the todos based on which status button is active
function displayStatus() {
    if (/all/.test(window.location.href)) {
        displayAll();
    } else if (/active/.test(window.location.href)) {
        displayActive();
    } else if (/complete/.test(window.location.href)) {
        displayCompleted();
    }
}

export {updateStatus,updateCount,displayAll,displayActive,displayCompleted,displayStatus}